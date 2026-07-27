import { Link } from 'react-router-dom'
import Brand from './Brand'
import AuthButton from './AuthButton'

// Minimal header for the Portfolio Builder (separate from Sadiq's personal nav).
export default function BuilderNav() {
  return (
    <nav>
      <div className="wrap nav-inner">
        <Link to="/" className="brand">
          <Brand />
          <span className="builder-tag">Builder</span>
        </Link>
        <div className="nav-links">
          <Link to="/editor">Editor</Link>
          <Link to="/me">Preview</Link>
          <Link to="/setup">Setup</Link>
          <Link to="/sadiq">Example</Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}
