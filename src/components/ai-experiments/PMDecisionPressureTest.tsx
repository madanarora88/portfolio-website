import { useState } from 'react'
import { useExperiment } from '../../hooks/useExperiment'

const SYSTEM_PROMPT = `You are Madan Arora — a VP-level product leader with 13+ years across JPMorgan Chase, Walmart, IBM, and American Airlines. You have shipped products used by over 1 million users and navigated every kind of enterprise politics, technical constraint, and stakeholder nightmare.

CRITICAL INSTRUCTION: Your ENTIRE response must be a single valid JSON object. Do NOT include any text before or after the JSON. Do NOT use markdown code fences. Start your response with { and end with }. Nothing else.

When given a product decision someone is sitting on, respond with EXACTLY this JSON:

{
  "dataPerspective": {
    "headline": "What the data and metrics would say — one punchy sentence",
    "argument": "The full argument from a data-driven perspective in 2-3 sentences",
    "weakness": "The blind spot or limitation of this perspective"
  },
  "politicsPerspective": {
    "headline": "What organizational reality would say — one punchy sentence",
    "argument": "The full argument from an organizational and political perspective in 2-3 sentences",
    "weakness": "The blind spot or limitation of this perspective"
  },
  "userPerspective": {
    "headline": "What users would say if they could be completely honest — one punchy sentence",
    "argument": "The full argument from the user experience perspective in 2-3 sentences",
    "weakness": "The blind spot or limitation of this perspective"
  },
  "myCall": {
    "decision": "The specific decision I would make — no hedging, no 'it depends'",
    "reasoning": "Why — what tipped it for me in 2-3 sentences",
    "firstMove": "The single most important concrete action to take this week",
    "watchOut": "The one thing that would make me reverse this call"
  },
  "seniorPMTruth": "One uncomfortable truth about this situation that most PMs would avoid saying out loud"
}`

const EXAMPLES = [
  `Should we build an AI chatbot for our HR portal? Engineering says 3 months. The CHRO is excited because she saw a demo at a conference. Our users mostly just need to find their paystub and update their direct deposit. We have 45,000 employees. The portal currently has a 3.2 star satisfaction score.`,
  `Our onboarding completion rate dropped from 68% to 51% over the last 3 months. We pushed one big update 4 months ago that redesigned the dashboard. Leadership wants to do a full onboarding redesign — budget approved, 6-week project. I think it might be one broken email flow. How do I decide?`,
  `We have a feature — advanced custom reporting — that 12% of users love intensely but 88% never touch. It costs roughly 30% of engineering capacity. The CEO wants to cut it. Our top 5 customers use it daily and it's in their contracts.`,
]

type Perspective = { headline: string; argument: string; weakness: string }
type DecisionData = {
  dataPerspective: Perspective
  politicsPerspective: Perspective
  userPerspective: Perspective
  myCall: { decision: string; reasoning: string; firstMove: string; watchOut: string }
  seniorPMTruth: string
}

