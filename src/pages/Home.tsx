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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <img
              src="/assets/madan-photo.jpg"
              alt={profile.name}
              width={224}
              height={224}
              fetchPriority="high"
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full mx-auto mb-6 border-4 border-primary/20 object-cover object-[center_15%] sm:object-[center_25%]"
            />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-light to-light/60 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          
          <p className="text-2xl md:text-3xl text-light/80 mb-4">
            {profile.title}
          </p>
          
          <p className="text-xl md:text-2xl text-primary font-medium mb-12">
            {profile.tagline}
          </p>
          
          <p className="text-lg text-light/70 max-w-3xl mx-auto mb-12">
            {profile.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <StatCard icon={Briefcase} label="Years Experience" value={profile.stats.yearsExperience} />
            <StatCard icon={Users} label="Daily Active Users" value={profile.stats.dailyActiveUsers} />
            <StatCard icon={TrendingUp} label="Revenue Impact" value={profile.stats.revenueImpact} />
            <StatCard icon={Award} label="Annual Savings" value={profile.stats.costSavings} />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/case-studies"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/simulator"
              className="px-8 py-4 border-2 border-primary hover:bg-primary/10 text-light rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              See How I Think
              <Lightbulb className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-light/20 hover:border-light/40 hover:bg-light/5 text-light rounded-lg font-semibold transition-all"
            >
              Get In Touch
            </Link>
            <a
              href="/assets/Resume/resume.pdf"
              download="Madan_Arora_Resume.pdf"
              className="px-8 py-4 border-2 border-light/20 hover:border-light/40 hover:bg-light/5 text-light rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Resume
            </a>
          </div>

          {/* Companies */}
          <div className="mt-20">
            <p className="text-light/50 text-sm uppercase tracking-wide mb-6">
              Trusted by Fortune 50 Companies
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {profile.companies.map((company) => (
                <span key={company} className="text-light/70 font-medium text-lg">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
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

      {/* Featured Work — moved up so hiring managers see it first */}
      <section className="py-24 px-6 bg-dark/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-light/70 text-lg">
              Deep dives on how we got to these outcomes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((study, index) => (
              <CaseStudyPreview key={study.id} study={study} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg group"
            >
              View All Case Studies
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

      {/* Products I Could Build */}
      {profile.productsICouldBuild && (
        <section className="py-24 px-6 bg-dark/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">What I&apos;ve Built (and Could Build for You)</h2>
              <p className="text-light/70 text-lg max-w-2xl mx-auto">
                Types of products I&apos;ve shipped and can do again
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
                  className="p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-light/70">{product.desc}</p>
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
