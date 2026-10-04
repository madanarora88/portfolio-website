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
    id: "jpmorgan-personalized-benefits",
    title: "AI-Powered Personalized Benefits",
    company: "JPMorgan Chase",
    role: "VP Product",
    timeline: "2025-Present",
    summary: "I'm leading the channel strategy for total rewards at JPMorgan: health, enrollment, wellness, and comp across web, mobile, and conversational AI for 350K employees. The chatbot is the newest of the three, powered by NLP and LLMs, and the bar for it is 100% call center deflection and 99% model accuracy, but the real measure is whether people trust it enough to actually use it.",
    tags: ["AI", "Benefits", "Privacy", "Enterprise", "Conversational AI"],
    metrics: [
      { label: "Call center deflection", value: "100%" },
      { label: "Benefits experience", value: "Multiple portals → one place" },
      { label: "Model accuracy", value: "99%" },
      { label: "Employees in scope", value: "350K" }
    ],
    steps: [
      {
        title: "Problem",
        subtitle: "Benefits that people cannot find",
        content: "Employees already have health, enrollment, wellness, and rewards programs. The friction is the maze: multiple portals, PDFs, and a call center for questions that should take seconds. That does not scale to 350K people with different plans and life events, and it does not scale across web, mobile, and conversational channels that all need to agree with each other. I am building a channel strategy where each surface does what it is best at, and a conversational layer that answers the question without sending someone to another site or a phone queue."
      },
      {
        title: "Context",
        subtitle: "Enterprise AI with real stakes",
        content: "This is healthcare and financial wellbeing inside a regulated bank. Personalization only works if data governance, privacy, security, and employee data protection are designed in from day one. The product has to work across product, data, engineering, content, and change management, not just a model in a demo, and it has to work across three parallel paths (web, mobile, chatbot) that all draw from the same systems of record."
      },
      {
        title: "My Thinking",
        subtitle: "Three channels, one strategy, trust as the product",
        content: "The north star is not a chatbot. It is one coherent total rewards experience where web, mobile, and conversational AI each carry the moments they are best suited for, and conversation is how we collapse the moments that used to require a portal or a call. The NLP and LLM layer has to be 99% accurate because a wrong benefits answer is worse than no answer. Accuracy is the floor. Trust is whether people actually ask, opt in, and stop calling the center. I treat privacy, content, and change management as product requirements, not legal afterthoughts."
      },
      {
        title: "Tradeoffs",
        subtitle: "What we will not skip",
        content: "Personalization vs privacy: privacy-first, with only the data we can justify. Speed vs security review: security and regulatory bar first, even if launch takes longer. Broad knowledge vs grounded answers: only answer from approved content and systems of record. Chat everywhere vs a few high-intent journeys: start where employees already get stuck (enrollment, coverage, wellness, rewards), and let web and mobile keep the journeys they already handle well."
      },
      {
        title: "Decision",
        subtitle: "How we are building it",
        content: "Lead the strategy across product, data governance, privacy, engineering, content, and change management. Three coordinated channels for health, enrollment, wellness, and rewards, so employees stop hopping portals, with conversational AI as the newest path for questions that used to mean a call or a search. Contain every question without a human handoff unless the answer is not grounded. Hold accuracy at 99% and still measure trust: do people opt in, and do they stop calling."
      },
      {
        title: "Outcome",
        subtitle: "The measurable impact",
        content: "350K employees in scope. 100% call center deflection on the questions the chatbot handles. Enrollment completion and time-to-answer improve because the job is one coherent experience across web, mobile, and chat instead of multiple disconnected portals. Model accuracy is 99%. That number matters, but it is not the product: the product is whether people trust it enough to opt in, keep coming back, and stop picking up the phone about health and money."
      },
      {
        title: "Lessons",
        subtitle: "What this work is already teaching",
        content: "In benefits, a wrong answer is worse than no answer, which is why 99% accuracy is a requirement, not a slide. Containment (100% deflection) only counts if the answer is grounded. The right channel for the right moment beats one interface trying to do everything; conversational AI works alongside web and mobile, not instead of them. Trust, opt-in, and CSAT are the real scoreboard, not model accuracy alone. The PM job is orchestration across privacy, engineering, content, and comms, not prompt writing."
      }
    ]
  },
  {
    id: "walmart-supply-chain",
    title: "Building Me@Walmart Supply Chain App",
    company: "Walmart",
    role: "Principal Product Manager",
    timeline: "2022-2025",
    summary: "I led the product from day one. We built a mobile app that 2M+ people use every day, supply chain and store associates who needed one place for schedules, performance, and tasks. We hit 80%+ adoption because we made it useful, not because we made it mandatory.",
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
        content: "Associates were juggling multiple systems just to see their schedule, check performance, or get tasks. HR was drowning in manual work. We're talking 500K+ hours a year. The mobile experience was an afterthought, and engagement showed it."
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
        content: "We hit 2M+ daily active users and 80%+ adoption in the first year. Incentive payouts that used to eat HR time are now automated. $15-20M saved per DC. We took 500K+ manual hours off the table. Associate satisfaction went up 35%. The app became the template for other internal products at Walmart."
      },
      {
        title: "Lessons",
        subtitle: "What I'd do differently",
        content: "Start with even more user research. We discovered key pain points 2 months in. Invest in better analytics infrastructure earlier. Build more robust A/B testing framework from day 1. Create stronger feedback loops with frontline associates. Document decision rationale better for future teams."
      }
    ]
  },
  {
    id: "jpmorgan-ai-onboarding",
    title: "AI-Driven Onboarding at Scale",
    company: "JPMorgan Chase",
    role: "VP Product",
    timeline: "2025-Present",
    summary: "We're rethinking onboarding for 50K+ hires a year. Instead of one-size-fits-all, we're using AI to personalize the path so people get to productivity faster and HR spends less time on the same questions.",
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
        content: "JPMorgan hires 50,000+ people a year across a ton of roles and locations. The old onboarding was the same for everyone: long time-to-productivity, lots of repetitive questions for HR, and new hires lost in a maze of systems. We needed to make it personal without losing scale or compliance."
      },
      {
        title: "Context",
        subtitle: "Enterprise complexity",
        content: "Global workforce across 60+ countries. 200+ distinct job roles with unique onboarding needs. Strict compliance and regulatory requirements. Integration with 50+ legacy HR systems. Multiple stakeholders (HR, IT, Legal, Compliance, Business Units). Need to maintain security while providing personalized experience."
      },
      {
        title: "My Thinking",
        subtitle: "AI as the personalization engine",
        content: "The insight was simple: AI could give people something closer to a 1-on-1 experience at scale. Rather than piling on more generic content, we focused on adapting what each person sees to their role and behavior. We started with role-based personalization, then let the system learn. Q&A and knowledge retrieval are powered by LLMs and RAG, but the north star was time-to-first-value, not just ticking boxes."
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
        content: "Time-to-productivity dropped by 40%. Early retention improved 15%. We've saved 100K+ manual hours by letting the AI handle routine questions, and new hire satisfaction went from 67% to 92%. The assistant handles about 80% of those questions without a human. We've rolled out to 30+ business units and are still expanding."
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
    summary: "There was no real-time feedback for supply chain associates, just annual reviews and paperwork. We built something from scratch. In six months we improved activation by 32% and cut drop-off by 25%. About 45K associates were using it.",
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
        content: "Interview before you build. We changed our initial scope 3 times based on feedback. Define activation narrowly and obsess over it. Ship fast, measure ruthlessly. 0→1 products need a champion; find your internal advocates early. Don't over-build; the best 0→1 products do one thing exceptionally well."
      }
    ]
  }
]
