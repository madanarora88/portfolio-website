export const profile = {
  name: "Madan Arora",
  title: "AI Product Manager",
  tagline: "I ship AI products people actually use",
  bio: "I'm VP of Product at JPMorgan Chase. Before that I led product at Walmart, IBM, and American Airlines—products that ended up in the hands of over 2 million people. I care more about what gets shipped than what gets pitched.",
  
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
    "I've shipped products that 2M+ people use every day. At Walmart we got to 80% adoption on the supply chain app—not by mandating it, by making it useful.",
    "I've built things from zero at big companies. The feedback platform I led had no playbook; we interviewed 40+ associates before writing code and hit 32% better activation in six months.",
    "I treat AI as a product problem, not a tech demo. The hiring tool I built cut time-to-offer from 2 weeks to 24 hours because we obsessed over manager trust, not just model accuracy.",
    "The numbers I'm proud of: $15–20M saved per DC at Walmart, $100M+ revenue impact at IBM, 50% drop in candidate drop-off. I can walk you through how we got there.",
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
    { title: "Employee experience that scales", desc: "I've done onboarding and feedback for 50K+ hires and 2M+ daily users. I know where the friction is and how to fix it." },
    { title: "AI that earns trust, not just metrics", desc: "At Walmart we got managers to actually use the AI hiring tool by measuring what they did, not just model accuracy. I'd do the same for you." },
    { title: "New product from idea to launch", desc: "I've taken products from zero to adoption at Fortune 50 companies. Tight scope, fast feedback, and a clear definition of 'done'." },
    { title: "Operations that don't rely on heroics", desc: "Labor tools, scheduling, feedback loops—I've built the kind of products that save hundreds of thousands of hours so teams can focus on people." },
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
      tagline: "Voice AI for 4,600+ stores",
      situation: "Associates were spending a big chunk of their shift just hunting for where things were or what the policy said. We built a voice assistant inside the Me@Walmart app so they could ask out loud.",
      results: [
        "Shipped a GenAI assistant grounded in real-time inventory so answers were accurate, not generic.",
        "Added feedback loops so we could improve from what associates actually asked.",
        "Query resolution went from about 5 minutes to under a minute, and we hit 97% accuracy.",
      ],
      metrics: "82% of associates used it weekly across 4,600+ stores",
    },
    {
      title: "Scheduling bias fix",
      tagline: "Making workforce AI fair",
      situation: "Our ML scheduling was inadvertently favoring full-timers for the best shifts. Part-timers noticed; we had to fix it.",
      results: [
        "Ran fairness audits and worked with our Responsible AI team on how we measured bias.",
        "We made the logic transparent so associates could see why a shift was suggested.",
        "Put monitoring in place so we'd catch regressions, not just ship and forget.",
      ],
      metrics: "73% reduction in measured bias, 98% shift acceptance, and an internal innovation award",
    },
    {
      title: "AI hiring tool",
      tagline: "Getting to 24-hour time-to-offer",
      situation: "Time-to-offer was over two weeks. Candidates dropped off, managers were frustrated. I led the product that changed that.",
      results: [
        "Built an AI tool that recommended top candidates and streamlined the process end to end.",
        "We didn't just optimize for model metrics—we tracked whether managers actually used it and whether offers were accepted.",
        "Iterated every week on the signals so the product earned trust instead of feeling like a black box.",
      ],
      metrics: "2 weeks → 24 hours time-to-offer; 50% less drop-off; manager trust 45% → 87%",
    },
  ],

  howIPrioritize: [
    "I weigh impact, effort, and risk. If it doesn't move a metric that matters to users or the business, it gets deprioritized.",
    "Most of the roadmap stays on making the core product reliable; a chunk goes to improvements; a small slice to experiments. I've seen too many teams bet everything on the wrong thing.",
    "For AI products, I care as much about whether people use it and what happens after as I do about accuracy. Model metrics alone don't tell you if you built something that sticks.",
  ],

  productPrinciples: [
    {
      title: "Start with the problem, not the tech",
      description: "I go where the friction is. At Walmart we didn't assume hiring was slow because of the process—we looked at where candidates dropped and what managers did all day. That's how we got to 24-hour time-to-offer.",
      example: "Spent weeks in distribution centers before we built the supply chain app. The best ideas came from watching people work, not from a deck."
    },
    {
      title: "Adoption is the real test",
      description: "Shipping isn't enough. We hit 80% adoption on the Walmart app because we made it useful for the daily grind, not because we mandated it. I care about whether people choose to use what we build.",
      example: "We measured manager trust on the hiring tool every sprint. When override rates dropped and acceptance went up, we knew we'd built something that earned its place."
    },
    {
      title: "AI should fit the workflow",
      description: "The best AI feels invisible. At JPMorgan we're speeding up onboarding for tens of thousands of hires by making AI helpful where people already are—not by adding another tool to learn.",
      example: "Ask Sam worked because associates could just talk; they didn't have to open another app or learn a new interface."
    },
    {
      title: "Numbers should tell a story",
      description: "I like metrics that connect to real outcomes. $15–20M in savings meant 500K+ hours back for HR and ops—that's the story I tell, not just the dollar figure.",
      example: "When we talk about 2M DAU, we also talk about what those users do: get their schedule, see their performance, get answers. That's what 'impact' means."
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
