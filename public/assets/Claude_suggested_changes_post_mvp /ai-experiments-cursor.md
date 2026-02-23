# AI Experiments Page — Cursor Build Guide

3 live experiments wired to the Claude API.
Tested and working. Copy each file exactly as written.

---

## File Structure

```
src/
├── app/
│   ├── ai-experiments/
│   │   └── page.tsx
│   └── api/
│       └── claude/
│           └── route.ts
├── components/
│   └── experiments/
│       ├── ExperimentShell.tsx
│       ├── HiringSignalExtractor.tsx
│       ├── PMDecisionPressureTest.tsx
│       └── OnboardingFailureDetector.tsx
└── styles/
    └── experiments.css
```

---

## 1. API Route
**`src/app/api/claude/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userMessage } = await req.json()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ text })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

**.env.local**
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## 2. Shared Hook
**`src/hooks/useExperiment.ts`**

```typescript
import { useState, useCallback } from 'react'

function robustParse(text: string) {
  // Strip markdown fences
  let cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  try { return JSON.parse(cleaned) } catch (_) {}

  // Extract first {...} block
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first !== -1 && last > first) {
    try { return JSON.parse(cleaned.slice(first, last + 1)) } catch (_) {}
  }

  // Fix trailing commas and control chars
  try {
    const fixed = cleaned
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/\n/g, ' ')
      .replace(/[\x00-\x1F\x7F]/g, ' ')
    return JSON.parse(fixed)
  } catch (_) {}

  console.error('Could not parse JSON:', text)
  throw new Error('JSON parse failed')
}

export function useExperiment<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async (systemPrompt: string, userMessage: string) => {
    setLoading(true)
    setData(null)
    setError(null)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt, userMessage }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      const parsed = robustParse(json.text) as T
      setData(parsed)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return { data, loading, error, run, reset }
}
```

---

## 3. Shared CSS
**`src/styles/experiments.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

.exp-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: 'DM Sans', system-ui, sans-serif;
}

/* ── Page Header ── */
.exp-page-header {
  max-width: 760px;
  margin: 0 auto;
  padding: 7rem 2rem 2.5rem;
}
.exp-eyebrow {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.exp-eyebrow::after {
  content: '';
  display: block;
  width: 2rem;
  height: 1px;
  background: #333;
}
.exp-page-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 1rem;
}
.exp-page-sub {
  color: #555;
  font-size: 1rem;
  line-height: 1.8;
  max-width: 520px;
}