export default function PMDecisionPressureTest() {
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState<'data' | 'politics' | 'user' | 'call'>('data')
  const { data, loading, error, run, reset } = useExperiment<DecisionData>()

  const handleRun = () => {
    run(SYSTEM_PROMPT, input)
    setActiveTab('data')
  }
  const handleReset = () => {
    reset()
    setInput('')
  }

  if (data) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-light/10 bg-light/5 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-1">Your decision</div>
          <p className="text-light/70 text-sm">"{input}"</p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-light/10 pb-2">
          {(['data', 'politics', 'user', 'call'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-black'
                  : 'bg-light/5 text-light/70 hover:bg-light/10 hover:text-light'
              }`}
            >
              {tab === 'data' ? 'Data' : tab === 'politics' ? 'Org' : tab === 'user' ? 'User' : 'My Call'}
            </button>
          ))}
        </div>

        {activeTab === 'data' && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">The Data Says</div>
            <p className="text-light font-medium text-sm mb-2">{data.dataPerspective.headline}</p>
            <p className="text-light/80 text-sm leading-relaxed mb-3">{data.dataPerspective.argument}</p>
            <div className="rounded-lg bg-dark/50 border border-light/10 p-3">
              <div className="text-xs uppercase tracking-wider text-light/40 mb-1">Blind spot</div>
              <p className="text-light/70 text-sm">{data.dataPerspective.weakness}</p>
            </div>
          </div>
        )}

        {activeTab === 'politics' && (
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">The Org Says</div>
            <p className="text-light font-medium text-sm mb-2">{data.politicsPerspective.headline}</p>
            <p className="text-light/80 text-sm leading-relaxed mb-3">{data.politicsPerspective.argument}</p>
            <div className="rounded-lg bg-dark/50 border border-light/10 p-3">
              <div className="text-xs uppercase tracking-wider text-light/40 mb-1">Blind spot</div>
              <p className="text-light/70 text-sm">{data.politicsPerspective.weakness}</p>
            </div>
          </div>
        )}

        {activeTab === 'user' && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">The User Says</div>
            <p className="text-light font-medium text-sm mb-2">{data.userPerspective.headline}</p>
            <p className="text-light/80 text-sm leading-relaxed mb-3">{data.userPerspective.argument}</p>
            <div className="rounded-lg bg-dark/50 border border-light/10 p-3">
              <div className="text-xs uppercase tracking-wider text-light/40 mb-1">Blind spot</div>
              <p className="text-light/70 text-sm">{data.userPerspective.weakness}</p>
            </div>
          </div>
        )}

        {activeTab === 'call' && (
          <>
            <div className="rounded-xl border border-light/20 bg-light/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-2">What I'd do</div>
              <p className="text-light font-medium text-sm mb-2">{data.myCall.decision}</p>
              <p className="text-light/80 text-sm leading-relaxed">{data.myCall.reasoning}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-light/10 bg-light/5 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-2">First move this week</div>
                <p className="text-light/80 text-sm">{data.myCall.firstMove}</p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Would reverse if...</div>
                <p className="text-light/80 text-sm">{data.myCall.watchOut}</p>
              </div>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">The thing most PMs won't say</div>
              <p className="text-light/80 text-sm">"{data.seniorPMTruth}"</p>
            </div>
          </>
        )}

        <button type="button" onClick={handleReset} className="text-sm text-light/50 hover:text-primary underline">
          ← Pressure test another decision
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-xs font-medium uppercase tracking-wider text-light/50">Experiment 02 · Live Claude API</span>
      </div>
      <h2 className="text-2xl font-bold text-light">PM Decision Pressure Test</h2>
      <p className="text-light/70 text-sm leading-relaxed max-w-xl">
        Describe a product decision you're sitting on. I'll steelman the data perspective, the political reality, and what users would actually say, then tell you exactly what I'd do.
      </p>
      <p className="text-xs text-light/40 border-l-2 border-light/10 pl-3">
        <strong className="text-light/50">PM note:</strong> The three-lens framework forces a stake in the ground. Analysts give you options. Senior PMs make a call.
      </p>

      <textarea
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your decision... be specific. What's the context, what are you choosing between, what's making it hard?"
        disabled={loading}
        className="w-full bg-dark border border-light/10 rounded-xl p-4 text-light placeholder:text-light/30 text-sm resize-none focus:border-primary/50 outline-none disabled:opacity-50"
      />
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInput(ex)}
            className="px-3 py-1.5 rounded-full border border-light/10 text-light/50 text-xs hover:border-light/20 hover:text-light/70 transition-colors max-w-[280px] truncate"
          >
            {ex.slice(0, 40)}...
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleRun}
        disabled={loading || !input.trim()}
        className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Analyzing...' : 'Pressure test this →'}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {loading && (
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Analyzing the data lens...
          </p>
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            Reading the political landscape...
          </p>
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
            Making the call...
          </p>
        </div>
      )}
    </div>
  )
}
