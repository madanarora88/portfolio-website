# Portfolio Sections — Cursor Implementation Guide

> Drop each section into its own component file. Uses React + TypeScript + TailwindCSS + Framer Motion.
> Color tokens assume CSS vars: `--paper: #faf9f6`, `--ink: #0f0e0c`, `--accent: #c84b2f`

---

## 1. How I Think at an Executive Level
**File:** `src/components/sections/StrategicTensions.tsx`

This section replaces "Think Like a PM" with VP-level dilemmas — ambiguous, political, no obvious answer.

```tsx
// src/components/sections/StrategicTensions.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Scenario = {
  id: string;
  tag: string;
  title: string;
  context: string;
  options: { label: string; text: string }[];
  chosen: string; // label of chosen option
  reasoning: string;
  tradeoff: string;
  lesson: string;
};

const scenarios: Scenario[] = [
  {
    id: "build-buy",
    tag: "Build vs. Buy · Stakeholder Politics",
    title: "The $40M Decision Your CTO Has Already Made",
    context:
      "It's Q3 planning. Your CTO has informally committed to a major vendor for an AI platform — $40M over 3 years. Your user research shows the vendor's product doesn't map to how your 50K employees actually work. Engineering says they could build 80% of the functionality in 9 months. The CTO has a personal relationship with the vendor's CEO. You have two weeks to present your recommendation.",
    options: [
      {
        label: "A",
        text: "Endorse the vendor — protect the relationship, find workarounds for the gaps.",
      },
      {
        label: "B",
        text: "Present a hybrid: buy the core, build the last mile — reframe it as 'maximizing the investment.'",
      },
      {
        label: "C",
        text: "Make the full case for build internally, with data, and accept the political risk.",
      },
    ],
    chosen: "B",
    reasoning:
      "Option C is the principled move but burns political capital I'd need for the next 10 decisions. Option A is abdication. The hybrid reframe lets the CTO save face, gets us better user outcomes, and creates a forcing function: if the vendor can't meet the integration spec in 6 months, the data justifies pivoting. I'm playing the long game.",
    tradeoff:
      "I traded short-term completeness for organizational trust. The hybrid isn't the ideal product architecture — it's the best product outcome achievable inside a real organization.",
    lesson:
      "At VP level, the best technical decision and the best organizational decision are rarely the same. Your job is to find the path that produces the best outcome, not the cleanest recommendation.",
  },
  {
    id: "new-exec",
    tag: "Executive Alignment · Roadmap Defense",
    title: "New Leader Wants 90-Day Wins. You Have an 18-Month Roadmap.",
    context:
      "A new CHRO joins with a mandate to 'show AI impact fast.' She asks your team to pause the employee onboarding platform — which 50K hires depend on — and ship an AI chatbot by end of quarter. Your roadmap is already locked with engineering. The chatbot would be superficial, not integrated with any real data, and would embarrass the org if scrutinized. But she controls your budget review.",
    options: [
      {
        label: "A",
        text: "Build the chatbot. Ship fast. Let the results speak for themselves.",
      },
      {
        label: "B",
        text: "Push back directly: explain the chatbot won't work and hold the roadmap.",
      },
      {
        label: "C",
        text: "Negotiate: offer a scoped AI feature within the existing roadmap that's real, measurable, and ships in 60 days.",
      },
    ],
    chosen: "C",
    reasoning:
      "A risks shipping something that damages trust in AI across the org — one bad chatbot poisons the well for 2 years. B signals I'm not a business partner. C requires me to go into the roadmap and find the highest-visibility, lowest-lift AI touchpoint we can genuinely deliver. I scoped an AI-generated onboarding summary email — personalized, integrated with HRIS, measurable open rates. It shipped in 8 weeks. The CHRO used it in her board presentation.",
    tradeoff:
      "I gave up some roadmap integrity to earn executive trust. The feature we shipped wasn't my top priority — but it created the political air cover to protect the work that was.",
    lesson:
      "New executives need proof of partnership, not proof of correctness. Give them a win that's real, then earn the right to own the strategy.",
  },
  {
    id: "compliance",
    tag: "Risk · Regulated Environment · Timeline Pressure",
    title: "Legal Says Stop. The Business Says Ship.",
    context:
      "Two weeks from launch of a new AI-assisted performance feedback tool, Legal flags that the model's outputs could constitute employment decisions under pending EU AI Act guidance — triggering mandatory audit requirements you haven't built for. Engineering says retrofitting the audit layer is 6 weeks minimum. Business stakeholders say a delay will kill adoption momentum and they've already announced the launch to 15,000 managers.",
    options: [
      {
        label: "A",
        text: "Ship as planned. The EU guidance isn't finalized. Legal is being overcautious.",
      },
      {
        label: "B",
        text: "Delay 6 weeks. Build the audit layer properly. Eat the reputational cost.",
      },
      {
        label: "C",
        text: "Ship a reduced version — remove the AI-generated language from official records, keep it as 'suggested prompts only' — while building compliance in parallel.",
      },
    ],
    chosen: "C",
    reasoning:
      "Option A exposes the company to regulatory risk I can't quantify — in financial services, that's a career-ending call. Option B is the safest move but ignores the real cost of lost momentum: we'd lose the manager cohort we'd spent 3 months training. The reduced version isn't a hack — it's a legitimate product decision. 'AI-assisted prompts' vs 'AI-generated evaluations' is a meaningful distinction, and it lets us ship, learn, and retrofit compliance without fraudulently misrepresenting the product.",
    tradeoff:
      "I shipped less product than promised. But I preserved the launch window, protected the company from regulatory exposure, and maintained honest communication with all stakeholders about what the AI was and wasn't doing.",
    lesson:
      "In regulated industries, the best PMs don't choose between speed and compliance — they find the product definition that makes the tradeoff disappear.",
  },
];

export default function StrategicTensions() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [revealedId, setRevealedId] = useState<string | null>(null);

  const active = scenarios.find((s) => s.id === activeId);

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
          Executive Judgment
        </p>
        <h2
          className="text-4xl md:text-5xl font-serif text-stone-900 mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          How I Think at an Executive Level
        </h2>
        <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
          These aren't textbook PM scenarios. They're the kind of decisions
          senior product leaders navigate every week — ambiguous, political,
          and with no clean answer. Here's how I reason through them.
        </p>
      </div>

      {/* Scenario List */}
      <div className="space-y-4">
        {scenarios.map((scenario, i) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border border-stone-200 rounded-2xl overflow-hidden bg-white"
          >
            {/* Collapsed Header */}
            <button
              className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 group"
              onClick={() => {
                setActiveId(activeId === scenario.id ? null : scenario.id);
                setRevealedId(null);
              }}
            >
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-red-700 mb-2 font-medium">
                  {scenario.tag}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-stone-900 group-hover:text-red-800 transition-colors">
                  {scenario.title}
                </h3>
              </div>
              <motion.span
                animate={{ rotate: activeId === scenario.id ? 45 : 0 }}
                className="text-stone-300 text-3xl flex-shrink-0 mt-1"
              >
                +
              </motion.span>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {activeId === scenario.id && active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 border-t border-stone-100 pt-6">
                    {/* Context */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                        The Situation
                      </p>
                      <p className="text-stone-600 leading-relaxed text-base md:text-lg">
                        {active.context}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                        The Options
                      </p>
                      <div className="space-y-3">
                        {active.options.map((opt) => (
                          <div
                            key={opt.label}
                            className={`flex gap-4 p-4 rounded-xl border transition-all ${
                              revealedId === active.id &&
                              opt.label === active.chosen
                                ? "border-red-800 bg-red-50"
                                : "border-stone-200 bg-stone-50"
                            }`}
                          >
                            <span className="text-sm font-bold text-stone-400 w-5 flex-shrink-0 mt-0.5">
                              {opt.label}
                            </span>
                            <p className="text-stone-700 text-sm leading-relaxed">
                              {opt.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reveal Button */}
                    {revealedId !== active.id ? (
                      <button
                        onClick={() => setRevealedId(active.id)}
                        className="px-6 py-3 bg-stone-900 text-white text-sm rounded-full hover:bg-red-800 transition-colors"
                      >
                        What I chose — and why →
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 border-t border-stone-100 pt-6"
                      >
                        {/* Chosen + Reasoning */}
                        <div className="bg-stone-900 text-white rounded-2xl p-6">
                          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                            I chose Option {active.chosen}
                          </p>
                          <p className="text-stone-200 leading-relaxed">
                            {active.reasoning}
                          </p>
                        </div>

                        {/* Tradeoff */}
                        <div className="p-5 border border-amber-200 bg-amber-50 rounded-xl">
                          <p className="text-xs uppercase tracking-widest text-amber-700 mb-2">
                            The Tradeoff I Made
                          </p>
                          <p className="text-stone-700 text-sm leading-relaxed">
                            {active.tradeoff}
                          </p>
                        </div>

                        {/* Lesson */}
                        <div className="p-5 border border-stone-200 rounded-xl">
                          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                            The Principle Behind It
                          </p>
                          <p className="text-stone-600 text-sm leading-relaxed italic">
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
    </section>
  );
}
```

