import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import Footer from '../components/Footer'
import LoginModal from '../components/LoginModal'
import { Icon } from '../components/Icons'
import { useAuth } from '../lib/auth'
import { getMyPortfolio } from '../lib/cloud'
import { saveProfile } from '../lib/store'

const STEPS = [
  { n: '01', icon: 'github', title: 'Import', text: 'Paste your GitHub and drop your LinkedIn PDF. We fetch your repos, skills, experience and education automatically.' },
  { n: '02', icon: 'lock', title: 'Customize', text: 'Edit every field, add projects, reorder sections and pick a color theme — all saved to your account.' },
  { n: '03', icon: 'external', title: 'Publish & Share', text: 'Publish to get a public link, download your CV as PDF, or export the whole site as a ZIP.' },
]

export default function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)

  // If the user already has a portfolio → open it; otherwise start building.
  const routeAfterLogin = async (u) => {
    if (u && !u.isDemo) {
      try {
        const existing = await getMyPortfolio(u)
        if (existing && existing.name) {
          saveProfile(existing)
          navigate('/me')
          return
        }
      } catch { /* fall through to build */ }
    }
    navigate('/build')
  }

  // Get started → sign in with Google, then route to their portfolio or build.
  const start = () => {
    if (user) routeAfterLogin(user)
    else setShowLogin(true)
  }

  return (
    <>
      <BuilderNav />
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={(u) => { setShowLogin(false); routeAfterLogin(u) }}
        title="Sign in to get started"
        subtitle="Log in with Google to build and save your portfolio."
      />

      <header className="landing-hero">
        <div className="wrap">
          <span className="kick">// Portfolio Builder</span>
          <h1>Turn your GitHub &amp; LinkedIn<br />into a portfolio — in minutes</h1>
          <p className="hero-desc">
            No design work, no coding. Import your data, customize, and publish a shareable
            developer portfolio (plus a matching CV) for free.
          </p>
          <div className="hero-btns">
            <button onClick={start} className="btn btn-primary">Get started <Icon name="arrowRight" size={15} /></button>
            <Link to="/sadiq" className="btn btn-ghost">See a live example</Link>
          </div>
        </div>
      </header>

      <section style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="landing-steps">
            {STEPS.map((s) => (
              <div className="lstep" key={s.n}>
                <div className="lstep-top"><span className="lstep-n">{s.n}</span><Icon name={s.icon} size={20} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>

          <div className="landing-cta">
            <h2>Ready to build yours?</h2>
            <button onClick={start} className="btn btn-primary">Start now <Icon name="arrowRight" size={15} /></button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
