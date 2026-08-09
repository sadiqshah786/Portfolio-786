import Accordion from '../components/Accordion'
import { Icon } from '../components/Icons'
import { grad, expItems, eduItems, shortRole } from './shared'

export default function TemplateTerminal({ data }) {
  const s = data.socials || {}
  const exp = expItems(data)
  const edu = eduItems(data)

  return (
    <div className="tpl tpl-terminal">
      <header id="top">
        <div className="wrap">
          {data.avatar && <div className="hero-avatar"><img src={data.avatar} alt={data.name} /></div>}
          <h1>{data.name}</h1>
          <div className="hero-role">{data.headline}{data.location ? ` · ${data.location}` : ''}</div>
          {data.summary && <p className="hero-desc">{data.summary}</p>}
          <div className="hero-btns">
            {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="github" size={15} /> GitHub</a>}
            {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="linkedin" size={15} /> LinkedIn</a>}
            {data.email && <a href={`mailto:${data.email}`} className="btn btn-primary"><Icon name="mail" size={15} /> Contact</a>}
          </div>
          <div className="stats">
            <div className="stat"><div className="num">{data.stats?.repos ?? 0}</div><div className="lbl">Repositories</div></div>
            <div className="stat"><div className="num">{data.stats?.followers ?? 0}</div><div className="lbl">Followers</div></div>
            <div className="stat"><div className="num">{exp.length}</div><div className="lbl">Experience</div></div>
            <div className="stat"><div className="num">{data.skills.length}</div><div className="lbl">Skills</div></div>
          </div>
        </div>
      </header>

      {data.skills.length > 0 && (
        <section><div className="wrap two-col">
          <div className="col-head"><div className="kick">// Stack</div><h2>Skills</h2></div>
          <div className="chips">{data.skills.map((sk) => <span className="chip" key={sk}>{sk}</span>)}</div>
        </div></section>
      )}

      {exp.length > 0 && (
        <section><div className="wrap two-col">
          <div className="col-head"><div className="kick">// Career</div><h2>Experience</h2></div>
          <Accordion items={exp} />
        </div></section>
      )}

      {data.projects.length > 0 && (
        <section><div className="wrap two-col">
          <div className="col-head"><div className="kick">// Work</div><h2>Projects</h2></div>
          <div className="pcard-grid">
            {data.projects.map((p, i) => (
              <a key={i} href={p.live || p.code} target="_blank" rel="noopener noreferrer" className="pcard">
                <div className="pcard-thumb" style={{ background: `linear-gradient(135deg, ${grad(i)[0]}, ${grad(i)[1]})` }}>
                  <span className="pcard-mono">{p.title}</span>
                </div>
                <div className="pcard-body">
                  <div className="pcard-top"><h3>{p.title}</h3><span className="pcard-ext"><Icon name="external" size={16} /></span></div>
                  <p>{p.desc}</p>
                  {p.tech?.length > 0 && <div className="ptech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>}
                </div>
              </a>
            ))}
          </div>
        </div></section>
      )}

      {edu.length > 0 && (
        <section><div className="wrap two-col">
          <div className="col-head"><div className="kick">// Learning</div><h2>Education</h2></div>
          <Accordion items={edu} />
        </div></section>
      )}

      <section style={{ borderBottom: 'none' }}><div className="wrap">
        <div className="contact-box">
          <div className="kick">// Get in touch</div>
          <h2>Let's connect</h2>
          <div className="socials">
            {data.email && <a href={`mailto:${data.email}`} className="social"><Icon name="mail" size={16} /> Email</a>}
            {data.phone && <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`} className="social"><Icon name="phone" size={16} /> Call</a>}
            {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="social"><Icon name="github" size={16} /> GitHub</a>}
            {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="social"><Icon name="linkedin" size={16} /> LinkedIn</a>}
            {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" className="social"><Icon name="external" size={16} /> Website</a>}
          </div>
        </div>
      </div></section>
    </div>
  )
}