---

## 2. Weekend Projects & Early Work
**File:** `src/components/sections/WeekendProjects.tsx`

Frames PlateRater as a 2013 origin story, shows portfolio site as the current AI demo, adds a third project slot.

```tsx
// src/components/sections/WeekendProjects.tsx
import { useState } from "react";
import { motion } from "framer-motion";

type Project = {
  id: string;
  era: string;
  name: string;
  tagline: string;
  story: string;
  what: string[];
  learned: string;
  outcome?: string;
  link?: string;
  linkLabel?: string;
  images?: string[]; // optional screenshot paths
};

const projects: Project[] = [
  {
    id: "platerater",
    era: "2013 · Side Project",
    name: "PlateRater",
    tagline: "Yelp for individual dishes, not restaurants.",
    story:
      "I built this in 2013 — before 'vibe coding' was a phrase, before LLMs could write a line of JSX. I was frustrated that Yelp rated restaurants but not the specific dish that made a place worth visiting. A restaurant could be 4 stars overall but their Pho was a 2. I wanted to fix that.",
    what: [
      "Designed end-to-end UX: onboarding flow, diet preference personalization, dish-level rating system",
      "Built mobile-first with a 3-step preference wizard to reduce drop-off at first use",
      "Implemented location-aware 'trending plates near you' feed to drive discovery",
      "Shipped Facebook OAuth to reduce sign-up friction (before this was table stakes)",
    ],
    learned:
      "This was my first real lesson in retention vs. acquisition. The app was easy to sign up for but hard to keep using — we needed content density before social could kick in. Classic cold-start problem. I'd solve it differently today: seed content before launch, not after.",
    outcome: "Shipped to TestFlight. ~200 beta users across Chicago.",
  },
  {
    id: "portfolio",
    era: "2025 · AI-Assisted Build",
    name: "This Portfolio",
    tagline: "Built in a weekend. The AI was my co-pilot, not the author.",
    story:
      "Most PM portfolios are PDFs. I wanted mine to be a product — something that demonstrates product thinking, not just describes it. I built this using Claude as a coding collaborator, treating it the way I'd treat a junior engineer: with clear specs, iterative feedback, and taste applied at every PR.",
    what: [
      "Designed the information architecture before writing a line of code — mapped user flows for recruiters vs. hiring managers vs. PMs",
      "Used AI to generate component scaffolding, then edited everything by hand to match the design vision",
      "Built a Case Study engine with step-by-step navigation to simulate how a PM thinks through a problem",
      "Added Command Palette (⌘K), offline support, and scroll-triggered animations — treating 'portfolio' as a real product spec",
    ],
    learned:
      "Working with AI on a real product taught me something important about AI product management: the model is never the moat. The taste, the judgment, the product instinct — those are the moat. The AI made me faster. It didn't make the decisions.",
    outcome: "You're looking at it.",
    link: "#",
    linkLabel: "You're already here ↗",
  },
  {
    id: "ai-onboarding",
    era: "2024 · Prototype",
    name: "AI Onboarding Copilot",
    tagline: "What if new hires had a personal guide on Day 1?",
    story:
      "After shipping the JPMC onboarding platform at scale, I wanted to prototype what the next generation could look like — an AI copilot that meets new hires where they are, not where HR designed the process to go. Built as a proof of concept to pressure-test the product thinking.",
    what: [
      "Designed conversational onboarding flow — AI asks, not informs",
      "Prototyped role-aware task prioritization: Day 1 for an analyst vs. a VP looks completely different",
      "Mapped integration points with HRIS, Slack, and internal knowledge bases",
      "Built lightweight RAG prototype using internal FAQ content to power contextual Q&A",
    ],
    learned:
      "The hardest part wasn't the AI — it was the content strategy. The model is only as good as what you feed it. Most enterprises have 10 years of onboarding content that is contradictory, outdated, and written for HR, not humans. The real product problem is content governance.",
    outcome: "Internal prototype. Used to inform JPMC roadmap planning.",
  },
];

export default function WeekendProjects() {
  const [expandedId, setExpandedId] = useState<string | null>("platerater");

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
          Building before building was easy
        </p>
        <h2
          className="text-4xl md:text-5xl font-serif text-stone-900 mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Weekend Projects & Early Work
        </h2>
        <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
          The best PMs build things. Not because they need to — because they
          can't stop thinking about problems worth solving. Here's what I've
          built outside the day job.
        </p>
      </div>

      {/* Projects */}
      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-stone-200 bg-white overflow-hidden"
          >
            {/* Header Row */}
            <button
              className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6 group"
              onClick={() =>
                setExpandedId(
                  expandedId === project.id ? null : project.id
                )
              }
            >
              <div className="flex items-start gap-5">
                {/* Number */}
                <span className="text-4xl font-serif text-stone-200 flex-shrink-0 mt-1">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-stone-400 mb-1">
                    {project.era}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif text-stone-900 group-hover:text-red-800 transition-colors mb-1">
                    {project.name}
                  </h3>
                  <p className="text-stone-500 text-sm">{project.tagline}</p>
                </div>
              </div>
              <motion.span
                animate={{ rotate: expandedId === project.id ? 45 : 0 }}
                className="text-stone-300 text-3xl flex-shrink-0"
              >
                +
              </motion.span>
            </button>

            {/* Expanded */}
            {expandedId === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-stone-100"
              >
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-10">
                  {/* Left: Story + What */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                        Origin
                      </p>
                      <p className="text-stone-600 leading-relaxed">
                        {project.story}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                        What I Built
                      </p>
                      <ul className="space-y-2">
                        {project.what.map((item, j) => (
                          <li key={j} className="flex gap-3 text-sm text-stone-600">
                            <span className="text-red-700 mt-1 flex-shrink-0">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Learned + Outcome */}
                  <div className="space-y-6">
                    <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
                      <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                        What I Learned
                      </p>
                      <p className="text-stone-700 text-sm leading-relaxed italic">
                        "{project.learned}"
                      </p>
                    </div>

                    {project.outcome && (
                      <div className="p-5 border border-stone-200 rounded-xl">
                        <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                          Outcome
                        </p>
                        <p className="text-stone-600 text-sm">{project.outcome}</p>
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-sm text-red-800 border border-red-800 rounded-full px-5 py-2 hover:bg-red-800 hover:text-white transition-colors"
                      >
                        {project.linkLabel || "View Project"}
                      </a>
                    )}

                    {/* PlateRater Screenshots */}
                    {project.id === "platerater" && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                          Screens (2013)
                        </p>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {/* Replace src values with actual imported image paths */}
                          {["/screens/platerater-1.jpg", "/screens/platerater-2.jpg", "/screens/platerater-3.jpg"].map(
                            (src, j) => (
                              <img
                                key={j}
                                src={src}
                                alt={`PlateRater screen ${j + 1}`}
                                className="h-48 w-auto rounded-lg border border-stone-200 flex-shrink-0"
                              />
                            )
                          )}
                        </div>
                        <p className="text-xs text-stone-400 mt-2">
                          Early 2013 build — rough edges intentional. Product thinking was the point.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

---

## 3. Product Principles — How I Operate
**File:** `src/components/sections/ProductPrinciples.tsx`

Six clickable principles. Each card expands with a real example from Madan's career.

```tsx
// src/components/sections/ProductPrinciples.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Principle = {
  number: string;
  title: string;
  short: string; // 1-sentence hook shown on card
  explanation: string;
  example: string; // real story from career
  quote?: string; // optional pithy version
};

