export const profile = {
  name: "Madan Arora",
  title: "AI Product Manager",
  tagline: "I design AI products that feel like magic",
  bio: "VP of Product at JPMorgan Chase with 13+ years of experience building products that scale to 2M+ users. Known for exceptional product sense, AI transformation expertise, and driving $50M+ in revenue impact.",
  
  contact: {
    email: "aroramadan88@gmail.com",
    phone: "(815)-793-3299",
    linkedin: "https://www.linkedin.com/in/madan-arora",
    github: "#", // Add if relevant
  },
  
  links: {
    tedTalk: "https://www.youtube.com/watch?v=EFH-T52TI5Y",
    book: "https://www.amazon.com/Habit-Worlds-Great-Leaders-Leadership/dp/B094T535WY",
    leanAgileTalk: "https://youtu.be/S1gIv2EJbTo",
  },
  
  stats: {
    yearsExperience: "13+",
    dailyActiveUsers: "2M+",
    revenueImpact: "$50M+",
    costSavings: "$20M+",
    fortune50Companies: 4,
  },
  
  companies: [
    "JPMorgan Chase",
    "Walmart",
    "IBM",
    "American Airlines",
    "AT&T"
  ],

  whyHireMe: [
    "Exceptional product sense—shipped products that 2M+ users adopt daily",
    "0→1 expertise—built products from idea to scale at Fortune 50 companies",
    "AI product intuition—turn frontier AI into products people love",
    "Proven impact—$100M+ revenue, $20M+ savings, 80%+ adoption rates",
  ],

  sideProjects: [
    {
      title: "Millennial to GenZ Translator",
      description: "A fun weekend project that helps millennials understand GenZ slang better",
      url: "https://slang-switcheroo.lovable.app/",
      tags: ["Lovable", "AI", "Weekend Project"],
    },
    {
      title: "PlateRater",
      description: "A food-focused app for foodies to rate individual dishes (quality, taste, presentation, portion, etc.)—unlike Yelp's restaurant ratings. Featured the best dishes around, what friends were eating, and helped mom & pop shops, celebrity chefs, and food trucks showcase their best plates. When you go to a restaurant, you'd know exactly what to order.",
      url: null,
      tags: ["Mobile", "Food", "0→1"],
      images: [
        "/assets/plate-rater/1.jpg",
        "/assets/plate-rater/2.jpg",
        "/assets/plate-rater/3.jpg",
        "/assets/plate-rater/4.jpg",
        "/assets/plate-rater/5.jpg",
        "/assets/plate-rater/6.jpg",
        "/assets/plate-rater/7.jpg",
        "/assets/plate-rater/8.jpg",
        "/assets/plate-rater/9.jpg",
        "/assets/plate-rater/10.jpg",
        "/assets/plate-rater/11.jpg",
        "/assets/plate-rater/12-BIG_Card.jpg",
        "/assets/plate-rater/13-Small_Card.jpg",
        "/assets/plate-rater/14.jpg",
        "/assets/plate-rater/15.jpg",
        "/assets/plate-rater/16.jpg",
        "/assets/plate-rater/17.jpg",
        "/assets/plate-rater/18.jpg",
        "/assets/plate-rater/19.jpg",
      ],
    },
  ],

  productsICouldBuild: [
    { title: "AI-Powered Employee Experience", desc: "Personalized onboarding and feedback at enterprise scale" },
    { title: "Intelligent Workflow Automation", desc: "Reduce manual work by 50%+ with smart automation" },
    { title: "0→1 Product from Idea to Launch", desc: "Validate, build, and scale new product lines" },
    { title: "Product-Led Growth Engine", desc: "Activation, retention, and expansion strategies" },
  ],

  education: "B.S. Operations & Information Systems, Northern Illinois University, 2011",

  certifications: [
    { name: "World-class Product Sense in Practice", issuer: "Maven (Shreyas Doshi)" },
    { name: "AI Product Management", issuer: "Maven & Product Faculty (OpenAI, Cursor, Anthropic)" },
    { name: "AI 900 Azure AI Fundamentals", issuer: "Microsoft" },
    { name: "AZ-900 Azure Fundamentals", issuer: "Microsoft" },
    { name: "AWS Certified Cloud Practitioner (CLF-C01)", issuer: "AWS" },
    { name: "SAFe SPC 5.1, SA, CSM, CSPO, ICP-ACC, ATF", issuer: "Agile & Scrum" },
  ],

  heroStories: [
    {
      title: "Ask Sam",
      tagline: "Voice GenAI for 4,600+ stores",
      situation: "Store associates spent 15–20% of their shift searching for product locations and policy details.",
      results: [
        "Led cross-functional team to build voice-enabled GenAI assistant in Me@Walmart",
        "Implemented RAG to ground responses in real-time inventory; added feedback loops for continuous improvement",
        "Reduced query resolution from 5 minutes to 45 seconds with 97% accuracy",
      ],
      metrics: "82% weekly active usage among associates across 4,600+ stores",
    },
    {
      title: "Scheduling bias fix",
      tagline: "Responsible AI in workforce tools",
      situation: "ML-powered scheduling was favoring full-time over part-time workers for premium shifts.",
      results: [
        "Ran fairness audits with SHAP values; partnered with Responsible AI on counterfactual fairness checks",
        "Added transparency so associates see the 'why' behind shift recommendations",
        "Established continuous monitoring with demographic parity metrics in production",
      ],
      metrics: "73% reduction in scheduling bias; 98% shift acceptance; internal innovation award",
    },
    {
      title: "AI hiring tool",
      tagline: "Eval-first AI that managers trust",
      situation: "Time-to-offer was over 2 weeks; candidates dropped off and managers couldn't fill roles fast enough.",
      results: [
        "Built AI/ML tool for top-candidate recommendations and streamlined hiring process",
        "Defined three eval layers: model performance, user behavior (override rates), and business outcomes",
        "Iterated weekly on signals so the product earned manager trust, not just good model metrics",
      ],
      metrics: "Time-to-offer 2 weeks → 24 hours; 50% drop-off reduction; 90% offer acceptance in 24h; manager trust 45% → 87%",
    },
  ],

  howIPrioritize: [
    "Value vs. effort—I balance customer impact, business value, and effort so we ship what matters first.",
    "Innovation vs. stability—I allocate most work to core reliability, some to improvements, and a slice to bold bets.",
    "Eval-first for AI—model metrics alone aren't enough; I track user behavior and business outcomes so AI earns trust.",
  ],

  productPrinciples: [
    {
      title: "Start with user pain, not technology",
      description: "The best products solve real problems. I obsess over understanding friction before users can articulate it.",
      example: "At Walmart, reduced hiring time from 2 weeks to 24 hours by deeply understanding candidate drop-off points."
    },
    {
      title: "Product sense beats technical skills",
      description: "Deep empathy for users, sharp problem framing, and instinctive prioritization drive better outcomes than just technical expertise.",
      example: "Achieved 80%+ adoption rate on 2M+ DAU app through product sense, not just engineering."
    },
    {
      title: "AI amplifies intent, not replaces it",
      description: "AI should make existing workflows feel inevitable, not add complexity.",
      example: "GenAI integration at JPMorgan Chase accelerated onboarding for 50K+ hires without disrupting existing processes."
    },
    {
      title: "Metrics tell stories, not just numbers",
      description: "Every metric should connect to user value and business impact.",
      example: "$15-20M annual savings isn't just a number—it's 500K+ hours given back to HR teams."
    }
  ]
}

