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
    summary: "Led end-to-end development of mobile app serving 2M+ Daily Active Users, achieving 80%+ adoption rate among 122K+ supply chain associates.",
    tags: ["AI/ML", "Mobile", "Scale", "Employee Experience"],
    metrics: [
      { label: "Daily Active Users", value: "2M+" },
      { label: "Adoption Rate", value: "80%+" },
      { label: "Associates Impacted", value: "122K+ Supply Chain Associates and 2M+ store associates" },
      { label: "Annual Savings", value: "$15-20M per store and $5-10M per distribution center" }
    ],
    steps: [
      {
        title: "Problem",
        subtitle: "Understanding the friction",
        content: "Supply chain associates were using multiple disconnected systems for performance tracking, scheduling, and task management. Manual processes consumed 500K+ HR hours annually, and lack of real-time visibility created operational inefficiencies. Associate engagement was low due to poor mobile experience."
      },
      {
        title: "Context",
        subtitle: "The constraints that shaped the solution",
        content: "122K+ associates across hundreds of distribution centers with varying tech literacy. Legacy systems integration required careful planning. Mobile-first workforce with limited desktop access. High security and compliance requirements. Need to maintain 99.9% uptime for critical operations."
      },
      {
        title: "My Thinking",
        subtitle: "How I approached the problem",
        content: "Started with deep user research—spent weeks in distribution centers observing workflows. Identified that associates needed three things: instant access to their performance data, simplified scheduling, and automated incentive calculations. Prioritized mobile-first experience with offline capabilities. Focused on AI/ML for predictive insights rather than reactive reporting."
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
        content: "Achieved 1.2M+ DAU with 80%+ adoption rate in first year. Automated incentive payouts saving $15-20M per DC annually. Eliminated 500K+ manual HR hours. Improved associate satisfaction scores by 35%. Platform became blueprint for other Walmart internal apps."
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
    summary: "Transforming global onboarding experience for 50K+ annual hires through AI-driven personalization and automation.",
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
        content: "JPMorgan Chase hires 50,000+ employees annually across hundreds of roles and locations. Traditional one-size-fits-all onboarding created poor experience, low early engagement, and extended time-to-productivity. HR teams overwhelmed with repetitive questions. New hires struggled to navigate complex systems and find role-specific information."
      },
      {
        title: "Context",
        subtitle: "Enterprise complexity",
        content: "Global workforce across 60+ countries. 200+ distinct job roles with unique onboarding needs. Strict compliance and regulatory requirements. Integration with 50+ legacy HR systems. Multiple stakeholders (HR, IT, Legal, Compliance, Business Units). Need to maintain security while providing personalized experience."
      },
      {
        title: "My Thinking",
        subtitle: "AI as the personalization engine",
        content: "Realized that AI could provide 1-on-1 onboarding at scale. Key insight: instead of building more features, build intelligence that adapts content to each individual. Started with role-based personalization, then added behavioral learning. Used LLMs for Q&A automation and RAG for knowledge retrieval. Focused on reducing time-to-first-value, not just completion rates."
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
        content: "40% reduction in time-to-productivity. 15% improvement in early-tenure retention. 100K+ manual HR hours saved through Q&A automation. 92% new hire satisfaction score (up from 67%). AI assistant handles 80% of routine questions without human intervention. Platform expanded to 30+ business units."
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
    summary: "Built a new real-time feedback product from scratch for 122K+ supply chain associates, improving activation by 32% and reducing drop-off by 25% in the first 6 months.",
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
        content: "0→1 isn't just building something new—it's finding product-market fit in an underserved space. I started with a hypothesis: associates want frequent, lightweight feedback, not annual reviews. Validated through 40+ associate interviews before writing a single line of code. Focused on the smallest unit of value: 'Give one piece of feedback today.'"
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
