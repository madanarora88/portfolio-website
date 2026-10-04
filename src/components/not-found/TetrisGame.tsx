import { useCallback, useEffect, useReducer, useRef } from 'react'

const COLS = 10
const ROWS = 20
const DROP_MS = 650

type PieceKey = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

const INITIAL: Record<PieceKey, number[][]> = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
}

const PIECE_KEYS: PieceKey[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

export const PIECE_COLORS: Record<PieceKey, string> = {
  I: 'bg-cyan-400',
  O: 'bg-yellow-400',
  T: 'bg-purple-500',
  S: 'bg-green-500',
  Z: 'bg-red-500',
  J: 'bg-blue-600',
  L: 'bg-orange-500',
}

function rotate(m: number[][]): number[][] {
  const R = m.length
  const C = m[0].length
  return Array.from({ length: C }, (_, c) =>
    Array.from({ length: R }, (_, r) => m[R - 1 - r][c])
  )
}

function getShape(key: PieceKey, rotation: number): number[][] {
  let s = INITIAL[key]
  for (let i = 0; i < rotation % 4; i++) s = rotate(s)
  return s
}

function emptyBoard(): number[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0))
}

type PieceState = {
  key: PieceKey
  rotation: number
  x: number
  y: number
}

function cellsOf(p: PieceState): { r: number; c: number; k: PieceKey }[] {
  const shape = getShape(p.key, p.rotation)
  const out: { r: number; c: number; k: PieceKey }[] = []
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) out.push({ r: p.y + r, c: p.x + c, k: p.key })
    }
  }
  return out
}

function valid(board: number[][], p: PieceState): boolean {
  for (const { r, c } of cellsOf(p)) {
    if (c < 0 || c >= COLS || r >= ROWS) return false
    if (r >= 0 && board[r][c]) return false
  }
  return true
}

function randomPiece(): PieceState {
  const key = PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)]
  const shape = getShape(key, 0)
  const w = shape[0].length
  return {
    key,
    rotation: 0,
    x: Math.floor((COLS - w) / 2),
    y: 0,
  }
}

function mergeAndClear(board: number[][], p: PieceState): { board: number[][]; cleared: number } {
  const next = board.map((row) => [...row])
  for (const { r, c, k } of cellsOf(p)) {
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      next[r][c] = PIECE_KEYS.indexOf(k) + 1
    }
  }
  let cleared = 0
  const filtered = next.filter((row) => {
    const full = row.every((cell) => cell !== 0)
    if (full) {
      cleared++
      return false
    }
    return true
  })
  while (filtered.length < ROWS) {
    filtered.unshift(Array(COLS).fill(0))
  }
  return { board: filtered, cleared }
}

type GameState = {
  board: number[][]
  piece: PieceState | null
  score: number
  lines: number
  gameOver: boolean
}

type Action =
  | { type: 'TICK' }
  | { type: 'MOVE'; dx: number; dy: number }
  | { type: 'ROTATE' }
  | { type: 'HARD_DROP' }

function gameReducer(state: GameState, action: Action): GameState {
  if (state.gameOver) return state
  const { board, piece } = state
  if (!piece && action.type !== 'TICK') return state

  const spawn = (b: number[][]): GameState => {
    const np = randomPiece()
    if (!valid(b, np)) {
      return { ...state, board: b, piece: null, gameOver: true }
    }
    return { ...state, board: b, piece: np }
  }

  switch (action.type) {
    case 'TICK': {
      if (!piece) return state
      const down = { ...piece, y: piece.y + 1 }
      if (valid(board, down)) {
        return { ...state, piece: down }
      }
      const { board: nb, cleared } = mergeAndClear(board, piece)
      const bonus = cleared * 100 + (cleared > 1 ? cleared * 50 : 0)
      const afterSpawn = spawn(nb)
      return {
        ...afterSpawn,
        score: state.score + bonus,
        lines: state.lines + cleared,
      }
    }
    case 'MOVE': {
      if (!piece) return state
      const next = { ...piece, x: piece.x + action.dx, y: piece.y + action.dy }
      if (!valid(board, next)) return state
      return { ...state, piece: next }
    }
    case 'ROTATE': {
      if (!piece) return state
      const next = { ...piece, rotation: (piece.rotation + 1) % 4 }
      if (!valid(board, next)) return state
      return { ...state, piece: next }
    }
    case 'HARD_DROP': {
      if (!piece) return state
      let p = { ...piece }
      while (valid(board, { ...p, y: p.y + 1 })) p = { ...p, y: p.y + 1 }
      const { board: nb, cleared } = mergeAndClear(board, p)
      const bonus = cleared * 100 + (cleared > 1 ? cleared * 50 : 0)
      const afterSpawn = spawn(nb)
      return {
        ...afterSpawn,
        score: state.score + bonus,
        lines: state.lines + cleared,
      }
    }
    default:
      return state
  }
}

