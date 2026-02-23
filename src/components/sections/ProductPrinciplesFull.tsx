import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

type Principle = {
  number: string
  title: string
  short: string
  explanation: string
  example: string
  quote?: string
}

const principles: Principle[] = [
  {
    number: '01',
    title: 'Start with friction, not features.',
    short: "Users don't want features. They want to stop feeling stuck.",
    explanation:
      "Every product decision I make starts with a friction audit, not a feature request. I spend disproportionate time at the front of the process — shadowing users, reading support tickets, sitting in onboarding sessions — because the problem definition is where most teams go wrong. A perfectly built feature that solves the wrong problem is still a failure.",
    example:
      "At Walmart, the instinct was to add more features to the Me@ app. Instead, I spent 2 weeks in distribution centers watching associates use the app in real conditions — bad lighting, gloves on, 90-second windows between tasks. The problem wasn't features. It was that core workflows required 7 taps. We cut it to 2. Adoption jumped 40%.",
    quote: "The best product decisions look obvious in retrospect. That's how you know you solved the right problem.",
  },
  {
    number: '02',
    title: 'Constraint is the engine of creativity.',
    short: "The tightest scope I've ever worked in produced the best outcomes.",
    explanation:
      "I've shipped products with unlimited budgets and 3-person teams. The 3-person teams win almost every time — not because they're scrappier, but because constraints force ruthless prioritization. When you can't build everything, you discover what actually matters. When you have to ship in 6 weeks, you lose the features that were really just comfort.",
    example:
      "At IBM, I inherited a product modernization project with a 30-day deadline and a scope that would've taken 6 months. Instead of negotiating scope down, I reframed the goal: what's the single outcome that would make this feel successful to the client? One workflow. Automated. Measurable. We shipped it. The other 80% became Phase 2 — which had a much better business case because Phase 1 proved the value.",
    quote: "Constraints aren't the enemy of good product work. Vague mandates are.",
  },
  {
    number: '03',
    title: 'The best AI product is the one users forget is AI.',
    short: 'When AI is done right, it disappears into the experience.',
    explanation:
      "Too many AI products lead with the technology. They make users aware of the AI at every step — the loading spinner, the 'AI is thinking' message, the disclaimer. This is a product failure. The measure of a great AI product is how invisible it is. The user gets what they needed. They didn't have to think about how.",
    example:
      "The AI-driven hiring tool I built at Walmart didn't announce itself as AI. It just made the process faster. Candidates got offers faster. Recruiters got better-matched applications. No one cared about the model — they cared that time-to-offer went from 2 weeks to 24 hours. That's the right outcome. The AI was the implementation, not the product.",
    quote: "If users are talking about your AI, you're doing it wrong.",
  },
  {
    number: '04',
    title: 'Metrics are hypotheses, not scorecards.',
    short: "A metric tells you what happened. It doesn't tell you why, or what to do.",
    explanation:
      "I treat metrics as the beginning of a conversation, not the end of one. When a number moves — up or down — my first question is always 'what would have to be true for this to be real?' Most teams celebrate green metrics without interrogating whether they're measuring the right thing. I've seen products with excellent engagement numbers and terrible retention. The metric was right. The product was wrong.",
    example:
      "At American Airlines, our email open rate was 45% — exceptional by industry standards. Leadership considered it a success. I dug deeper and found that most opens were from the same users, opening the same email types, and the behavior wasn't translating to bookings. We were optimizing for a vanity metric. Shifting focus to downstream conversion changed the product strategy completely.",
    quote: "Never fall in love with a metric. Fall in love with the behavior it's supposed to represent.",
  },
  {
    number: '05',
    title: 'Alignment is a product, not a meeting.',
    short: 'The best cross-functional work happens before the room fills up.',
    explanation:
      "I've seen brilliant roadmaps die in steering committees because PMs treated alignment as something you do after you have a plan. Alignment is part of building the plan. The best cross-functional leaders I've worked with operate like diplomats — they understand every stakeholder's real constraint before the official process starts, and they build the proposal that makes it easy for everyone to say yes.",
    example:
      "At JPMC, launching a new onboarding platform required sign-off from Legal, HRIS, IT Security, and three business lines — all with competing priorities. Instead of scheduling a big launch review, I spent 3 weeks in 1:1s with each group, mapping their concerns, and adjusting the rollout plan in real time. By the time we had the official review, every objection had already been addressed. The meeting took 20 minutes.",
    quote: "If you're surprised by what people say in a big meeting, you didn't do the work before it.",
  },
  {
    number: '06',
    title: 'Ship to learn, not to launch.',
    short: 'A launch is an experiment. Treat it that way.',
    explanation:
      "Every product I ship is a hypothesis. The launch isn't the destination — it's when I finally get real data. I design rollouts with learning in mind: small cohorts first, clear success metrics established before launch, feedback loops built into the product itself. The teams that treat every launch as a finish line learn the least. The teams that treat every launch as a starting line ship the best products.",
    example:
      "The Me@Walmart Supply Chain app launched to 5,000 associates before it went to 122,000. We instrumented everything — not just usage metrics, but qualitative signals. Where did people stop? What did they search for that we hadn't anticipated? That 5,000-user cohort gave us 3 major product pivots before full rollout. By the time we went broad, we had an 80%+ adoption rate because we'd already solved the problems that would have caused churn.",
    quote: "The most dangerous phrase in product: 'We'll fix it after launch.'",
  },
]

export default function ProductPrinciplesFull() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-xs tracking-widest uppercase text-primary mb-3">How I Operate</p>
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">Product Principles</h2>
        <p className="text-light/70 text-lg max-w-2xl leading-relaxed">
          These aren't slogans. Each one is a belief I've formed by being wrong first. Click any
          principle to see where it came from.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-xl border cursor-pointer transition-all overflow-hidden ${
              expandedId === p.number
                ? 'border-primary/40 bg-light/5 md:col-span-2'
                : 'border-light/10 bg-light/5 hover:border-primary/30'
            }`}
            onClick={() => setExpandedId(expandedId === p.number ? null : p.number)}
          >
            {/* Always visible header */}
            <div className="p-6 flex items-start gap-5">
              <span className={`text-3xl font-bold shrink-0 ${expandedId === p.number ? 'text-primary/60' : 'text-light/20'}`}>
                {p.number}
              </span>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 transition-colors ${expandedId === p.number ? 'text-primary' : 'text-light'}`}>
                  {p.title}
                </h3>
                <p className="text-sm text-light/60">{p.short}</p>
              </div>
              <motion.div
                animate={{ rotate: expandedId === p.number ? 45 : 0 }}
                className="shrink-0"
              >
                <Plus className="w-5 h-5 text-light/40" />
              </motion.div>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {expandedId === p.number && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 grid md:grid-cols-2 gap-8 border-t border-light/10 pt-6">
                    {/* The Belief */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-3">The Belief</p>
                      <p className="text-light/80 leading-relaxed text-sm">{p.explanation}</p>
                      {p.quote && (
                        <p className="mt-5 text-light/50 text-sm italic border-l-2 border-primary/50 pl-4">
                          {p.quote}
                        </p>
                      )}
                    </div>

                    {/* Where This Came From */}
                    <div className="bg-dark/50 border border-light/10 rounded-xl p-5">
                      <p className="text-xs uppercase tracking-widest text-light/40 mb-3">
                        Where This Came From
                      </p>
                      <p className="text-light/80 text-sm leading-relaxed">{p.example}</p>
                    </div>
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
