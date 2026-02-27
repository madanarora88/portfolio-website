export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  role: string;
  timeline: string;
  summary: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  steps: {
    title: string;
    subtitle: string;
    content: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "walmart-supply-chain",
    title: "Building Me@Walmart Supply Chain App",
    company: "Walmart",
    role: "Principal Product Manager",
    timeline: "2022-2025",
    summary: "I led the product from day one. We built a mobile app that 2M+ people use every day—supply chain and store associates who needed one place for schedules, performance, and tasks. We hit 80%+ adoption because we made it useful, not because we made it mandatory.",
    tags: ["AI/ML", "Mobile", "Scale", "Employee Experience"],
    metrics: [
      { label: "Daily Active Users", value: "2M+" },
      { label: "Adoption Rate", value: "80%+" },
      { label: "Associates Impacted", value: "122K+ SC and 2M+ store associates" },
      { label: "Annual Savings", value: "$15-20M per store and $5-10M per DC" }
    ],
    steps: [
      {
        title: "Problem",
        subtitle: "Understanding the friction",
        content: "Associates were juggling multiple systems just to see their schedule, check performance, or get tasks. HR was drowning in manual work—we're talking 500K+ hours a year. The mobile experience was an afterthought, and engagement showed it."
      },
      {
        title: "Context",
        subtitle: "The constraints that shaped the solution",
        content: "122K+ associates across hundreds of distribution centers with varying tech literacy. Legacy systems integration required careful planning. Mobile-first workforce with limited desktop access. High security and compliance requirements. Need to maintain 99.9% uptime for critical operations."
      },
      {
        title: "My Thinking",
        subtitle: "How I approached the problem",
        content: "I spent weeks in distribution centers watching how people actually worked. Three things kept coming up: they wanted to see their performance without digging through spreadsheets, they wanted scheduling that didn't feel like a part-time job to understand, and they wanted incentives that calculated themselves. We went mobile-first and made sure it worked offline. For the intelligence layer, we focused on helping people see what was coming, not just what already happened."
      },
      {
        title: "Tradeoffs",
        subtitle: "The tough decisions",
        content: "Build vs Buy for analytics engine → Built custom (3-month delay but 10x better UX). Native vs Hybrid mobile → Native (higher cost but superior performance). Gradual rollout vs big bang → Gradual (slower but reduced risk). Feature completeness vs speed → Speed with core features (faster value delivery)."
      },
      {
        title: "Decision",
        subtitle: "What we built and why",
        content: "Native mobile app with React Native for core experience. Integrated GenAI for performance insights and productivity recommendations. Built custom labor management engine for real-time incentive calculations. Phased rollout starting with pilot DCs. Offline-first architecture for reliability."
      },
      {
        title: "Outcome",
        subtitle: "The measurable impact",
        content: "We hit 2M+ daily active users and 80%+ adoption in the first year. Incentive payouts that used to eat HR time are now automated—$15–20M saved per DC. We took 500K+ manual hours off the table. Associate satisfaction went up 35%. The app became the template for other internal products at Walmart."
      },
      {
        title: "Lessons",
        subtitle: "What I'd do differently",
        content: "Start with even more user research—we discovered key pain points 2 months in. Invest in better analytics infrastructure earlier. Build more robust A/B testing framework from day 1. Create stronger feedback loops with frontline associates. Document decision rationale better for future teams."
      }
    ]
  },
  {
    id: "jpmorgan-ai-onboarding",
    title: "AI-Driven Onboarding at Scale",
    company: "JPMorgan Chase",
    role: "VP Product",
    timeline: "2025-Present",
    summary: "We're rethinking onboarding for 50K+ hires a year. Instead of one-size-fits-all, we're using AI to personalize the path—so people get to productivity faster and HR spends less time on the same questions.",
    tags: ["AI", "Onboarding", "Enterprise", "Automation"],
    metrics: [
      { label: "Annual Hires Supported", value: "50K+" },
      { label: "Time-to-Productivity", value: "Improved 40%" },
      { label: "Early-Tenure Retention", value: "+15%" },
      { label: "Manual Hours Saved", value: "100K+" }
    ],
    steps: [
      {
        title: "Problem",
        subtitle: "The onboarding challenge at scale",
        content: "JPMorgan hires 50,000+ people a year across a ton of roles and locations. The old onboarding was the same for everyone—long time-to-productivity, lots of repetitive questions for HR, and new hires lost in a maze of systems. We needed to make it personal without losing scale or compliance."
      },
      {
        title: "Context",
        subtitle: "Enterprise complexity",
        content: "Global workforce across 60+ countries. 200+ distinct job roles with unique onboarding needs. Strict compliance and regulatory requirements. Integration with 50+ legacy HR systems. Multiple stakeholders (HR, IT, Legal, Compliance, Business Units). Need to maintain security while providing personalized experience."
      },
      {
        title: "My Thinking",
        subtitle: "AI as the personalization engine",
        content: "The insight was simple: AI could give people something closer to a 1-on-1 experience at scale. Rather than piling on more generic content, we focused on adapting what each person sees to their role and behavior. We started with role-based personalization, then let the system learn. Q&A and knowledge retrieval are powered by LLMs and RAG, but the north star was time-to-first-value—not just ticking boxes."
      },
      {
        title: "Tradeoffs",
        subtitle: "Navigating constraints",
        content: "Custom AI vs vendor solution → Custom (longer build but perfect fit). Privacy vs personalization → Privacy-first with opt-in features. Automation vs human touch → Hybrid approach. Speed to market vs security review → Security first (4-month delay but compliant). Feature richness vs simplicity → Simplicity wins."
      },
      {
        title: "Decision",
        subtitle: "The product strategy",
        content: "Built AI-powered onboarding assistant with natural language interface. Implemented adaptive learning paths based on role, location, and manager feedback. Created intelligent content delivery system that surfaces right information at right time. Integrated with existing HRIS for seamless data flow. Launched with pilot program in 3 business units before global rollout."
      },
      {
        title: "Outcome",
        subtitle: "Transformation at scale",
        content: "Time-to-productivity dropped by 40%. Early retention improved 15%. We've saved 100K+ manual hours by letting the AI handle routine questions—and new hire satisfaction went from 67% to 92%. The assistant handles about 80% of those questions without a human. We've rolled out to 30+ business units and are still expanding."
      },
      {
        title: "Lessons",
        subtitle: "Insights for AI product leaders",
        content: "AI excels at personalization, but needs strong data foundation. Change management is harder than technical implementation. Start with narrow use case, expand based on success. Human-in-the-loop is critical for trust in enterprise. Measure business impact, not just AI accuracy metrics. Security and compliance stakeholders should be involved from day 1."
      }
    ]
  },
  {
    id: "0-to-1-product-launch",
    title: "0→1 Employee Feedback Platform",
    company: "Walmart",
    role: "Principal Product Manager",
    timeline: "2023-2024",
    summary: "There was no real-time feedback for supply chain associates—just annual reviews and paperwork. We built something from scratch. In six months we improved activation by 32% and cut drop-off by 25%. About 45K associates were using it.",
    tags: ["0→1", "Employee Experience", "Mobile", "AI"],
    metrics: [
      { label: "Activation Improvement", value: "+32%" },
      { label: "Drop-off Reduction", value: "-25%" },
      { label: "Adoption in 6 Months", value: "45K+" },
      { label: "NPS Score", value: "+28" }
    ],
    steps: [
      {
        title: "Problem",
        subtitle: "The feedback gap",
        content: "Supply chain associates had no way to give or receive real-time performance feedback. Managers relied on annual reviews and paper forms. Associates felt disconnected from their progress. Engagement with performance tools was below 20%."
      },
      {
        title: "Context",
        subtitle: "Starting from zero",
        content: "No existing product in this space. Mobile-first workforce with varying tech literacy. Had to integrate with legacy HR systems. Competing priorities with other product teams. Needed to prove value within 6 months to secure continued investment."
      },
      {
        title: "My Thinking",
        subtitle: "What defines 0→1",
        content: "For me 0→1 means finding fit in a space nobody's really serving. I had a hunch: people want quick, lightweight feedback, not a once-a-year form. We did 40+ interviews before writing code and changed scope three times based on what we heard. The smallest win we aimed for: let someone give one piece of feedback today."
      },
      {
        title: "Tradeoffs",
        subtitle: "Decisions that shaped the product",
        content: "Scope: Launch narrow (feedback only) vs broad (full performance suite) → Narrow. Speed: 6-month MVP vs 12-month full product → 6 months. Distribution: Opt-in vs mandated rollout → Opt-in with manager advocacy. Tech: Build vs integrate existing tools → Build (no good existing solution)."
      },
      {
        title: "Decision",
        subtitle: "What we shipped",
        content: "Mobile-first feedback app with three actions: Give feedback, Receive feedback, View trends. AI-suggested feedback prompts to reduce friction. Integrations with existing HRIS for context. Gamification: streaks and recognition badges. Launched in 3 pilot DCs, measured activation and retention weekly."
      },
      {
        title: "Outcome",
        subtitle: "Results in 6 months",
        content: "32% improvement in activation (completed first feedback) vs baseline projections. 25% reduction in drop-off after first use. 45K+ associates adopted in 6 months across pilot DCs. NPS +28. Became foundation for broader performance product strategy. Secured funding for Phase 2 expansion."
      },
      {
        title: "Lessons",
        subtitle: "0→1 playbook",
        content: "Interview before you build—we changed our initial scope 3 times based on feedback. Define activation narrowly and obsess over it. Ship fast, measure ruthlessly. 0→1 products need a champion; find your internal advocates early. Don't over-build; the best 0→1 products do one thing exceptionally well."
      }
    ]
  }
]