const initialState: GameState = {
  board: emptyBoard(),
  piece: randomPiece(),
  score: 0,
  lines: 0,
  gameOver: false,
}

export default function TetrisGame({ onGameOver }: { onGameOver: () => void }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const gameOverReported = useRef(false)

  useEffect(() => {
    if (!state.gameOver || gameOverReported.current) return
    gameOverReported.current = true
    onGameOver()
  }, [state.gameOver, onGameOver])

  useEffect(() => {
    if (state.gameOver) return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), DROP_MS)
    return () => window.clearInterval(id)
  }, [state.gameOver])

  const move = useCallback((dx: number, dy: number) => {
    dispatch({ type: 'MOVE', dx, dy })
  }, [])

  const rotatePiece = useCallback(() => {
    dispatch({ type: 'ROTATE' })
  }, [])

  const hardDrop = useCallback(() => {
    dispatch({ type: 'HARD_DROP' })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (state.gameOver) return
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          move(-1, 0)
          break
        case 'ArrowRight':
          e.preventDefault()
          move(1, 0)
          break
        case 'ArrowDown':
          e.preventDefault()
          move(0, 1)
          break
        case 'ArrowUp':
        case 'x':
        case 'X':
          e.preventDefault()
          rotatePiece()
          break
        case ' ':
          e.preventDefault()
          hardDrop()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.gameOver, move, rotatePiece, hardDrop])

  const displayBoard = state.board.map((row) => [...row])
  if (state.piece && !state.gameOver) {
    for (const { r, c, k } of cellsOf(state.piece)) {
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        displayBoard[r][c] = PIECE_KEYS.indexOf(k) + 1
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 text-sm text-light/70">
        <span>Score: {state.score}</span>
        <span>Lines: {state.lines}</span>
      </div>
      <div
        className="inline-grid gap-px p-1 rounded-lg border-2 border-light/35 bg-black/25 shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
      >
        {displayBoard.map((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={`
                w-5 h-5 sm:w-6 sm:h-6 rounded-sm shrink-0 box-border
                ${cell === 0 ? 'bg-black/30 border border-white/25' : 'border border-transparent'}
                ${cell > 0 ? PIECE_COLORS[PIECE_KEYS[cell - 1]] : ''}
              `}
            />
          ))
        )}
      </div>
      <p className="text-light/50 text-xs max-w-xs text-center">
        ← → move · ↑ rotate · ↓ soft drop · Space hard drop
      </p>
      <div className="flex flex-wrap gap-2 justify-center md:hidden">
        <button type="button" onClick={() => move(-1, 0)} className="px-3 py-2 bg-light/10 rounded-lg text-sm">
          ←
        </button>
        <button type="button" onClick={() => rotatePiece()} className="px-3 py-2 bg-light/10 rounded-lg text-sm">
          ↻
        </button>
        <button type="button" onClick={() => move(1, 0)} className="px-3 py-2 bg-light/10 rounded-lg text-sm">
          →
        </button>
        <button type="button" onClick={() => move(0, 1)} className="px-3 py-2 bg-light/10 rounded-lg text-sm">
          ↓
        </button>
        <button type="button" onClick={() => hardDrop()} className="px-3 py-2 bg-primary/30 rounded-lg text-sm">
          Drop
        </button>
      </div>
    </div>
  )
}
