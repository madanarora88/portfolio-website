import { useEffect } from 'react'
import StrategicTensions from '../components/sections/StrategicTensions'
import ProductPrinciplesFull from '../components/sections/ProductPrinciplesFull'

export default function Simulator() {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <StrategicTensions />
        <div className="border-t border-light/10 pt-16">
          <ProductPrinciplesFull />
        </div>
      </div>
    </div>
  )
}
