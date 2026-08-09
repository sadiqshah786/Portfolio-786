import { Icon } from '../components/Icons'
import { grad, shortRole } from './shared'

// Shared body sections used by several templates. `light` switches to a
// light-theme colour set. Heroes are defined per-template.
export default function TemplateSections({ data, light }) {
  const s = data.socials || {}
  return (
    <div className={`tsec ${light ? 'tsec-light' : ''}`}>
      {data.skills.length > 0 && (
        <section className="ts-block" id="skills">
          <h2>Skills</h2>
          <div className="ts-chips">{data.skills.map((k) => <span key={k}>{k}</span>)}</div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="ts-block" id="experience">
          <h2>Experience</h2>
          <div className="ts-timeline">
            {data.experience.map((e, i) => (
              <div className="ts-tl" key={i}>
                <span className="ts-dot" />
                <div className="ts-tl-head"><b>{e.title}</b><span>{e.period}</span></div>
                {e.org && <div className="ts-org">{e.org}</div>}
                {e.desc && <p>{e.desc}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="ts-block" id="projects">
          <h2>Projects</h2>
          <div className="ts-grid">
            {data.projects.map((p, i) => (
              <a key={i} href={p.live || p.code} target="_blank" rel="noopener noreferrer" className="ts-card">
                <div className="ts-card-img" style={{ background: `linear-gradient(135deg, ${grad(i)[0]}, ${grad(i)[1]})` }}>
                  <span>{p.title}</span>
                </div>
                <div className="ts-card-body">
                  <div className="ts-card-top"><b>{p.title}</b><Icon name="external" size={15} /></div>
                  <p>{p.desc}</p>
                  {p.tech?.length > 0 && <div className="ts-tech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="ts-block" id="education">
          <h2>Education</h2>
          {data.education.map((e, i) => (
            <div className="ts-edu" key={i}>
              <div><b>{e.degree || e.school}</b>{e.school && e.degree && <span> · {e.school}</span>}</div>
              <span className="ts-edu-date">{e.period}</span>
            </div>
          ))}
        </section>
      )}

      <section className="ts-block ts-contact" id="contact">
        <h2>Get in touch</h2>
        <div className="ts-links">
          {data.email && <a href={`mailto:${data.email}`}><Icon name="mail" size={16} /> Email</a>}
          {data.phone && <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`}><Icon name="phone" size={16} /> Call</a>}
          {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={16} /> GitHub</a>}
          {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16} /> LinkedIn</a>}
          {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer"><Icon name="external" size={16} /> Website</a>}
        </div>
      </section>
    </div>
  )
}

// Reused code-editor mockup for the dark developer templates.
export function CodeMock({ data }) {
  const skills = (data.skills || []).slice(0, 3).map((s) => `'${s}'`).join(', ')
  return (
    <div className="code-mock">
      <div className="cm-bar"><span /><span /><span /></div>
      <pre className="cm-body">
        <span className="c-key">const</span> <span className="c-var">developer</span> = {'{'}{'\n'}
        {'  '}name: <span className="c-str">'{data.name}'</span>,{'\n'}
        {'  '}role: <span className="c-str">'{shortRole(data)}'</span>,{'\n'}
        {'  '}skills: [<span className="c-str">{skills}</span>],{'\n'}
        {'  '}passion: <span className="c-str">'Building products people love'</span>,{'\n'}
        {'}'};{'\n'}{'\n'}
        <span className="c-fn">console</span>.<span className="c-fn">log</span>(<span className="c-str">'Let's build something amazing 🚀'</span>);
      </pre>
    </div>
  )
}
