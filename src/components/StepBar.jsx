import { useNavigate } from 'react-router-dom'

const STEPS = [
  { label: 'Import', path: '/build' },
  { label: 'Customize', path: '/editor' },
  { label: 'Publish', path: '/me' },
]

// Progress indicator shown on the builder pages so users always know the flow.
export default function StepBar({ current = 0 }) {
  const navigate = useNavigate()
  return (
    <div className="stepbar">
      <div className="wrap stepbar-inner">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            className={`step ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
            onClick={() => navigate(s.path)}
          >
            <span className="step-n">{i < current ? '✓' : i + 1}</span>
            {s.label}
            {i < STEPS.length - 1 && <span className="step-arrow">→</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