const principles: Principle[] = [
  {
    number: "01",
    title: "Start with friction, not features.",
    short: "Users don't want features. They want to stop feeling stuck.",
    explanation:
      "Every product decision I make starts with a friction audit, not a feature request. I spend disproportionate time at the front of the process — shadowing users, reading support tickets, sitting in onboarding sessions — because the problem definition is where most teams go wrong. A perfectly built feature that solves the wrong problem is still a failure.",
    example:
      "At Walmart, the instinct was to add more features to the Me@ app. Instead, I spent 2 weeks in distribution centers watching associates use the app in real conditions — bad lighting, gloves on, 90-second windows between tasks. The problem wasn't features. It was that core workflows required 7 taps. We cut it to 2. Adoption jumped 40%.",
    quote: "The best product decisions look obvious in retrospect. That's how you know you solved the right problem.",
  },
  {
    number: "02",
    title: "Constraint is the engine of creativity.",
    short: "The tightest scope I've ever worked in produced the best outcomes.",
    explanation:
      "I've shipped products with unlimited budgets and 3-person teams. The 3-person teams win almost every time — not because they're scrappier, but because constraints force ruthless prioritization. When you can't build everything, you discover what actually matters. When you have to ship in 6 weeks, you lose the features that were really just comfort.",
    example:
      "At IBM, I inherited a product modernization project with a 30-day deadline and a scope that would've taken 6 months. Instead of negotiating scope down, I reframed the goal: what's the single outcome that would make this feel successful to the client? One workflow. Automated. Measurable. We shipped it. The other 80% became Phase 2 — which had a much better business case because Phase 1 proved the value.",
    quote: "Constraints aren't the enemy of good product work. Vague mandates are.",
  },
  {
    number: "03",
    title: "The best AI product is the one users forget is AI.",
    short: "When AI is done right, it disappears into the experience.",
    explanation:
      "Too many AI products lead with the technology. They make users aware of the AI at every step — the loading spinner, the 'AI is thinking' message, the disclaimer. This is a product failure. The measure of a great AI product is how invisible it is. The user gets what they needed. They didn't have to think about how.",
    example:
      "The AI-driven hiring tool I built at Walmart didn't announce itself as AI. It just made the process faster. Candidates got offers faster. Recruiters got better-matched applications. No one cared about the model — they cared that time-to-offer went from 2 weeks to 24 hours. That's the right outcome. The AI was the implementation, not the product.",
    quote: "If users are talking about your AI, you're doing it wrong.",
  },
  {
    number: "04",
    title: "Metrics are hypotheses, not scorecards.",
    short: "A metric tells you what happened. It doesn't tell you why, or what to do.",
    explanation:
      "I treat metrics as the beginning of a conversation, not the end of one. When a number moves — up or down — my first question is always 'what would have to be true for this to be real?' Most teams celebrate green metrics without interrogating whether they're measuring the right thing. I've seen products with excellent engagement numbers and terrible retention. The metric was right. The product was wrong.",
    example:
      "At American Airlines, our email open rate was 45% — exceptional by industry standards. Leadership considered it a success. I dug deeper and found that most opens were from the same users, opening the same email types, and the behavior wasn't translating to bookings. We were optimizing for a vanity metric. Shifting focus to downstream conversion changed the product strategy completely.",
    quote: "Never fall in love with a metric. Fall in love with the behavior it's supposed to represent.",
  },
  {
    number: "05",
    title: "Alignment is a product, not a meeting.",
    short: "The best cross-functional work happens before the room fills up.",
    explanation:
      "I've seen brilliant roadmaps die in steering committees because PMs treated alignment as something you do after you have a plan. Alignment is part of building the plan. The best cross-functional leaders I've worked with operate like diplomats — they understand every stakeholder's real constraint before the official process starts, and they build the proposal that makes it easy for everyone to say yes.",
    example:
      "At JPMC, launching a new onboarding platform required sign-off from Legal, HRIS, IT Security, and three business lines — all with competing priorities. Instead of scheduling a big launch review, I spent 3 weeks in 1:1s with each group, mapping their concerns, and adjusting the rollout plan in real time. By the time we had the official review, every objection had already been addressed. The meeting took 20 minutes.",
    quote: "If you're surprised by what people say in a big meeting, you didn't do the work before it.",
  },
  {
    number: "06",
    title: "Ship to learn, not to launch.",
    short: "A launch is an experiment. Treat it that way.",
    explanation:
      "Every product I ship is a hypothesis. The launch isn't the destination — it's when I finally get real data. I design rollouts with learning in mind: small cohorts first, clear success metrics established before launch, feedback loops built into the product itself. The teams that treat every launch as a finish line learn the least. The teams that treat every launch as a starting line ship the best products.",
    example:
      "The Me@Walmart Supply Chain app launched to 5,000 associates before it went to 122,000. We instrumented everything — not just usage metrics, but qualitative signals. Where did people stop? What did they search for that we hadn't anticipated? That 5,000-user cohort gave us 3 major product pivots before full rollout. By the time we went broad, we had an 80%+ adoption rate because we'd already solved the problems that would have caused churn.",
    quote: "The most dangerous phrase in product: 'We'll fix it after launch.'",
  },
];

