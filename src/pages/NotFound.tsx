import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bug, Home, Briefcase } from 'lucide-react'

const NotFound = () => {
  const [bugs, setBugs] = useState([
    { id: 1, text: "Missing user research", x: 20, y: 25, caught: false },
    { id: 2, text: "Scope creep detected", x: 50, y: 45, caught: false },
    { id: 3, text: "Unclear requirements", x: 75, y: 65, caught: false },
    { id: 4, text: "No success metrics", x: 35, y: 75, caught: false },
  ])

  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [timeLeft, gameOver])

  const catchBug = (id: number) => {
    setBugs(bugs.map(b => (b.id === id ? { ...b, caught: true } : b)))
    setScore(score + 1)

    if (score + 1 === bugs.length) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(15)
    setGameOver(false)
    setBugs(bugs.map(b => ({ ...b, caught: false })))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background floating bugs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5"
            initial={{ y: -50, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            🐛
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-8xl mb-4"
          >
            🐛
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            404: Product Manager Malfunction!
          </h1>
          <p className="text-xl text-slate-400 mb-2">
            I've got some bugs in my system. Help me debug!
          </p>
          <p className="text-slate-500">
            Catch all the product management bugs before time runs out
          </p>
        </motion.div>

        {!gameOver ? (
          <>
            {/* Game Stats */}
            <div className="flex justify-center gap-6 mb-8">
              <motion.div
                className="px-8 py-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl"
                animate={{ scale: timeLeft <= 5 ? [1, 1.05, 1] : 1 }}
                transition={{ repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-blue-400">{timeLeft}s</div>
                <div className="text-sm text-slate-400">Time Left</div>
              </motion.div>
              <div className="px-8 py-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl">
                <div className="text-4xl font-bold text-green-400">{score}/{bugs.length}</div>
                <div className="text-sm text-slate-400">Bugs Fixed</div>
              </div>
            </div>

            {/* Bug Field */}
            <div className="relative w-full h-96 bg-slate-900/50 backdrop-blur-sm border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              {bugs.map(bug => (
                <AnimatePresence key={bug.id}>
                  {!bug.caught && (
                    <motion.div
                      className="absolute z-20"
                      style={{
                        left: `${bug.x}%`,
                        top: `${bug.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ opacity: 1 }}
                      exit={{ scale: 0, rotate: 360, opacity: 0 }}
                    >
                      <motion.button
                        type="button"
                        initial={{ scale: 1 }}
                        animate={{
                          scale: [1, 1.08, 1],
                          x: [0, 10, -10, 0],
                          y: [0, -8, 8, 0],
                        }}
                        transition={{
                          scale: { repeat: Infinity, duration: 2 },
                          x: { repeat: Infinity, duration: 2.5 },
                          y: { repeat: Infinity, duration: 1.8 },
                        }}
                        onClick={() => catchBug(bug.id)}
                        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-lg font-medium border-2 border-white/20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Bug className="w-4 h-4 shrink-0" />
                        <span className="text-sm whitespace-nowrap">{bug.text}</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              {/* Instruction hint */}
              {score === 0 && timeLeft > 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                  <div className="text-slate-500 text-lg font-medium">
                    Click the bugs to catch them! 👆
                  </div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-10 shadow-2xl"
          >
            {score === bugs.length ? (
              <>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-7xl mb-6"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 text-green-400">
                  All Bugs Fixed!
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                  Impressive! You have the debugging skills of a great PM.
                  Now let's find you the right page...
                </p>
              </>
            ) : (
              <>
                <div className="text-7xl mb-6">⏰</div>
                <h2 className="text-4xl font-bold mb-4 text-yellow-400">
                  Time's Up!
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                  You caught <span className="text-yellow-400 font-bold">{score}</span> out of <span className="font-bold">{bugs.length}</span> bugs. Not bad!
                  In product management, we iterate and improve.
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/50"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all"
              >
                <Briefcase className="w-5 h-5" />
                See Bug-Free Products
              </Link>
              <button
                type="button"
                onClick={resetGame}
                className="px-8 py-4 border-2 border-slate-600 hover:border-blue-500 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all"
              >
                Play Again
              </button>
            </div>

            {/* Fun Stats */}
            {score === bugs.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 pt-8 border-t border-slate-700"
              >
                <p className="text-slate-500 text-sm mb-4">Impact Metrics:</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-400">-100%</div>
                    <div className="text-xs text-slate-500">Dead Ends</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400">+{score * 25}%</div>
                    <div className="text-xs text-slate-500">Engagement</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">∞</div>
                    <div className="text-xs text-slate-500">Product Thinking</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NotFound
