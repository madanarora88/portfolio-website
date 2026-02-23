import { useState } from 'react'
import { useExperiment } from '../../hooks/useExperiment'

const SYSTEM_PROMPT = `You are a world-class product leader who has obsessively studied onboarding. You have personally rebuilt onboarding at Fortune 50 companies, reducing drop-off by 50%+ by understanding not just what users do but why they stop.

CRITICAL INSTRUCTION: Your ENTIRE response must be a single valid JSON object. Do NOT include any text before or after the JSON. Do NOT use markdown code fences. Start your response with { and end with }. Nothing else.

When given a description of an onboarding flow, respond with EXACTLY this JSON:

{
  "overallHealth": "critical",
  "healthSummary": "One blunt sentence on the state of this onboarding",
  "frictions": [
    {
      "step": "Where in the flow this happens",
      "severity": "high",
      "what": "What is happening at this step",
      "why": "The specific psychological reason users stop here — not surface-level, go deep",
      "fix": "The specific fix — not generic advice, the actual product change to make",
      "effort": "quick-win"
    }
  ],
  "biggestMistake": "The single most costly mistake in this onboarding design",
  "counterintuitiveFix": "The fix that sounds counterproductive but works — the one most teams resist doing",
  "northStar": "The one metric that, if you optimize for it, fixes everything else",
  "weekOneAction": "The single change to make this week before anything else"
}

Rules: overallHealth must be one of: critical, concerning, solid, excellent. severity: high, medium, or low. effort: quick-win, medium-lift, or major-rework. Maximum 5 frictions ranked by severity. Be specific and blunt.`

const EXAMPLES = [
  {
    label: 'SaaS B2B',
    text: `SaaS B2B project management tool. Users sign up with email, get a verification email (many miss it or it goes to spam), then land on an empty project dashboard with just a "Create your first project" button. Clicking it opens a blank project. There's a help tooltip in the corner but 80% of users dismiss it immediately. After 5 minutes with an empty project, most users leave. We have a 12-step feature tour that triggers on Day 2 via email but only 22% open it.`,
  },
  {
    label: 'Mobile Consumer',
    text: `Consumer mobile app for personal finance tracking. Screen 1: Sign up with email + password (no social login). Screen 2: We ask for notification permissions, location access, AND camera access all at once. Screen 3: 5-question survey about their financial goals. Screen 4: We ask them to connect their bank account via Plaid. If they skip bank connection, they land on an empty dashboard showing $0 everywhere. 73% drop at the bank connection screen.`,
  },
  {
    label: 'Enterprise HR',
    text: `Enterprise HR portal for a 45,000 person company. New employees get a welcome email with a PDF benefits guide on Day 1. They log into the portal and see a dashboard with 23 checklist items — all shown at equal visual priority. Items include: complete I-9 (deadline: 3 days), set up direct deposit, enroll in benefits (deadline: 30 days), complete 14 required training modules, read the employee handbook (PDF, 115 pages), update emergency contact. No guidance on what's urgent vs. optional. Support tickets in first 2 weeks are 4x higher than any other period.`,
  },
]

type Friction = {
  step: string
  severity: 'high' | 'medium' | 'low'
  what: string
  why: string
  fix: string
  effort: 'quick-win' | 'medium-lift' | 'major-rework'
}
type OnboardingData = {
  overallHealth: 'critical' | 'concerning' | 'solid' | 'excellent'
  healthSummary: string
  frictions: Friction[]
  biggestMistake: string
  counterintuitiveFix: string
  northStar: string
  weekOneAction: string
}

