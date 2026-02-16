import { useParams, Link } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import CaseStudyEngine from '../components/case-studies/CaseStudyEngine'

export default function CaseStudyDetail() {
  const { id } = useParams()
  const study = caseStudies.find((s) => s.id === id)

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-light mb-4">Case study not found</h1>
          <Link to="/case-studies" className="text-primary hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CaseStudyEngine study={study} />
    </div>
  )
}
