import { Link } from 'react-router-dom'
import { Home, Briefcase, Mail, MapPin } from 'lucide-react'

/**
 * Creative 404 / offline-friendly page.
 * "Lost in the backlog" theme - choose your path to get back on track.
 */
const NotFound = () => {
  const paths = [
    { to: '/', icon: Home, label: 'Home', desc: 'Start fresh' },
    { to: '/case-studies', icon: Briefcase, label: 'Case Studies', desc: 'See what I build' },
    { to: '/contact', icon: Mail, label: 'Contact', desc: 'Get in touch' },
  ]

  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="text-8xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
          🗺️
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
          Lost in the backlog
        </h1>
        <p className="text-light/70 text-lg mb-2">
          This page sprinted away. No worries—choose your path:
        </p>
        <p className="text-light/50 text-sm mb-12">
          (Every great PM knows when to pivot)
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {paths.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group block p-6 rounded-2xl bg-light/5 border-2 border-light/10 hover:border-primary/50 hover:bg-primary/10 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                {label}
              </h2>
              <p className="text-sm text-light/60">{desc}</p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-light/40 text-sm flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" />
          Madan Arora · AI Product Manager
        </p>
      </div>
    </div>
  )
}

export default NotFound
