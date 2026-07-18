import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './Icons'
import { profile } from '../data'

// Section anchors (scroll targets on the home page) + a real route for Projects.
const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll to a section — navigate home first if we're on another route.
  const goSection = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav>
      <div className="wrap nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="logo pixel">SS</span> Sadiq Shah
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {sections.map((s) => (
            <a key={s.id} href={`/#${s.id}`} onClick={goSection(s.id)}>
              {s.label}
            </a>
          ))}
          <Link to="/projects" onClick={() => setOpen(false)}>
            Projects
          </Link>
          <a href={profile.cv} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="nav-cv">
            <Icon name="file" size={14} /> View CV
          </a>
          <a href="/#contact" onClick={goSection('contact')} className="nav-cta">
            Hire Me
          </a>
        </div>

        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>
    </nav>
  )
}
