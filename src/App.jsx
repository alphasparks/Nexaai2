import { SpeedInsights } from '@vercel/speed-insights/react'

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>NexaAI — Scholarship Finder for Ugandan Students</h1>
      <p>Find, match, and track scholarships for Ugandan students.</p>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        This is a placeholder app. The full application will be developed separately.
      </p>
      <SpeedInsights />
    </div>
  )
}
