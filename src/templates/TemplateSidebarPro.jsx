import { useState } from 'react'
import { Icon } from '../components/Icons'
import { grad, shortRole } from './shared'

const NAV = [
  ['home', 'Home', 'home'],
  ['skills', 'Skills', 'zap'],
  ['experience', 'Experience', 'briefcase'],
  ['projects', 'Projects', 'grid'],
  ['education', 'Education', 'book'],
  ['contact', 'Contact', 'mail'],
]

export default function TemplateSidebarPro({ data }) {
  const s = data.socials || {}
  const [active, setActive] = useState('home')
  const initials = (data.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('')
  const scrollTo = (id) => (e) => { e.preventDefault(); setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div className="tpl tpl-spro">
      <aside className="sp-side">
        <div className="sp-brand"><span className="sp-logo">{initials}</span><div><b>{data.name}</b><span>{shortRole(data)}</span></div></div>
        <nav className="sp-nav">
          {NAV.map(([id, label, icon]) => (
            <a key={id} href={`#${id}`} onClick={scrollTo(id)} className={active === id ? 'active' : ''}>
              <Icon name={icon} size={17} /> {label}
            </a>
          ))}
        </nav>
        <div className="sp-side-foot">
          {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={16} /></a>}
          {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16} /></a>}
          {data.email && <a href={`mailto:${data.email}`}><Icon name="mail" size={16} /></a>}
        </div>
      </aside>

      <main className="sp-main">
        <section className="sp-hero" id="home">
          <div className="sp-hero-l">
            <p className="sp-hi">Hi there 👋</p>
            <h1>I'm a <span className="grad">{shortRole(data)}</span> who loves building great products.</h1>
            {data.summary && <p className="sp-sum">{data.summary}</p>}
            <div className="sp-btns">
              <a href="#projects" onClick={scrollTo('projects')} className="btn btn-primary">View My Work</a>
              {data.email && <a href={`mailto:${data.email}`} className="btn btn-ghost">Contact</a>}
            </div>
          </div>
          <div className="sp-hero-r"><div className="sp-code-box"><Icon name="code" size={44} /></div></div>
        </section>

        {data.skills.length > 0 && (
          <section className="sp-sec" id="skills">
            <h2>Skills</h2>
            <div className="sp-chips">{data.skills.map((k) => <span key={k}>{k}</span>)}</div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="sp-sec" id="experience">
            <h2>Experience</h2>
            {data.experience.map((e, i) => (
              <div className="sp-job" key={i}>
                <div className="sp-job-head"><b>{e.title}</b><span>{e.period}</span></div>
                {e.org && <div className="sp-job-org">{e.org}</div>}
                {e.desc && <p>{e.desc}</p>}
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="sp-sec" id="projects">
            <div className="sp-sec-head"><h2>Featured Projects</h2></div>
            <div className="sp-grid">
              {data.projects.map((p, i) => (
                <a key={i} href={p.live || p.code} target="_blank" rel="noopener noreferrer" className="sp-card">
                  <div className="sp-card-img" style={{ background: `linear-gradient(135deg, ${grad(i)[0]}, ${grad(i)[1]})` }} />
                  <div className="sp-card-b">
                    <div className="sp-card-top"><b>{p.title}</b><Icon name="external" size={14} /></div>
                    {p.tech?.length > 0 && <span className="sp-card-tech">{p.tech.join(', ')}</span>}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="sp-sec" id="education">
            <h2>Education</h2>
            {data.education.map((e, i) => (
              <div className="sp-job" key={i}>
                <div className="sp-job-head"><b>{e.degree || e.school}</b><span>{e.period}</span></div>
                {e.school && e.degree && <div className="sp-job-org">{e.school}</div>}
              </div>
            ))}
          </section>
        )}

        <section className="sp-sec" id="contact">
          <h2>Get in touch</h2>
          <div className="sp-links">
            {data.email && <a href={`mailto:${data.email}`}><Icon name="mail" size={16} /> {data.email}</a>}
            {data.phone && <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`}><Icon name="phone" size={16} /> {data.phone}</a>}
          </div>
        </section>
      </main>
    </div>
  )
}