export const experience = [
  {
    company: "JPMorgan Chase",
    title: "VP Product, Omni Channel Employee Experience",
    period: "May 2025 - Present",
    location: "Remote",
    description: "Leading global onboarding product strategy supporting 50K+ annual hires",
    achievements: [
      "Driving AI-driven personalization to accelerate time-to-productivity",
      "Enhanced omni-channel performance feedback experience",
      "Leveraging AI/ML to reduce operational friction"
    ],
    impact: "50K+ annual hires supported"
  },
  {
    company: "Walmart Inc.",
    title: "Principal Product Manager: Associate Experience",
    period: "Apr 2022 - May 2025",
    location: "Bentonville, AR",
    description: "Led end-to-end development of Me@Walmart Supply Chain mobile app",
    achievements: [
      "Built mobile product serving 2M+ Daily Active Users with 80%+ adoption rate",
      "Led Ask Sam—voice-enabled GenAI assistant across 4,600+ stores; query resolution 5 min → 45 sec, 97% accuracy",
      "Architected Labor Management tool saving $15-20M per DC annually; 500K+ manual hours eliminated",
      "Reduced hiring time from 2 weeks to 24 hours with AI-powered hiring tool (50% drop-off reduction, 90% offer acceptance in 24h)",
    ],
    impact: "$15-20M annual savings, 500K+ manual hours eliminated"
  },
  {
    company: "IBM",
    title: "Product Management Consultant: Agile & Cloud Native",
    period: "Mar 2021 - Apr 2022",
    location: "Dallas, TX",
    description: "Drove business transformation strategies scaling Agile and Cloud-Native applications",
    achievements: [
      "Drove 5M+ individual signings and 125M+ team signings per quarter",
      "Accelerated cloud adoption roadmap by 30%",
      "Reduced product development cycles by 40%"
    ],
    impact: "$100M+ revenue impact"
  },
  {
    company: "American Airlines",
    title: "Product Manager / Lead Business Analyst",
    period: "Sep 2016 - Mar 2021",
    location: "Fort Worth, TX",
    description: "Led Digital Customer Experience initiatives",
    achievements: [
      "Led DCX initiatives for emails, mobile push, ticket confirmations",
      "Achieved 100% organizational adoption for modernized applications",
      "Established OKRs and KPIs for performance measurement"
    ],
    impact: "100% adoption across organization"
  },
  {
    company: "AT&T Inc.",
    title: "Product Owner/Scrum Master",
    period: "Mar 2012 - Sep 2016",
    location: "Dallas, TX",
    description: "Developed unified online business relationship platform",
    achievements: [
      "Integrated AT&T products into single digital experience",
      "Enhanced customer experience and business process efficiency"
    ],
    impact: "Streamlined business center digital experience"
  }
]
