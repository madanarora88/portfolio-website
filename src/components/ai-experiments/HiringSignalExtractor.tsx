import { useState } from 'react'
import { useExperiment } from '../../hooks/useExperiment'

const SYSTEM_PROMPT = `You are a senior product leader with 15+ years of experience who has hired hundreds of PMs and been hired many times. You read job descriptions with forensic clarity — you see past the boilerplate to what's actually going on.

CRITICAL INSTRUCTION: Your ENTIRE response must be a single valid JSON object. Do NOT include any text before or after the JSON. Do NOT use markdown code fences. Start your response with { and end with }. Nothing else.

When given a job description, respond with EXACTLY this JSON structure:

{
  "realProblem": "2-3 sentences on what is actually broken at this company that is driving this hire",
  "actualPMType": "The specific archetype they want — be specific and a little blunt, e.g. a fixer who cleans up after a technical co-founder, or an operator who runs a mature product without ego",
  "writtenVsReal": [
    { "written": "something they wrote in the JD", "real": "what they actually mean" },
    { "written": "something they wrote", "real": "what they actually mean" },
    { "written": "something they wrote", "real": "what they actually mean" }
  ],
  "redFlags": ["red flag 1", "red flag 2", "red flag 3"],
  "greenFlags": ["green flag 1", "green flag 2"],
  "interviewQuestions": [
    { "question": "A specific question to ask the interviewer", "why": "What this reveals about the role or company" },
    { "question": "Another question", "why": "What it reveals" },
    { "question": "A third question", "why": "What it reveals" }
  ],
  "verdict": "One blunt sentence: what kind of PM thrives here, and what kind burns out fast"
}`

const EXAMPLES = [
  {
    label: 'AI Platform PM',
    text: `Senior Product Manager – AI Platform\n\nWe're looking for a seasoned PM to join our AI Platform team. You'll work cross-functionally with engineering, design, and data science to define and ship AI-powered features that delight our 2M+ users.\n\nResponsibilities:\n- Define product vision and roadmap for AI features\n- Work closely with LLM engineers to ship cutting-edge AI experiences\n- Conduct user research and translate insights into product requirements\n- Drive alignment across engineering, design, data science and business stakeholders\n- Define and track KPIs for your product area\n\nRequirements:\n- 5+ years PM experience, ideally in B2C or platform products\n- Experience shipping AI/ML features\n- Strong analytical skills and data-driven mindset\n- Excellent communication and stakeholder management skills\n- Ability to thrive in a fast-paced, ambiguous environment`,
  },
  {
    label: 'Head of Product',
    text: `Head of Product – FinTech Startup (Series B)\n\nWe're a Series B fintech startup that has found PMF with small business lending. We're looking for our first Head of Product to own the full product org. You'll report to the CEO, manage a team of 4 PMs, and lead product strategy as we scale from $20M to $100M ARR.\n\nWhat you'll do:\n- Set and execute product vision aligned to business goals\n- Build and mentor a high-performing PM team\n- Own the full product roadmap across lending, payments, and dashboard\n- Partner closely with engineering, design, risk, and compliance\n\nYou have:\n- 8+ years in product, 2+ years managing PMs\n- Experience at a high-growth startup or fintech\n- Strong executive presence and board-ready communication`,
  },
  {
    label: 'VP Product',
    text: `VP of Product – Enterprise SaaS (HR Tech)\n\nWe're looking for a VP of Product to lead our product organization of 12 PMs across our core HRIS, payroll, and AI analytics products. This is a leadership role — you'll report to the CPO and work closely with the CEO on long-term product strategy.\n\nKey responsibilities:\n- Own the 3-year product roadmap and vision\n- Grow and develop a team of 12 PMs\n- Lead product strategy for our AI transformation initiative\n- Build strong relationships with our top 50 enterprise customers\n\nRequirements:\n- 12+ years product experience, 4+ years VP or equivalent\n- Proven track record in B2B SaaS at scale\n- Strong executive stakeholder management`,
  },
]