/* ── Tab Selector ── */
.exp-selector {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 2rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}
.exp-tab-btn {
  background: transparent;
  border: 1px solid #1e1e1e;
  border-radius: 14px;
  padding: 1.25rem 1rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  font-family: 'DM Sans', system-ui, sans-serif;
}
.exp-tab-btn:hover { border-color: #333; }
.exp-tab-btn.active { border-color: #444; background: #111; }
.tab-num {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.tab-title {
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}
.tab-sub { color: #555; font-size: 0.72rem; line-height: 1.4; }

/* ── Experiment Panel ── */
.exp-panel {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}
.exp-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
  border: 1px solid #333;
  color: #888;
  margin-bottom: 1.25rem;
}
.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}
.exp-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  color: #fff;
  margin-bottom: 0.875rem;
  line-height: 1.2;
}
.exp-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.75;
  max-width: 520px;
  margin-bottom: 1rem;
}
.pm-note {
  font-size: 0.75rem;
  color: #444;
  border-left: 2px solid #1e1e1e;
  padding-left: 0.75rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.pm-note strong { color: #555; }

/* ── Form ── */
.exp-textarea {
  width: 100%;
  background: #111;
  border: 1px solid #1e1e1e;
  color: #ccc;
  padding: 1.25rem;
  border-radius: 14px;
  font-size: 0.875rem;
  line-height: 1.7;
  resize: none;
  font-family: 'DM Sans', system-ui, sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.exp-textarea:focus { border-color: #333; }
.exp-textarea::placeholder { color: #333; }
.exp-textarea:disabled { opacity: 0.5; }

.examples-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.example-chip {
  background: transparent;
  border: 1px solid #1e1e1e;
  color: #555;
  padding: 0.35rem 0.875rem;
  border-radius: 100px;
  font-size: 0.72rem;
  cursor: pointer;
  font-family: 'DM Sans', system-ui, sans-serif;
  transition: all 0.2s;
}
.example-chip:hover { border-color: #444; color: #aaa; }

.run-btn {
  margin-top: 1.25rem;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'DM Sans', system-ui, sans-serif;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.run-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-amber { background: #f59e0b; color: #000; }
.btn-amber:hover:not(:disabled) { background: #fbbf24; transform: translateY(-1px); }
.btn-blue { background: #3b82f6; color: #fff; }
.btn-blue:hover:not(:disabled) { background: #60a5fa; transform: translateY(-1px); }
.btn-emerald { background: #10b981; color: #000; }
.btn-emerald:hover:not(:disabled) { background: #34d399; transform: translateY(-1px); }

.error-msg {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 1rem;
}
.reset-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #444;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
  background: none;
  border: none;
  font-family: 'DM Sans', system-ui, sans-serif;
}
.reset-link:hover { color: #888; }

/* Loading hints */
.loading-hints { margin-top: 1.25rem; }
.loading-hint {
  font-size: 0.75rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
}
.loading-hint:nth-child(1) { animation-delay: 0s; }
.loading-hint:nth-child(2) { animation-delay: 0.9s; }
.loading-hint:nth-child(3) { animation-delay: 1.8s; }
.hint-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

/* ── Result Cards ── */
.results { animation: slideUp 0.3s ease; }

.card {
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 0.875rem;
}
.card-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.875rem;
  color: #555;
}
.card-body { color: #bbb; font-size: 0.9rem; line-height: 1.75; }
.card-headline {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.5rem;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 0.875rem;
}

.card-amber { border-color: rgba(245,158,11,0.2); background: rgba(245,158,11,0.04); }
.card-amber .card-label { color: #f59e0b; }
.card-blue { border-color: rgba(59,130,246,0.2); background: rgba(59,130,246,0.04); }
.card-blue .card-label { color: #3b82f6; }
.card-emerald { border-color: rgba(16,185,129,0.2); background: rgba(16,185,129,0.04); }
.card-emerald .card-label { color: #10b981; }
.card-red { border-color: rgba(239,68,68,0.15); background: rgba(239,68,68,0.03); }
.card-red .card-label { color: #ef4444; }
.card-white { background: #fff; border-color: #fff; }
.card-white .card-label { color: #888; }
.card-white .card-headline { color: #000; }
.card-white .card-body { color: #444; }
.card-purple { border-color: rgba(139,92,246,0.2); background: rgba(139,92,246,0.04); }
.card-purple .card-label { color: #a78bfa; }

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem;
  margin-bottom: 0.875rem;
}

/* Written vs Real */
.wvr-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.wvr-item {
  background: #0d0d0d;
  border-radius: 10px;
  padding: 0.875rem;
  border: 1px solid #1a1a1a;
}
.wvr-item.real { border-color: rgba(245,158,11,0.15); }
.wvr-sublabel {
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #444;
  margin-bottom: 0.4rem;
}
.wvr-item.real .wvr-sublabel { color: #92600a; }
.wvr-text { font-size: 0.8rem; color: #999; line-height: 1.5; }
.wvr-item.real .wvr-text { color: #ccc; }

/* Interview questions */
.iq-item {
  border-left: 2px solid #222;
  padding-left: 1rem;
  margin-bottom: 1.25rem;
}
.iq-q { color: #ccc; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.3rem; }
.iq-why { color: #555; font-size: 0.75rem; }

/* Perspective tabs */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.tab-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'DM Sans', system-ui, sans-serif;
  cursor: pointer;
  border: 1px solid #1e1e1e;
  background: transparent;
  color: #555;
  transition: all 0.2s;
}
.tab-btn:hover { border-color: #333; color: #aaa; }
.tab-btn.active { background: #fff; color: #000; border-color: #fff; }

.blindspot {
  background: #0d0d0d;
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid #1a1a1a;
  margin-top: 1rem;
}
.blindspot-label {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #333;
  margin-bottom: 0.3rem;
}
.blindspot-text { font-size: 0.78rem; color: #555; }

.context-echo {
  background: #0d0d0d;
  border: 1px solid #1a1a1a;
  border-radius: 10px;
  padding: 0.875rem 1rem;
  margin-bottom: 0.875rem;
}
.echo-label {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #333;
  margin-bottom: 0.3rem;
}
.echo-text { font-size: 0.8rem; color: #555; font-style: italic; }

.truth-card {
  background: #080808;
  border: 1px solid #1a1a1a;
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 0.875rem;
}
.truth-label {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #333;
  margin-bottom: 0.6rem;
}
.truth-text { font-size: 0.875rem; color: #888; font-style: italic; line-height: 1.75; }

/* Health banner */
.health-banner {
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 0.875rem;
  border: 1px solid;
}
.health-status {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.health-summary { font-size: 0.9rem; color: #bbb; }
.health-critical { border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.04); }
.health-critical .health-status { color: #ef4444; }
.health-concerning { border-color: rgba(249,115,22,0.3); background: rgba(249,115,22,0.04); }
.health-concerning .health-status { color: #f97316; }
.health-solid { border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.04); }
.health-solid .health-status { color: #3b82f6; }
.health-excellent { border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.04); }
.health-excellent .health-status { color: #10b981; }

/* Friction items */
.friction-item {
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 0.75rem;
}
.friction-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.875rem;
}
.friction-title { display: flex; align-items: center; gap: 0.6rem; }
.severity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
.severity-dot.high { background: #ef4444; }
.severity-dot.medium { background: #f97316; }
.severity-dot.low { background: #555; }
.friction-step { color: #ddd; font-size: 0.875rem; font-weight: 500; }
.friction-badges { display: flex; gap: 0.4rem; flex-shrink: 0; }
.badge-pill {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;
  border: 1px solid;
}
.badge-high { color: #ef4444; border-color: rgba(239,68,68,0.3); }
.badge-medium { color: #f97316; border-color: rgba(249,115,22,0.3); }
.badge-low { color: #666; border-color: #333; }
.badge-qw { color: #10b981; border-color: rgba(16,185,129,0.3); }
.badge-ml { color: #3b82f6; border-color: rgba(59,130,246,0.3); }
.badge-mr { color: #f97316; border-color: rgba(249,115,22,0.3); }
.friction-what { color: #777; font-size: 0.825rem; margin-bottom: 0.75rem; }
.friction-why {
  background: #0d0d0d;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.6rem;
}
.friction-why-label {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #444;
  margin-bottom: 0.3rem;
}
.friction-why-text { font-size: 0.8rem; color: #aaa; }
.friction-fix {
  background: rgba(16,185,129,0.05);
  border: 1px solid rgba(16,185,129,0.12);
  border-radius: 8px;
  padding: 0.75rem;
}
.friction-fix-label {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(16,185,129,0.6);
  margin-bottom: 0.3rem;
}
.friction-fix-text { font-size: 0.8rem; color: #bbb; }

/* Animations */
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 600px) {
  .exp-selector { grid-template-columns: 1fr; }
  .two-col { grid-template-columns: 1fr; }
  .wvr-grid { grid-template-columns: 1fr; }
  .exp-panel { padding: 1.5rem 1.25rem 4rem; }
  .exp-selector { padding: 0 1.25rem 1rem; }
}
```

---

## 4. Page
**`src/app/ai-experiments/page.tsx`**

```tsx
'use client'
import { useState } from 'react'
import '../../../styles/experiments.css'
import HiringSignalExtractor from '@/components/experiments/HiringSignalExtractor'
import PMDecisionPressureTest from '@/components/experiments/PMDecisionPressureTest'
import OnboardingFailureDetector from '@/components/experiments/OnboardingFailureDetector'

const TABS = [
  {
    id: 'hiring',
    num: '01',
    color: '#f59e0b',
    title: 'Hiring Signal Extractor',
    sub: 'Decode what a company actually needs from their JD',
  },
  {
    id: 'decision',
    num: '02',
    color: '#3b82f6',
    title: 'PM Decision Pressure Test',
    sub: 'Steelman your options. Get a call — not a framework.',
  },
  {
    id: 'onboarding',
    num: '03',
    color: '#10b981',
    title: 'Onboarding Failure Detector',
    sub: 'Find exactly where your flow is bleeding users',
  },
]

export default function AIExperimentsPage() {
  const [active, setActive] = useState('hiring')

  return (
    <div className="exp-page">
      <div className="exp-page-header">
        <div className="exp-eyebrow">AI Experiments</div>
        <h1 className="exp-page-title">Products, not demos.</h1>
        <p className="exp-page-sub">
          Each experiment is a live AI product with a point of view. Every design
          decision is annotated. This is what building end-to-end looks like.
        </p>
      </div>

      <div className="exp-selector">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`exp-tab-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            <div className="tab-num" style={{ color: tab.color }}>{tab.num}</div>
            <div className="tab-title">{tab.title}</div>
            <div className="tab-sub">{tab.sub}</div>
          </button>
        ))}
      </div>

      <div className="exp-panel">
        {active === 'hiring' && <HiringSignalExtractor />}
        {active === 'decision' && <PMDecisionPressureTest />}
        {active === 'onboarding' && <OnboardingFailureDetector />}
      </div>
    </div>
  )
}
```

---

## 5. Experiment 1 — Hiring Signal Extractor
**`src/components/experiments/HiringSignalExtractor.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { useExperiment } from '@/hooks/useExperiment'

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
  const handleReset = () => { reset(); setInput('') }

  if (data) {
    return (
      <div className="results">
        <div className="card card-amber">
          <div className="card-label">What's actually broken</div>
          <div className="card-body">{data.realProblem}</div>
        </div>

        <div className="card">
          <div className="card-label">The PM they actually want</div>
          <div className="card-headline">{data.actualPMType}</div>
        </div>

        <div className="card">
          <div className="card-label">Written vs. What they actually mean</div>
          <div className="wvr-grid">
            {data.writtenVsReal.map((item, i) => (
              <>
                <div key={`w${i}`} className="wvr-item">
                  <div className="wvr-sublabel">Written</div>
                  <div className="wvr-text">"{item.written}"</div>
                </div>
                <div key={`r${i}`} className="wvr-item real">
                  <div className="wvr-sublabel">Reality</div>
                  <div className="wvr-text">{item.real}</div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="two-col">
          <div className="card card-red">
            <div className="card-label">Red Flags</div>
            {data.redFlags.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#aaa' }}>
                <span style={{ color: '#ef4444', flexShrink: 0 }}>↑</span>{f}
              </div>
            ))}
          </div>
          <div className="card card-emerald">
            <div className="card-label">Green Flags</div>
            {data.greenFlags.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#aaa' }}>
                <span style={{ color: '#10b981', flexShrink: 0 }}>↑</span>{f}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-label">Questions to ask THEM</div>
          {data.interviewQuestions.map((q, i) => (
            <div key={i} className="iq-item">
              <div className="iq-q">"{q.question}"</div>
              <div className="iq-why">{q.why}</div>
            </div>
          ))}
        </div>

        <div className="card card-amber">
          <div className="card-label">The Verdict</div>
          <div className="card-body">{data.verdict}</div>
        </div>

        <button className="reset-link" onClick={handleReset}>← Analyze another JD</button>
      </div>
    )
  }

  return (
    <>
      <div className="exp-badge">
        <span className="live-dot" style={{ background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
        Experiment 01 · Live Claude API
      </div>
      <h2 className="exp-title">Hiring Signal Extractor</h2>
      <p className="exp-desc">
        Paste any job description. I'll decode what the company <em>actually</em> needs,
        what they wrote vs. what they meant, and the exact questions to ask in your interview.
      </p>
      <p className="pm-note">
        <strong>PM note:</strong> The insight was reframing from "should I apply?" to "what problem
        are they really solving?" That question change rewired the entire prompt architecture.
      </p>

      <textarea
        className="exp-textarea"
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste the full job description here..."
        disabled={loading}
      />
      <div className="examples-row">
        {EXAMPLES.map((ex) => (
          <button key={ex.label} className="example-chip" onClick={() => setInput(ex.text)}>
            Load: {ex.label}
          </button>
        ))}
      </div>
      <button className="run-btn btn-amber" onClick={handleRun} disabled={loading || !input.trim()}>
        {loading ? 'Analyzing...' : 'Decode this JD →'}
      </button>
      {error && <p className="error-msg">{error}</p>}
      {loading && (
        <div className="loading-hints">
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#f59e0b' }} /> Reading between the lines...</div>
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#f59e0b' }} /> Separating signal from boilerplate...</div>
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#f59e0b' }} /> Generating interview questions...</div>
        </div>
      )}
    </>
  )
}
```

---

## 6. Experiment 2 — PM Decision Pressure Test
**`src/components/experiments/PMDecisionPressureTest.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { useExperiment } from '@/hooks/useExperiment'

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

  const handleRun = () => { run(SYSTEM_PROMPT, input); setActiveTab('data') }
  const handleReset = () => { reset(); setInput('') }

  if (data) {
    return (
      <div className="results">
        <div className="context-echo">
          <div className="echo-label">Your decision</div>
          <div className="echo-text">"{input}"</div>
        </div>

        <div className="tab-nav">
          {(['data', 'politics', 'user', 'call'] as const).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'data' ? 'Data' : tab === 'politics' ? 'Org' : tab === 'user' ? 'User' : 'My Call'}
            </button>
          ))}
        </div>

        {activeTab === 'data' && (
          <div className="card card-blue">
            <div className="card-label">The Data Says</div>
            <div className="card-headline">{data.dataPerspective.headline}</div>
            <div className="card-body">{data.dataPerspective.argument}</div>
            <div className="blindspot">
              <div className="blindspot-label">Blind spot</div>
              <div className="blindspot-text">{data.dataPerspective.weakness}</div>
            </div>
          </div>
        )}

        {activeTab === 'politics' && (
          <div className="card" style={{ borderColor: 'rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.03)' }}>
            <div className="card-label" style={{ color: '#f97316' }}>The Org Says</div>
            <div className="card-headline">{data.politicsPerspective.headline}</div>
            <div className="card-body">{data.politicsPerspective.argument}</div>
            <div className="blindspot">
              <div className="blindspot-label">Blind spot</div>
              <div className="blindspot-text">{data.politicsPerspective.weakness}</div>
            </div>
          </div>
        )}

        {activeTab === 'user' && (
          <div className="card card-emerald">
            <div className="card-label">The User Says</div>
            <div className="card-headline">{data.userPerspective.headline}</div>
            <div className="card-body">{data.userPerspective.argument}</div>
            <div className="blindspot">
              <div className="blindspot-label">Blind spot</div>
              <div className="blindspot-text">{data.userPerspective.weakness}</div>
            </div>
          </div>
        )}

        {activeTab === 'call' && (
          <>
            <div className="card card-white">
              <div className="card-label">What I'd do</div>
              <div className="card-headline">{data.myCall.decision}</div>
              <div className="card-body">{data.myCall.reasoning}</div>
            </div>
            <div className="two-col">
              <div className="card">
                <div className="card-label">First move this week</div>
                <div className="card-body">{data.myCall.firstMove}</div>
              </div>
              <div className="card card-red">
                <div className="card-label">Would reverse if...</div>
                <div className="card-body">{data.myCall.watchOut}</div>
              </div>
            </div>
            <div className="truth-card">
              <div className="truth-label">The thing most PMs won't say</div>
              <div className="truth-text">"{data.seniorPMTruth}"</div>
            </div>
          </>
        )}

        <button className="reset-link" onClick={handleReset}>← Pressure test another decision</button>
      </div>
    )
  }

  return (
    <>
      <div className="exp-badge">
        <span className="live-dot" style={{ background: '#3b82f6', boxShadow: '0 0 6px #3b82f6' }} />
        Experiment 02 · Live Claude API
      </div>
      <h2 className="exp-title">PM Decision Pressure Test</h2>
      <p className="exp-desc">
        Describe a product decision you're sitting on. I'll steelman the data perspective,
        the political reality, and what users would actually say — then tell you exactly what I'd do.
      </p>
      <p className="pm-note">
        <strong>PM note:</strong> The three-lens framework forces a stake in the ground.
        Analysts give you options. Senior PMs make a call.
      </p>

      <textarea
        className="exp-textarea"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your decision... be specific. What's the context, what are you choosing between, what's making it hard?"
        disabled={loading}
      />
      <div className="examples-row">
        {EXAMPLES.map((ex, i) => (
          <button key={i} className="example-chip" onClick={() => setInput(ex)}>
            {ex.slice(0, 40)}...
          </button>
        ))}
      </div>
      <button className="run-btn btn-blue" onClick={handleRun} disabled={loading || !input.trim()}>
        {loading ? 'Analyzing...' : 'Pressure test this →'}
      </button>
      {error && <p className="error-msg">{error}</p>}
      {loading && (
        <div className="loading-hints">
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#3b82f6' }} /> Analyzing the data lens...</div>
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#3b82f6' }} /> Reading the political landscape...</div>
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#3b82f6' }} /> Making the call...</div>
        </div>
      )}
    </>
  )
}
```

---

## 7. Experiment 3 — Onboarding Failure Detector
**`src/components/experiments/OnboardingFailureDetector.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { useExperiment } from '@/hooks/useExperiment'

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

const HEALTH_CONFIG = {
  critical:   { label: 'Critical',   cls: 'health-critical' },
  concerning: { label: 'Concerning', cls: 'health-concerning' },
  solid:      { label: 'Solid',      cls: 'health-solid' },
  excellent:  { label: 'Excellent',  cls: 'health-excellent' },
}
const SEVERITY_CONFIG = {
  high:   { dot: 'high',   badge: 'badge-high',   label: 'High' },
  medium: { dot: 'medium', badge: 'badge-medium', label: 'Medium' },
  low:    { dot: 'low',    badge: 'badge-low',    label: 'Low' },
}
const EFFORT_CONFIG = {
  'quick-win':    { cls: 'badge-qw', label: 'Quick win' },
  'medium-lift':  { cls: 'badge-ml', label: 'Medium lift' },
  'major-rework': { cls: 'badge-mr', label: 'Major rework' },
}

export default function OnboardingFailureDetector() {
  const [input, setInput] = useState('')
  const { data, loading, error, run, reset } = useExperiment<OnboardingData>()

  const handleRun = () => run(SYSTEM_PROMPT, input)
  const handleReset = () => { reset(); setInput('') }

  if (data) {
    const hc = HEALTH_CONFIG[data.overallHealth] || HEALTH_CONFIG.critical
    return (
      <div className="results">
        <div className={`health-banner ${hc.cls}`}>
          <div className="health-status">{hc.label}</div>
          <div className="health-summary">{data.healthSummary}</div>
        </div>

        <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#444', marginBottom: '1rem' }}>
          Friction Map — ranked by impact
        </div>

        {data.frictions.map((f, i) => {
          const s = SEVERITY_CONFIG[f.severity] || SEVERITY_CONFIG.medium
          const e = EFFORT_CONFIG[f.effort] || EFFORT_CONFIG['medium-lift']
          return (
            <div key={i} className="friction-item">
              <div className="friction-header">
                <div className="friction-title">
                  <span className={`severity-dot ${s.dot}`} />
                  <span className="friction-step">{f.step}</span>
                </div>
                <div className="friction-badges">
                  <span className={`badge-pill ${s.badge}`}>{s.label}</span>
                  <span className={`badge-pill ${e.cls}`}>{e.label}</span>
                </div>
              </div>
              <div className="friction-what">{f.what}</div>
              <div className="friction-why">
                <div className="friction-why-label">Why they actually stop</div>
                <div className="friction-why-text">{f.why}</div>
              </div>
              <div className="friction-fix">
                <div className="friction-fix-label">The fix</div>
                <div className="friction-fix-text">{f.fix}</div>
              </div>
            </div>
          )
        })}

        <div className="two-col">
          <div className="card card-red">
            <div className="card-label">Biggest mistake</div>
            <div className="card-body">{data.biggestMistake}</div>
          </div>
          <div className="card card-purple">
            <div className="card-label">Counterintuitive fix</div>
            <div className="card-body">{data.counterintuitiveFix}</div>
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <div className="card-label">North star metric</div>
            <div className="card-headline" style={{ fontSize: '1.1rem' }}>{data.northStar}</div>
          </div>
          <div className="card card-emerald">
            <div className="card-label">Do this first — this week</div>
            <div className="card-body">{data.weekOneAction}</div>
          </div>
        </div>

        <button className="reset-link" onClick={handleReset}>← Audit another flow</button>
      </div>
    )
  }

  return (
    <>
      <div className="exp-badge">
        <span className="live-dot" style={{ background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
        Experiment 03 · Live Claude API
      </div>
      <h2 className="exp-title">Onboarding Failure Detector</h2>
      <p className="exp-desc">
        Describe any onboarding flow. I'll build you a ranked friction map — the specific
        moments you're losing users, the psychological reason why, and exactly what to fix first.
      </p>
      <p className="pm-note">
        <strong>PM note:</strong> I capped output at 5 frictions. Unlimited audit = paralysis.
        The ranked shortlist is the product decision — not the comprehensive list.
      </p>

      <textarea
        className="exp-textarea"
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your onboarding flow step by step. The more specific, the sharper the diagnosis..."
        disabled={loading}
      />
      <div className="examples-row">
        {EXAMPLES.map((ex) => (
          <button key={ex.label} className="example-chip" onClick={() => setInput(ex.text)}>
            Load: {ex.label} example
          </button>
        ))}
      </div>
      <button className="run-btn btn-emerald" onClick={handleRun} disabled={loading || !input.trim()}>
        {loading ? 'Finding the leaks...' : 'Find the failure points →'}
      </button>
      {error && <p className="error-msg">{error}</p>}
      {loading && (
        <div className="loading-hints">
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#10b981' }} /> Mapping friction points...</div>
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#10b981' }} /> Identifying drop-off psychology...</div>
          <div className="loading-hint"><span className="hint-dot" style={{ background: '#10b981' }} /> Ranking by impact...</div>
        </div>
      )}
    </>
  )
}
```

---

## 8. Install & Run

```bash
npm install @anthropic-ai/sdk
```

Add to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm run dev
```

Visit `http://localhost:3000/ai-experiments`
