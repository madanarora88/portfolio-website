// Scenarios for "What would a PM do?" picker
export const pmScenarios = [
  {
    id: "broken-search",
    scenario: "Search on your product is used a lot but success rate is only 40%. Users often refine 3+ times.",
    pmMove: "Treat search as a conversation, not a one-shot box. Add suggested refinements, show 'People also searched,' and consider autocomplete that learns from successful queries. Measure success by 'found in one attempt' and time-to-result.",
  },
  {
    id: "viral-drop",
    scenario: "A key viral loop metric dropped 30% after a redesign. The new design tested better in usability studies.",
    pmMove: "Don't revert on metrics alone. Run 5–10 user interviews with people who stopped sharing. The redesign might have broken a specific trigger (e.g. 'Share' placement, friction). Fix the trigger, keep the better UX.",
  },
  {
    id: "enterprise-pilot",
    scenario: "Your enterprise pilot has 3 customers. One wants custom SSO, one wants a different data region, one is happy as-is.",
    pmMove: "Say no to custom SSO and custom regions for now—document as roadmap. Standardize on one identity and one region for the pilot. Use their feedback to prioritize what goes into v1 for the next 10 customers.",
  },
  {
    id: "ai-mistake",
    scenario: "Your AI feature sometimes gives wrong advice. Support tickets went up 20%.",
    pmMove: "Add guardrails: confidence thresholds, 'Verify with an expert' CTA, and human-in-the-loop for high-stakes flows. Communicate uncertainty in the UI. Measure 'user corrected the AI' as a signal. Don't hide the mistake—design for it.",
  },
]

// Seed ideas for product idea generator (used when no API)
export const productIdeaSeeds: Record<string, string[]> = {
  "employee onboarding": [
    "AI buddy that answers 'where do I find X?' in natural language and adapts to role and location.",
    "Micro-learning checkpoints that unlock based on progress, not calendar—reduces overload and increases completion.",
    "Manager nudges: 'Your report hasn’t completed safety training' with one-click escalation so nothing falls through.",
  ],
  "customer support": [
    "Deflection that feels like help: bot resolves 60% with a 'Talk to a human' path that carries full context.",
    "Agent assist that suggests next best action and past similar cases without replacing the human.",
    "Post-call summary and next steps auto-sent to the customer so they have a record without asking.",
  ],
  "internal tools": [
    "Search that understands your company's jargon and links to the right doc, ticket, or person.",
    "Approval workflows that learn who usually approves what and pre-route to reduce back-and-forth.",
    "Dashboards that answer 'Why did this number change?' with one click instead of ad-hoc analysis.",
  ],
  default: [
    "Start with the single moment of maximum frustration and fix that before expanding.",
    "Add a 'feedback at the point of pain' loop so you hear from users when they're stuck, not in a survey later.",
    "Ship a narrow slice to 10 power users, then widen based on what they do, not what they say.",
  ],
}
