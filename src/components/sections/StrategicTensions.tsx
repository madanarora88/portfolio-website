import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

type Option = {
  label: string
  text: string
}

type Scenario = {
  id: string
  tag: string
  title: string
  context: string
  options: Option[]
  chosen: string
  reasoning: string
  tradeoff: string
  lesson: string
}

const scenarios: Scenario[] = [
  {
    id: 'build-buy',
    tag: 'Build vs. Buy · Stakeholder Politics',
    title: 'The $40M Decision Your CTO Has Already Made',
    context:
      "It's Q3 planning. Your CTO has informally committed to a major vendor for an AI platform — $40M over 3 years. Your user research shows the vendor's product doesn't map to how your 50K employees actually work. Engineering says they could build 80% of the functionality in 9 months. The CTO has a personal relationship with the vendor's CEO. You have two weeks to present your recommendation.",
    options: [
      { label: 'A', text: 'Endorse the vendor — protect the relationship, find workarounds for the gaps.' },
      { label: 'B', text: "Present a hybrid: buy the core, build the last mile — reframe it as 'maximizing the investment.'" },
      { label: 'C', text: 'Make the full case for build internally, with data, and accept the political risk.' },
    ],
    chosen: 'B',
    reasoning:
      "Option C is the principled move but burns political capital I'd need for the next 10 decisions. Option A is abdication. The hybrid reframe lets the CTO save face, gets us better user outcomes, and creates a forcing function: if the vendor can't meet the integration spec in 6 months, the data justifies pivoting. I'm playing the long game.",
    tradeoff:
      "I traded short-term completeness for organizational trust. The hybrid isn't the ideal product architecture — it's the best product outcome achievable inside a real organization.",
    lesson:
      "At VP level, the best technical decision and the best organizational decision are rarely the same. Your job is to find the path that produces the best outcome, not the cleanest recommendation.",
  },
  {
    id: 'new-exec',
    tag: 'Executive Alignment · Roadmap Defense',
    title: 'New Leader Wants 90-Day Wins. You Have an 18-Month Roadmap.',
    context:
      "A new CHRO joins with a mandate to 'show AI impact fast.' She asks your team to pause the employee onboarding platform — which 50K hires depend on — and ship an AI chatbot by end of quarter. Your roadmap is already locked with engineering. The chatbot would be superficial, not integrated with any real data, and would embarrass the org if scrutinized. But she controls your budget review.",
    options: [
      { label: 'A', text: 'Build the chatbot. Ship fast. Let the results speak for themselves.' },
      { label: 'B', text: "Push back directly: explain the chatbot won't work and hold the roadmap." },
      { label: 'C', text: "Negotiate: offer a scoped AI feature within the existing roadmap that's real, measurable, and ships in 60 days." },
    ],
    chosen: 'C',
    reasoning:
      "A risks shipping something that damages trust in AI across the org — one bad chatbot poisons the well for 2 years. B signals I'm not a business partner. C requires me to go into the roadmap and find the highest-visibility, lowest-lift AI touchpoint we can genuinely deliver. I scoped an AI-generated onboarding summary email — personalized, integrated with HRIS, measurable open rates. It shipped in 8 weeks. The CHRO used it in her board presentation.",
    tradeoff:
      "I gave up some roadmap integrity to earn executive trust. The feature we shipped wasn't my top priority — but it created the political air cover to protect the work that was.",
    lesson:
      "New executives need proof of partnership, not proof of correctness. Give them a win that's real, then earn the right to own the strategy.",
  },
  {
    id: 'compliance',
    tag: 'Risk · Regulated Environment · Timeline Pressure',
    title: 'Legal Says Stop. The Business Says Ship.',
    context:
      "Two weeks from launch of a new AI-assisted performance feedback tool, Legal flags that the model's outputs could constitute employment decisions under pending EU AI Act guidance — triggering mandatory audit requirements you haven't built for. Engineering says retrofitting the audit layer is 6 weeks minimum. Business stakeholders say a delay will kill adoption momentum and they've already announced the launch to 15,000 managers.",
    options: [
      { label: 'A', text: "Ship as planned. The EU guidance isn't finalized. Legal is being overcautious." },
      { label: 'B', text: 'Delay 6 weeks. Build the audit layer properly. Eat the reputational cost.' },
      { label: 'C', text: "Ship a reduced version — remove the AI-generated language from official records, keep it as 'suggested prompts only' — while building compliance in parallel." },
    ],
    chosen: 'C',
    reasoning:
      "Option A exposes the company to regulatory risk I can't quantify — in financial services, that's a career-ending call. Option B is the safest move but ignores the real cost of lost momentum: we'd lose the manager cohort we'd spent 3 months training. The reduced version isn't a hack — it's a legitimate product decision. 'AI-assisted prompts' vs 'AI-generated evaluations' is a meaningful distinction, and it lets us ship, learn, and retrofit compliance without fraudulently misrepresenting the product.",
    tradeoff:
      "I shipped less product than promised. But I preserved the launch window, protected the company from regulatory exposure, and maintained honest communication with all stakeholders about what the AI was and wasn't doing.",
    lesson:
      "In regulated industries, the best PMs don't choose between speed and compliance — they find the product definition that makes the tradeoff disappear.",
  },
]

