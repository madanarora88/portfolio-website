import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Briefcase, Users, TrendingUp, Award, Lightbulb, Rocket, ExternalLink, X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { profile } from '../data/profile'
import { caseStudies } from '../data/caseStudies'
import PrincipleCard from '../components/common/PrincipleCard'

const Home = () => {
  const [designGallery, setDesignGallery] = useState<{ images: string[]; title: string } | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

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
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full mx-auto mb-6 border-4 border-primary/20 object-cover object-[center_25%]"
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

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-light/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </motion.div>
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
                What I bring to every product team
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
              <h2 className="text-4xl font-bold mb-4">Products I Could Build for Your Company</h2>
              <p className="text-light/70 text-lg max-w-2xl mx-auto">
                Examples of what I can deliver
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
              Product principles that guide my decision-making. Click to expand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {profile.productPrinciples.map((principle, index) => (
              <PrincipleCard key={index} principle={principle} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
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
              Products that transformed Fortune 50 companies
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

      {/* Side Projects */}
      {profile.sideProjects && profile.sideProjects.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Side Projects</h2>
              <p className="text-light/70 text-lg max-w-2xl mx-auto">
                Weekend builds and experiments
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.sideProjects.map((project, i) => {
                const hasUrl = project.url
                const hasImages = 'images' in project && project.images?.length
                return hasUrl ? (
                  <motion.a
                    key={project.title}
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="block p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <ExternalLink className="w-5 h-5 shrink-0 text-primary/70" />
                    </div>
                    <p className="text-light/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ) : (
                  <motion.button
                    key={project.title}
                    type="button"
                    onClick={() => {
                      if (hasImages) {
                        setGalleryIndex(0)
                        setDesignGallery({ images: project.images!, title: project.title })
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="w-full text-left p-6 rounded-xl bg-light/5 border border-light/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {hasImages && (
                        <ImageIcon className="w-5 h-5 shrink-0 text-primary/70" />
                      )}
                    </div>
                    <p className="text-light/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {hasImages && (
                      <p className="mt-3 text-sm text-primary font-medium">View designs →</p>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Design gallery modal */}
            <AnimatePresence>
              {designGallery && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setDesignGallery(null)}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-4 md:inset-12 z-50 flex flex-col bg-dark rounded-xl border border-light/10 overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-light/10">
                      <h3 className="text-lg font-bold">{designGallery.title} – Designs</h3>
                      <button
                        onClick={() => setDesignGallery(null)}
                        className="p-2 rounded-lg hover:bg-light/10 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                      <img
                        src={designGallery.images[galleryIndex]}
                        alt={`Design ${galleryIndex + 1}`}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    </div>
                    {designGallery.images.length > 1 && (
                      <div className="flex items-center justify-center gap-4 p-4 border-t border-light/10">
                        <button
                          onClick={() => setGalleryIndex((i) => (i - 1 + designGallery.images.length) % designGallery.images.length)}
                          className="p-2 rounded-lg hover:bg-light/10 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-sm text-light/60">
                          {galleryIndex + 1} / {designGallery.images.length}
                        </span>
                        <button
                          onClick={() => setGalleryIndex((i) => (i + 1) % designGallery.images.length)}
                          className="p-2 rounded-lg hover:bg-light/10 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}
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
