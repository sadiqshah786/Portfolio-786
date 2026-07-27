import { Link } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import Footer from '../components/Footer'
import { Icon } from '../components/Icons'

const STEPS = [
  { n: '01', icon: 'github', title: 'Import', text: 'Paste your GitHub and drop your LinkedIn PDF. We fetch your repos, skills, experience and education automatically.' },
  { n: '02', icon: 'lock', title: 'Customize', text: 'Sign in with Google, then edit every field, add projects, reorder sections and pick a color theme.' },
  { n: '03', icon: 'external', title: 'Publish & Share', text: 'Publish to get a short public link, download your CV as PDF, or export the whole site as a ZIP.' },
]

export default function Landing() {
  return (
    <>
      <BuilderNav />
      <header className="landing-hero">
        <div className="wrap">
          <span className="kick">// Portfolio Builder</span>
          <h1>Turn your GitHub &amp; LinkedIn<br />into a portfolio — in minutes</h1>
          <p className="hero-desc">
            No design work, no coding. Import your data, customize, and publish a shareable
            developer portfolio (plus a matching CV) for free.
          </p>
          <div className="hero-btns">
            <Link to="/build" className="btn btn-primary">Get started <Icon name="arrowRight" size={15} /></Link>
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
            <Link to="/build" className="btn btn-primary">Start now <Icon name="arrowRight" size={15} /></Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
