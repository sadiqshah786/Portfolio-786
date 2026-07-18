import { Link } from 'react-router-dom'
import { Icon } from './Icons'

export default function ProjectCard({ p }) {
  const url = p.live || p.code
  // Open the live site in a new window without triggering the card's detail link.
  const openLive = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }
  return (
    <Link to={`/projects/${p.slug}`} className="pcard">
      <div className="pcard-thumb" style={{ background: `linear-gradient(135deg, ${p.thumb[0]}, ${p.thumb[1]})` }}>
        <span className="pcard-cat">{p.category}</span>
        <span className="pcard-mono">{p.title}</span>
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <h3>{p.title}</h3>
          <button className="pcard-ext" onClick={openLive} aria-label={`Open ${p.title} live site`} title="Open live site">
            <Icon name="external" size={17} />
          </button>
        </div>
        <p>{p.desc}</p>
        <div className="ptech">
          {p.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