const HEALTH_CONFIG: Record<OnboardingData['overallHealth'], { label: string; bg: string; border: string; text: string }> = {
  critical: { label: 'Critical', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  concerning: { label: 'Concerning', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  solid: { label: 'Solid', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  excellent: { label: 'Excellent', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
}
const SEVERITY_CONFIG = {
  high: { dot: 'bg-red-500', badge: 'bg-red-500/20 text-red-400', label: 'High' },
  medium: { dot: 'bg-amber-500', badge: 'bg-amber-500/20 text-amber-400', label: 'Medium' },
  low: { dot: 'bg-emerald-500', badge: 'bg-emerald-500/20 text-emerald-400', label: 'Low' },
}
const EFFORT_CONFIG = {
  'quick-win': { label: 'Quick win', cls: 'bg-emerald-500/20 text-emerald-400' },
  'medium-lift': { label: 'Medium lift', cls: 'bg-amber-500/20 text-amber-400' },
  'major-rework': { label: 'Major rework', cls: 'bg-red-500/20 text-red-400' },
}

export default function OnboardingFailureDetector() {
  const [input, setInput] = useState('')
  const { data, loading, error, run, reset } = useExperiment<OnboardingData>()

  const handleRun = () => run(SYSTEM_PROMPT, input)
  const handleReset = () => {
    reset()
    setInput('')
  }

  if (data) {
    const hc = HEALTH_CONFIG[data.overallHealth] ?? HEALTH_CONFIG.critical
    return (
      <div className="space-y-4">
        <div className={`rounded-xl border ${hc.border} ${hc.bg} p-5`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${hc.text} mb-1`}>{hc.label}</div>
          <p className="text-light/80 text-sm leading-relaxed">{data.healthSummary}</p>
        </div>

        <div className="text-[0.65rem] uppercase tracking-widest text-light/40 mb-3">Friction Map — ranked by impact</div>

        <div className="space-y-4">
          {data.frictions.map((f, i) => {
            const s = SEVERITY_CONFIG[f.severity] ?? SEVERITY_CONFIG.medium
            const e = EFFORT_CONFIG[f.effort] ?? EFFORT_CONFIG['medium-lift']
            return (
              <div key={i} className="rounded-xl border border-light/10 bg-light/5 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                    <span className="text-light font-medium text-sm">{f.step}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${s.badge}`}>{s.label}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${e.cls}`}>{e.label}</span>
                  </div>
                </div>
                <p className="text-light/70 text-sm">{f.what}</p>
                <div className="rounded-lg bg-dark/50 border border-light/10 p-3">
                  <div className="text-xs uppercase tracking-wider text-light/40 mb-1">Why they actually stop</div>
                  <p className="text-light/70 text-sm">{f.why}</p>
                </div>
                <div className="rounded-lg bg-dark/50 border border-light/10 p-3">
                  <div className="text-xs uppercase tracking-wider text-light/40 mb-1">The fix</div>
                  <p className="text-light/70 text-sm">{f.fix}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Biggest mistake</div>
            <p className="text-light/80 text-sm">{data.biggestMistake}</p>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">Counterintuitive fix</div>
            <p className="text-light/80 text-sm">{data.counterintuitiveFix}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-light/10 bg-light/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-light/50 mb-2">North star metric</div>
            <p className="text-light font-medium text-sm">{data.northStar}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Do this first — this week</div>
            <p className="text-light/80 text-sm">{data.weekOneAction}</p>
          </div>
        </div>

        <button type="button" onClick={handleReset} className="text-sm text-light/50 hover:text-primary underline">
          ← Audit another flow
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-medium uppercase tracking-wider text-light/50">Experiment 03 · Live Claude API</span>
      </div>
      <h2 className="text-2xl font-bold text-light">Onboarding Failure Detector</h2>
      <p className="text-light/70 text-sm leading-relaxed max-w-xl">
        Describe your onboarding flow — steps, screens, drop-off points. I'll map frictions, rank them by impact, and tell you the one fix to make this week.
      </p>
      <p className="text-xs text-light/40 border-l-2 border-light/10 pl-3">
        <strong className="text-light/50">PM note:</strong> Most teams optimize the wrong thing. This focuses on why users actually stop, not where they click.
      </p>

      <textarea
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste or describe your onboarding flow... steps, screens, where users drop, any data you have."
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
        className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Analyzing...' : 'Find failure points →'}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {loading && (
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Mapping the flow...
          </p>
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            Identifying friction points...
          </p>
          <p className="flex items-center gap-2 text-xs text-light/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
            Ranking by impact...
          </p>
        </div>
      )}
    </div>
  )
}
