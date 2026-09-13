import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, Briefcase, Mail } from 'lucide-react'
import TetrisGame from '../components/not-found/TetrisGame'

/**
 * 404 page — play Tetris while you're lost, then pick a path home.
 */
const NotFound = () => {
  const [gameOver, setGameOver] = useState(false)
  const handleGameOver = useCallback(() => setGameOver(true), [])

  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-3">🎮</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Page not found</h1>
        <p className="text-light/70 mb-8">
          Play a quick round of Tetris while you&apos;re here — when the stack tops out, choose where to go next.
        </p>

        {!gameOver ? (
          <>
            <TetrisGame onGameOver={handleGameOver} />
            <button
              type="button"
              onClick={() => setGameOver(true)}
              className="mt-8 text-sm text-light/50 hover:text-primary underline underline-offset-2 transition-colors"
            >
              Skip game — show links
            </button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-5xl mb-2">🎉</div>
            <p className="text-light/80 text-lg">Game over — but you found the way out. Pick your next move:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-light/10 hover:bg-light/20 border border-light/20 text-light rounded-xl font-semibold transition-all"
              >
                <Briefcase className="w-5 h-5" />
                Case Studies
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-light/10 hover:bg-light/20 border border-light/20 text-light rounded-xl font-semibold transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotFound
