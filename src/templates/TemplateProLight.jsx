import { Icon } from '../components/Icons'
import { shortRole } from './shared'
import TemplateSections from './TemplateSections'

export default function TemplateProLight({ data }) {
  const s = data.socials || {}
  const st = data.stats || {}
  const initials = (data.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <div className="tpl tpl-pro">
      <header className="pro-hero">
        <div className="wrap pro-hero-in">
          <div className="pro-l">
            <p className="pro-eyebrow">Hello, I'm</p>
            <h1>{data.name}</h1>
            <h2 className="pro-role">{shortRole(data)}</h2>
            {data.summary && <p className="pro-sum">{data.summary}</p>}
            <div className="pro-btns">
              <a href="#projects" className="btn btn-primary">Explore Projects</a>
              {data.email && <a href={`mailto:${data.email}`} className="btn btn-ghost">Contact</a>}
            </div>
            <div className="pro-social">
              {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} /></a>}
              {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} /></a>}
            </div>
          </div>
          <div className="pro-r">
            <div className="pro-photo">
              {data.avatar ? <img src={data.avatar} alt={data.name} /> : <span className="pro-initials">{initials}</span>}
            </div>
            <div className="pro-badge pro-badge-1"><b>{st.repos ?? 0}+</b><span>Repositories</span></div>
            <div className="pro-badge pro-badge-2"><b>{data.projects.length}+</b><span>Projects</span></div>
            <div className="pro-code"><Icon name="code" size={22} /></div>
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="wrap pro-stack">
            <span className="pro-stack-label">Tech Stack</span>
            <div className="pro-stack-row">
              {data.skills.slice(0, 8).map((k) => <span key={k}>{k}</span>)}
            </div>
          </div>
        )}
      </header>

      <div className="wrap"><TemplateSections data={data} /></div>
    </div>
  )
}
