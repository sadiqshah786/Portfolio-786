import { Icon } from '../components/Icons'
import TemplateSections, { CodeMock } from './TemplateSections'

const FEATURES = [
  ['code', 'Clean Code', 'Maintainable & scalable code.'],
  ['external', 'Responsive', 'Perfect on every device.'],
  ['zap', 'Performance', 'Optimized for speed.'],
  ['users', 'User Focused', 'Products people love.'],
]

export default function TemplateDigital({ data }) {
  const s = data.socials || {}
  return (
    <div className="tpl tpl-digital">
      <header className="dg-hero">
        <div className="wrap dg-hero-in">
          <div className="dg-l">
            <span className="dg-badge">● Available for new projects</span>
            <h1>Crafting Digital<br />Experiences <span className="grad">That Matter.</span></h1>
            {data.summary && <p className="dg-sum">{data.summary}</p>}
            <div className="dg-btns">
              <a href="#projects" className="btn btn-primary">See My Work</a>
              {data.email && <a href={`mailto:${data.email}`} className="btn btn-ghost">Get In Touch</a>}
            </div>
            <div className="dg-social">
              {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={18} /></a>}
              {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} /></a>}
            </div>
          </div>
          <div className="dg-r"><CodeMock data={data} /></div>
        </div>

        <div className="wrap dg-features">
          {FEATURES.map(([ic, t, d]) => (
            <div className="dg-feature" key={t}>
              <span className="dg-fic"><Icon name={ic} size={18} /></span>
              <b>{t}</b><span>{d}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="wrap"><TemplateSections data={data} /></div>
    </div>
  )
}