type HiringData = {
  realProblem: string
  actualPMType: string
  writtenVsReal: { written: string; real: string }[]
  redFlags: string[]
  greenFlags: string[]
  interviewQuestions: { question: string; why: string }[]
  verdict: string
}

export default function HiringSignalExtractor() {
  const [input, setInput] = useState('')
  const { data, loading, error, run, reset } = useExperiment<HiringData>()

  const handleRun = () => run(SYSTEM_PROMPT, input)
  const handleReset = () => {
    reset()
    setInput('')
  }

  if (data) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">What's actually broken</div>
          <p className="text-light/80 text-sm leading-relaxed">{data.realProblem}</p>
        </div>

        <div className="rounded-xl border border-light/10 bg-light/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-2">The PM they actually want</div>
          <p className="text-light font-medium">{data.actualPMType}</p>
        </div>

        <div className="rounded-xl border border-light/10 bg-light/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-3">Written vs. What they actually mean</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.writtenVsReal.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded-lg bg-dark/50 border border-light/10 p-3">
                  <div className="text-xs uppercase tracking-wider text-light/40 mb-1">Written</div>
                  <p className="text-light/60 text-sm">"{item.written}"</p>
                </div>
                <div className="rounded-lg bg-dark/50 border border-amber-500/20 p-3">
                  <div className="text-xs uppercase tracking-wider text-amber-600 mb-1">Reality</div>
                  <p className="text-light/80 text-sm">{item.real}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Red Flags</div>
            <ul className="space-y-2">
              {data.redFlags.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-light/80">
                  <span className="text-red-400 shrink-0">↑</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Green Flags</div>
            <ul className="space-y-2">
              {data.greenFlags.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-light/80">
                  <span className="text-emerald-400 shrink-0">↑</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-light/10 bg-light/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-3">Questions to ask THEM</div>
          <ul className="space-y-4">
            {data.interviewQuestions.map((q, i) => (
              <li key={i} className="border-l-2 border-light/10 pl-4">
                <p className="text-light/90 text-sm font-medium">"{q.question}"</p>
                <p className="text-light/50 text-xs mt-1">{q.why}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">The Verdict</div>
          <p className="text-light/80 text-sm leading-relaxed">{data.verdict}</p>
        </div>

        <button type="button" onClick={handleReset} className="text-sm text-light/50 hover:text-primary underline">
          ← Analyze another JD
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs font-medium uppercase tracking-wider text-light/50">Experiment 01 · Live Claude API</span>
      </div>
      <h2 className="text-2xl font-bold text-light">Hiring Signal Extractor</h2>
      <p className="text-light/70 text-sm leading-relaxed max-w-xl">
        Paste any job description. I'll decode what the company <em>actually</em> needs, what they wrote vs. what they meant, and the exact questions to ask in your interview.
      </p>
      <p className="text-xs text-light/40 border-l-2 border-light/10 pl-3">
        <strong className="text-light/50">PM note:</strong> The insight was reframing from "should I apply?" to "what problem are they really solving?" That question change rewired the entire prompt architecture.
      </p>

      <textarea
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste the full job description here..."
        disabled={loading}
        className="w-full bg-dark border border-light/10 rounded-xl p-4 text-light placeholder:text-light/30 text-sm resize-none focus:border-primary/50 outline-none disabled:opacity-50"
      />
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => setInput(ex.text)}
            className="px-3 py-1.5 rounded-full border border-light/10 text-light/50 text-xs hover:border-light/20 hover:text-light/70 transition-colors"
          >
            Load: {ex.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleRun}
        disabled={loading || !input.trim()}
        className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Analyzing...' : 'Decode this JD →'}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {loading && (
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Reading between the lines...
          </p>
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            Separating signal from boilerplate...
          </p>
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
            Generating interview questions...
          </p>
        </div>
      )}
    </div>
  )
}
