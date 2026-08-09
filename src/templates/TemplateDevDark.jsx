import { Icon } from '../components/Icons'
import { shortRole } from './shared'
import TemplateSections, { CodeMock } from './TemplateSections'

export default function TemplateDevDark({ data }) {
  const s = data.socials || {}
  const st = data.stats || {}
  return (
    <div className="tpl tpl-dev">
      <header className="dev-hero">
        <div className="wrap dev-hero-in">
          <div className="dev-hero-l">
            <p className="dev-hi">Hi, I'm {data.name}</p>
            <h1>I'm a <span className="grad">{shortRole(data)}</span> building great products</h1>
            {data.summary && <p className="dev-sum">{data.summary}</p>}
            <div className="dev-btns">
              {(s.github || data.projects.length > 0) && <a href="#projects" className="btn btn-primary">View Projects</a>}
              {data.email && <a href={`mailto:${data.email}`} className="btn btn-ghost">Contact</a>}
            </div>
            <div className="dev-social">
              {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} /></a>}
              {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} /></a>}
              {s.twitter && <a href={s.twitter} target="_blank" rel="noopener noreferrer"><Icon name="twitter" size={18} /></a>}
            </div>
          </div>
          <div className="dev-hero-r">
            <CodeMock data={data} />
          </div>
        </div>

        <div className="wrap">
          <div className="dev-stats">
            <div><b>{st.repos ?? 0}+</b><span>Repositories</span></div>
            <div><b>{data.projects.length}+</b><span>Projects</span></div>
            <div><b>{st.followers ?? 0}+</b><span>Followers</span></div>
            <div><b>{data.skills.length}</b><span>Skills</span></div>
          </div>
        </div>
      </header>

      <div className="wrap"><TemplateSections data={data} /></div>
    </div>
  )
}
