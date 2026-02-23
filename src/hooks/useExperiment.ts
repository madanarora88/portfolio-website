import { useState, useCallback } from 'react'

function robustParse(text: string): unknown {
  let cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    // no-op
  }

  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first !== -1 && last > first) {
    try {
      return JSON.parse(cleaned.slice(first, last + 1))
    } catch {
      // no-op
    }
  }

  try {
    const fixed = cleaned
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/\n/g, ' ')
      .replace(/[\x00-\x1F\x7F]/g, ' ')
    return JSON.parse(fixed)
  } catch {
    // no-op
  }

  throw new Error('JSON parse failed')
}

export function useExperiment<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async (systemPrompt: string, userMessage: string) => {
    setLoading(true)
    setData(null)
    setError(null)
    try {
      const res = await fetch('/api/experiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt, userMessage }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      const parsed = robustParse(json.text) as T
      setData(parsed)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
  }, [])

  return { data, loading, error, run, reset }
}
