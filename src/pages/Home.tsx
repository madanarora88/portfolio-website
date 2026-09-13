import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Users, TrendingUp, Award, Lightbulb, Rocket, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { caseStudies } from '../data/caseStudies'
import PrincipleCard from '../components/common/PrincipleCard'
import WeekendProjectsSection from '../components/sections/WeekendProjectsSection'

const Home = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section — text-first, one sharp line + keyword strip + what I'm up to now */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-light to-light/80 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-light/90 mb-3 font-medium">
            {profile.heroLine}
          </p>
          <p className="text-primary font-semibold mb-2 tracking-wide">
            {profile.keywordStrip}
          </p>
          {profile.whatsUpNow && (
            <p className="text-light/70 text-sm md:text-base max-w-2xl mx-auto mb-8">
              What I&apos;m up to now: {profile.whatsUpNow}
            </p>
          )}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-8"
          >
            <img
              src="/assets/madan-photo.jpg"
              alt={profile.name}
              width={160}
              height={160}
              fetchPriority="high"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto border-4 border-primary/20 object-cover object-[center_15%]"
            />
          </motion.div>
          {profile.philosophyQuote && (
            <p className="text-light/80 italic max-w-xl mx-auto mb-8 text-lg">
              &ldquo;{profile.philosophyQuote}&rdquo;
            </p>
          )}
          {/* One-line stats (S2) */}
          <p className="text-light/60 text-sm mb-8">
            {profile.stats.yearsExperience} years · {profile.stats.dailyActiveUsers} users · {profile.stats.revenueImpact} revenue impact · {profile.stats.costSavings} savings
          </p>
          {/* Stat cards (S3) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <StatCard icon={Briefcase} label="Years shipping" value={profile.stats.yearsExperience} />
            <StatCard icon={Users} label="Daily active users" value={profile.stats.dailyActiveUsers} />
            <StatCard icon={TrendingUp} label="Revenue influenced" value={profile.stats.revenueImpact} />
            <StatCard icon={Award} label="Annual savings" value={profile.stats.costSavings} />
          </div>
          {/* CTAs — primary: See the work, secondary: Let's chat (T1) */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link
              to="/case-studies"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              See the work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-primary hover:bg-primary/10 text-light rounded-lg font-semibold transition-all"
            >
              Let&apos;s chat
            </Link>
            <Link
              to="/simulator"
              className="px-8 py-4 border border-light/20 hover:border-light/40 hover:bg-light/5 text-light rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Lightbulb className="w-5 h-5" />
              See how I think
            </Link>
            <a
              href="/assets/Resume/resume.pdf"
              download="Madan_Arora_Resume.pdf"
              className="px-8 py-4 border border-light/20 hover:border-light/40 hover:bg-light/5 text-light rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Resume
            </a>
          </div>
          {/* Trusted by (S4) */}
          <div className="mt-16">
            <p className="text-light/50 text-sm uppercase tracking-wide mb-4">
              Trusted by
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {profile.companies.map((company) => (
                <span key={company} className="text-light/70 font-medium">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee strip (S1) */}
      <section className="py-4 border-y border-light/10 bg-light/5 overflow-hidden">
        <div className="flex w-max animate-marquee">
          <MarqueeRow stats={profile.stats} />
          <MarqueeRow stats={profile.stats} />
        </div>
      </section>

      {/* Outcomes strip — surface project impact immediately */}
      <section className="py-12 px-6 border-y border-light/10 bg-light/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-light/50 text-sm uppercase tracking-wide mb-8">
            Experience &amp; outcomes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((study) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.id}`}
                className="block p-5 rounded-xl bg-dark border border-light/10 hover:border-primary/30 transition-colors text-center group"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:text-primary/90">
                  {study.metrics[0]?.value ?? '-'}
                </div>
                <div className="text-light/60 text-sm mb-2">{study.metrics[0]?.label ?? ''}</div>
                <div className="text-light/90 font-medium">{study.company} · {study.title}</div>
                <span className="inline-block mt-2 text-sm text-primary font-medium group-hover:underline">
                  Read the case study →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Work grid with hover (W1) + See the work CTA (W5) */}
      <section className="py-24 px-6 bg-dark/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">See the work</h2>
            <p className="text-light/70 text-lg">
              Deep dives on how we got to these outcomes
            </p>
          </motion.div>

          {/* Compact work grid — hover reveals category/tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {caseStudies.map((study, index) => (
              <Link key={study.id} to={`/case-studies/${study.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group p-5 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-all h-full"
                >
                  <div className="text-light/50 text-xs mb-1">{study.company} · {study.timeline}</div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-light/60 text-sm line-clamp-2 mb-3">{study.summary}</p>
                  <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <p className="text-center text-light/40 text-sm mb-6">
            Hover cards to see tags — or click through to the full case study.
          </p>
          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg group"
              title="What happens when you hover? You get tags. Click for the full story."
            >
              See the work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Companies Hire Me */}
      {profile.whyHireMe && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Companies Hire Me</h2>
              <p className="text-light/70 text-lg max-w-2xl mx-auto">
                What I bring to a team, in practice
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {profile.whyHireMe.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 p-6 rounded-xl bg-light/5 border border-light/10"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-light/90">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities — I own the full product stack (C1, C2, C4) */}
      {profile.productsICouldBuild && (
        <section className="py-24 px-6 bg-dark/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">I own the full product stack</h2>
              <p className="text-light/70 text-lg max-w-2xl mx-auto">
                From 0→1 to scale — what I&apos;ve shipped and can build for you
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {profile.productsICouldBuild.map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-colors"
                >
                  <span className="text-light/40 font-mono text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold mb-2 mt-1">{product.title}</h3>
                  <p className="text-light/70 text-sm mb-3">{product.desc}</p>
                  {'keywords' in product && product.keywords && (
                    <p className="text-primary/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.keywords}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Stories */}
      {profile.heroStories && profile.heroStories.length > 0 && (
        <section className="py-24 px-6 bg-dark/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">How I&apos;ve Shipped</h2>
              <p className="text-light/70 text-lg max-w-2xl mx-auto">
                A few projects and how they landed
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {profile.heroStories.map((story, i) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-xl bg-light/5 border border-light/10"
                >
                  <h3 className="text-xl font-bold mb-1">{story.title}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{story.tagline}</p>
                  <p className="text-light/70 text-sm mb-4">{story.situation}</p>
                  <ul className="space-y-1 mb-4 text-sm text-light/80 list-disc list-inside">
                    {story.results.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-primary">{story.metrics}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Philosophy quote section (P2) */}
      {profile.philosophyQuote && (
        <section className="py-16 px-6 border-y border-light/10 bg-light/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-light/90 italic">
              &ldquo;{profile.philosophyQuote}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* Product Principles */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How I Think</h2>
            <p className="text-light/70 text-lg">
              Principles I use when making calls. Click to expand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {profile.productPrinciples.map((principle, index) => (
              <PrincipleCard key={index} principle={principle} index={index} />
            ))}
          </div>

          {profile.howIPrioritize && profile.howIPrioritize.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">How I Prioritize</h3>
              <ul className="space-y-4 max-w-3xl mx-auto">
                {profile.howIPrioritize.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-light/80">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </section>

      {/* Weekend Builds & Early Work */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Weekend Builds &amp; Early Work</h2>
            <p className="text-light/70 text-lg max-w-2xl mx-auto">
              The best PMs build things. Not because they need to, because they can't stop thinking
              about problems worth solving.
            </p>
          </motion.div>
          <WeekendProjectsSection />
        </div>
      </section>
    </div>
  )
}

// Marquee row (duplicated for seamless loop)
const MarqueeRow = ({ stats }: { stats: typeof profile.stats }) => (
  <div className="flex shrink-0 items-center gap-12 px-12 text-light/60 text-sm font-medium whitespace-nowrap">
    <span>{stats.yearsExperience} years shipping</span>
    <span>·</span>
    <span>{stats.dailyActiveUsers} daily users</span>
    <span>·</span>
    <span>{stats.revenueImpact} revenue impact</span>
    <span>·</span>
    <span>{stats.costSavings} savings</span>
    <span>·</span>
    <span>Fortune 50</span>
    <span>·</span>
    <span>AI &amp; 0→1</span>
  </div>
)

// Helper Components
const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-light/5 backdrop-blur-sm p-6 rounded-lg border border-light/10"
  >
    <Icon className="w-8 h-8 text-primary mb-3 mx-auto" />
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-light/60 text-sm">{label}</div>
  </motion.div>
)

const CaseStudyPreview = ({ study, index }: { study: (typeof caseStudies)[0]; index: number }) => (
  <Link to={`/case-studies/${study.id}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="block bg-light/5 backdrop-blur-sm p-8 rounded-xl border border-light/10 hover:border-primary/30 transition-all"
    >
      <div className="flex items-center gap-2 text-sm text-light/50 mb-3">
        <span>{study.company}</span>
        <span>•</span>
        <span>{study.timeline}</span>
      </div>
      
      <h3 className="text-2xl font-bold mb-3">{study.title}</h3>
      <p className="text-light/70 mb-6">{study.summary}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {study.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {study.metrics.slice(0, 4).map((metric: { label: string; value: string }) => (
          <div key={metric.label}>
            <div className="text-2xl font-bold text-primary">{metric.value}</div>
            <div className="text-sm text-light/60">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-primary font-semibold group">
        View Case Study
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  </Link>
)

export default Home
