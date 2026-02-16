export interface SimulatorOption {
  id: string
  label: string
  description: string
}

export interface SimulatorScenario {
  id: string
  title: string
  scenario: string
  options: SimulatorOption[]
  pmChoice: string
  why: string
  tradeoffs: string
}

export const simulatorScenarios: SimulatorScenario[] = [
  {
    id: "onboarding-drop",
    title: "Onboarding completion dropped 25%",
    scenario: "Your user onboarding completion rate has dropped 25% in the last quarter. Users are abandoning the flow somewhere between signup and first value. What do you do first?",
    options: [
      { id: "a", label: "A) Run user interviews immediately", description: "Talk to users who dropped off and those who completed" },
      { id: "b", label: "B) Check analytics for drop-off points", description: "Identify the exact step where users abandon" },
      { id: "c", label: "C) A/B test a new onboarding flow", description: "Ship an alternative flow and measure improvement" },
      { id: "d", label: "D) Add more features to onboarding", description: "Enrich the flow with guides and tooltips" },
    ],
    pmChoice: "B) Check analytics for drop-off points, then A) Run user interviews",
    why: "Analytics first gives you a hypothesis to validate. If 80% drop at step 3, interviews can focus there. Jumping to A/B tests without understanding why is gambling. Adding features often makes things worse—complexity kills completion.",
    tradeoffs: "Analytics alone can miss the 'why' (users might drop at step 3 for different reasons). Interviews take time. The right move: quick analytics sprint (2–3 days) to narrow the problem, then targeted interviews. Don't skip the data.",
  },
  {
    id: "activation-plateau",
    title: "Activation has plateaued at 40%",
    scenario: "Your product's activation rate has been stuck at 40% for 6 months. You've iterated on the onboarding flow multiple times. Leadership wants growth. What's your next move?",
    options: [
      { id: "a", label: "A) Redefine what 'activation' means", description: "Maybe the current milestone is wrong" },
      { id: "b", label: "B) Segment users and find who activates best", description: "Understand who your product works for" },
      { id: "c", label: "C) Build more onboarding content", description: "Tutorials, videos, guided tours" },
      { id: "d", label: "D) Reduce the activation milestone", description: "Lower the bar so more users 'activate'" },
    ],
    pmChoice: "B) Segment users and find who activates best",
    why: "If 40% activate, you have a segment that gets it. The question is: who are they and what's different? Reducing the milestone (D) is gaming the metric. Redefining (A) might help if the milestone is wrong, but often the real insight is that your product resonates with a subset—and that's OK. Double down on that segment before chasing everyone.",
    tradeoffs: "Segmentation can reveal your product isn't for everyone—politically hard. But building for 'everyone' often means building for no one. Content (C) helps those already motivated; it rarely fixes activation for the unengaged.",
  },
  {
    id: "competitor-feature",
    title: "A competitor launched a feature you don't have",
    scenario: "A key competitor just shipped a popular feature. Your users are asking for it. Your team is divided: some want to build it, others say it's a distraction. How do you decide?",
    options: [
      { id: "a", label: "A) Build it—users are asking for it", description: "Customer demand is the signal" },
      { id: "b", label: "B) Don't build it—differentiate elsewhere", description: "Avoid feature parity battles" },
      { id: "c", label: "C) Research why users want it", description: "Understand the underlying need first" },
      { id: "d", label: "D) Build a minimal version to test", description: "Quick experiment to validate demand" },
    ],
    pmChoice: "C) Research why users want it",
    why: "Users ask for solutions, not problems. 'We need feature X' might mean 'we need to accomplish outcome Y'—and you might have a better way. Building (A) without understanding leads to feature bloat. Ignoring (B) can work but you need conviction. Research first: what job are they trying to do? Then decide if your roadmap or a fast experiment (D) makes sense.",
    tradeoffs: "Research takes time; competitors move fast. But shipping the wrong thing is more expensive. A lightweight qual study (5–10 user calls) can often answer the question in a week.",
  },
]