export default function StrategicTensions() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [revealedId, setRevealedId] = useState<string | null>(null)

  const active = scenarios.find((s) => s.id === activeId)

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <p className="text-xs tracking-widest uppercase text-primary mb-3">Executive Judgment</p>
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          How I Think at an Executive Level
        </h2>
        <p className="text-light/70 text-lg max-w-2xl leading-relaxed">
          These aren't textbook PM scenarios. They're the kind of decisions senior product leaders
          navigate every week — ambiguous, political, and with no clean answer. Here's how I reason
          through them.
        </p>
      </motion.div>

      <div className="space-y-4">
        {scenarios.map((scenario, i) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-light/10 rounded-xl overflow-hidden bg-light/5 backdrop-blur-sm"
          >
            {/* Collapsed Header */}
            <button
              className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 group"
              onClick={() => {
                setActiveId(activeId === scenario.id ? null : scenario.id)
                setRevealedId(null)
              }}
            >
              <div>
                <p className="text-xs tracking-widest uppercase text-primary mb-2 font-medium">
                  {scenario.tag}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-light group-hover:text-primary transition-colors">
                  {scenario.title}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: activeId === scenario.id ? 45 : 0 }}
                className="shrink-0 mt-1"
              >
                <Plus className="w-6 h-6 text-light/40" />
              </motion.div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {activeId === scenario.id && active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 border-t border-light/10 pt-6">
                    {/* Context */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-3">The Situation</p>
                      <p className="text-light/80 leading-relaxed">{active.context}</p>
                    </div>

                    {/* Options */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-4">The Options</p>
                      <div className="space-y-3">
                        {active.options.map((opt) => (
                          <div
                            key={opt.label}
                            className={`flex gap-4 p-4 rounded-xl border transition-all ${
                              revealedId === active.id && opt.label === active.chosen
                                ? 'border-primary bg-primary/10'
                                : 'border-light/10 bg-dark/50'
                            }`}
                          >
                            <span className="text-sm font-bold text-light/40 w-5 shrink-0 mt-0.5">
                              {opt.label}
                            </span>
                            <p className="text-light/80 text-sm leading-relaxed">{opt.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reveal Button */}
                    {revealedId !== active.id ? (
                      <button
                        onClick={() => setRevealedId(active.id)}
                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm rounded-lg transition-colors font-medium"
                      >
                        What I chose — and why →
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 border-t border-light/10 pt-6"
                      >
                        {/* Chosen + Reasoning */}
                        <div className="bg-light/5 border border-primary/30 rounded-xl p-6">
                          <p className="text-xs uppercase tracking-widest text-primary mb-2">
                            I chose Option {active.chosen}
                          </p>
                          <p className="text-light/90 leading-relaxed">{active.reasoning}</p>
                        </div>

                        {/* Tradeoff */}
                        <div className="p-5 border border-amber-500/30 bg-amber-500/5 rounded-xl">
                          <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">
                            The Tradeoff I Made
                          </p>
                          <p className="text-light/80 text-sm leading-relaxed">{active.tradeoff}</p>
                        </div>

                        {/* Lesson */}
                        <div className="p-5 border border-light/10 bg-light/5 rounded-xl">
                          <p className="text-xs uppercase tracking-widest text-light/40 mb-2">
                            The Principle Behind It
                          </p>
                          <p className="text-light/70 text-sm leading-relaxed italic">
                            "{active.lesson}"
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
