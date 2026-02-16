import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { simulatorScenarios, type SimulatorScenario } from '../../data/simulatorScenarios'
import { Lightbulb, ArrowRight, RotateCcw } from 'lucide-react'

export default function ProductThinkingSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const scenario = simulatorScenarios[scenarioIndex]

  const resetScenario = () => {
    setSelectedOption(null)
  }

  const nextScenario = () => {
    if (scenarioIndex < simulatorScenarios.length - 1) {
      setScenarioIndex((i) => i + 1)
      setSelectedOption(null)
    }
  }

  const prevScenario = () => {
    if (scenarioIndex > 0) {
      setScenarioIndex((i) => i - 1)
      setSelectedOption(null)
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Think Like a Product Manager</h1>
        <p className="text-lg text-light/70 max-w-2xl">
          Test your product instincts. Read each scenario, pick an option, then see how an experienced PM would think through it.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Scenario selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {simulatorScenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setScenarioIndex(i)
                setSelectedOption(null)
              }}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                i === scenarioIndex
                  ? 'bg-primary text-white'
                  : 'bg-light/5 text-light/60 hover:bg-light/10'
              }`}
            >
              Scenario {i + 1}
            </button>
          ))}
        </div>

        <ScenarioCard
          scenario={scenario}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
          onReset={resetScenario}
          onNext={nextScenario}
          onPrev={prevScenario}
          isLast={scenarioIndex === simulatorScenarios.length - 1}
          isFirst={scenarioIndex === 0}
        />
      </div>
    </div>
  )
}

function ScenarioCard({
  scenario,
  selectedOption,
  onSelectOption,
  onReset,
  onNext,
  onPrev,
  isLast,
  isFirst,
}: {
  scenario: SimulatorScenario
  selectedOption: string | null
  onSelectOption: (id: string) => void
  onReset: () => void
  onNext: () => void
  onPrev: () => void
  isLast: boolean
  isFirst: boolean
}) {
  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-light/5 backdrop-blur-sm border border-light/10 rounded-xl overflow-hidden"
    >
      <div className="p-8 md:p-10">
        <h2 className="text-xl font-bold mb-4">{scenario.title}</h2>
        <p className="text-light/80 mb-8 leading-relaxed">{scenario.scenario}</p>

        {!selectedOption ? (
          <div className="space-y-3">
            {scenario.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className="w-full text-left p-4 rounded-lg border border-light/10 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div className="font-medium text-light group-hover:text-primary transition-colors">
                  {opt.label}
                </div>
                <div className="text-sm text-light/60 mt-1">{opt.description}</div>
              </button>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                  <Lightbulb className="w-5 h-5" />
                  What I would choose
                </div>
                <p className="text-light/90">{scenario.pmChoice}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Why</h3>
                <p className="text-light/80 leading-relaxed">{scenario.why}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tradeoffs</h3>
                <p className="text-light/80 leading-relaxed">{scenario.tradeoffs}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={onReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light/20 text-light/80 hover:bg-light/5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try again
                </button>
                {!isFirst && (
                  <button
                    onClick={onPrev}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light/20 text-light/80 hover:bg-light/5 transition-all"
                  >
                    Previous scenario
                  </button>
                )}
                {!isLast && (
                  <button
                    onClick={onNext}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all"
                  >
                    Next scenario
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}