export default function ProductPrinciples() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
          How I Operate
        </p>
        <h2
          className="text-4xl md:text-5xl font-serif text-stone-900 mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Product Principles
        </h2>
        <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
          These aren't slogans. Each one is a belief I've formed by being wrong
          first. Click any principle to see where it came from.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-2xl border cursor-pointer transition-all overflow-hidden ${
              expandedId === p.number
                ? "border-stone-900 bg-stone-900 md:col-span-2"
                : "border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm"
            }`}
            onClick={() =>
              setExpandedId(expandedId === p.number ? null : p.number)
            }
          >
            {/* Always Visible */}
            <div className="p-6 flex items-start gap-5">
              <span
                className={`text-3xl font-serif flex-shrink-0 ${
                  expandedId === p.number ? "text-stone-600" : "text-stone-300"
                }`}
              >
                {p.number}
              </span>
              <div className="flex-1">
                <h3
                  className={`text-lg font-serif mb-1 transition-colors ${
                    expandedId === p.number ? "text-white" : "text-stone-900"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`text-sm ${
                    expandedId === p.number ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  {p.short}
                </p>
              </div>
              <motion.span
                animate={{ rotate: expandedId === p.number ? 45 : 0 }}
                className={`text-2xl flex-shrink-0 ${
                  expandedId === p.number ? "text-stone-500" : "text-stone-300"
                }`}
              >
                +
              </motion.span>
            </div>

            {/* Expanded */}
            <AnimatePresence>
              {expandedId === p.number && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 grid md:grid-cols-2 gap-8 border-t border-stone-700 pt-6">
                    {/* Explanation */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                        The Belief
                      </p>
                      <p className="text-stone-300 leading-relaxed text-sm">
                        {p.explanation}
                      </p>
                      {p.quote && (
                        <p className="mt-5 text-stone-400 text-sm italic border-l-2 border-red-800 pl-4">
                          {p.quote}
                        </p>
                      )}
                    </div>

                    {/* Example */}
                    <div className="bg-stone-800 rounded-xl p-5">
                      <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                        Where This Came From
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {p.example}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

---

## Integration Notes for Cursor

**Install dependencies if not already present:**
```bash
npm install framer-motion
```

**Import in your main page/router:**
```tsx
import StrategicTensions from "@/components/sections/StrategicTensions";
import WeekendProjects from "@/components/sections/WeekendProjects";
import ProductPrinciples from "@/components/sections/ProductPrinciples";
```

**PlateRater screenshots:** Copy the project images from your upload folder into `public/screens/` and rename:
- `1.jpg` → `platerater-1.jpg`
- `2.jpg` → `platerater-2.jpg`  
- `3.jpg` → `platerater-3.jpg`

**Font setup (in index.css or global CSS):**
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
```

**CSS variables (in index.css):**
```css
:root {
  --paper: #faf9f6;
  --ink: #0f0e0c;
  --accent: #c84b2f;
}
```
