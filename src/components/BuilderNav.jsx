import { Link } from 'react-router-dom'
import AuthButton from './AuthButton'
import { Icon } from './Icons'

// Minimal header for the Portfolio Builder.
export default function BuilderNav() {
  return (
    <nav>
      <div className="wrap nav-inner">
        <Link to="/" className="pb-brand">
          <span className="pb-logo"><Icon name="grid" size={16} /></span>
          <span className="pb-text">Portfolio<b>Builder</b></span>
        </Link>
        <div className="nav-links">
          <Link to="/sadiq">Example</Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}
