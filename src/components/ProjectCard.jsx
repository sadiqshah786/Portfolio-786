import { Icon } from './Icons'

export default function ProjectCard({ p }) {
  const url = p.live || p.code
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="pcard">
      <div className="pcard-thumb" style={{ background: `linear-gradient(135deg, ${p.thumb[0]}, ${p.thumb[1]})` }}>
        <span className="pcard-cat">{p.category}</span>
        <span className="pcard-mono">{p.title}</span>
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <h3>{p.title}</h3>
          <span className="pcard-ext" aria-hidden="true">
            <Icon name="external" size={17} />
          </span>
        </div>
        <p>{p.desc}</p>
        <div className="ptech">
          {p.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </a>
  )
}
