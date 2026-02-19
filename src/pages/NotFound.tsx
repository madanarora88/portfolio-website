import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bug, Home, Briefcase, Mail } from 'lucide-react'

/**
 * Simplified Bug Hunt - squash the bugs to escape the 404!
 */
const BUG_COUNT = 6
const BUG_LABELS = ['Scope creep', 'Deadline', 'Requirements', 'Stakeholder', 'Tech debt', 'Backlog']

const NotFound = () => {
  const [squashed, setSquashed] = useState<number[]>([])

  const handleSquash = (id: number) => {
    if (squashed.includes(id)) return
    setSquashed([...squashed, id])
  }

  const allSquashed = squashed.length === BUG_COUNT

  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-4">🐛</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
          Squash the bugs to escape!
        </h1>
        <p className="text-light/70 mb-8">
          This page has some bugs. Click each one to squash it.
        </p>

        {!allSquashed ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {Array.from({ length: BUG_COUNT }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSquash(i)}
                  disabled={squashed.includes(i)}
                  className={`
                    aspect-square rounded-2xl flex flex-col items-center justify-center gap-1
                    border-2 transition-all
                    ${squashed.includes(i)
                      ? 'bg-green-500/20 border-green-500/40 opacity-60 cursor-default'
                      : 'bg-red-500/20 border-red-500/40 hover:scale-105 hover:bg-red-500/30 active:scale-95 cursor-pointer'
                    }
                  `}
                >
                  {squashed.includes(i) ? (
                    <span className="text-3xl">✅</span>
                  ) : (
                    <>
                      <Bug className="w-10 h-10 text-red-400" />
                      <span className="text-xs font-medium text-light/80">{BUG_LABELS[i]}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
            <p className="text-light/50 text-sm">
              {squashed.length} / {BUG_COUNT} squashed
            </p>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-light/80 text-lg">All bugs squashed! Choose your path:</p>
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
