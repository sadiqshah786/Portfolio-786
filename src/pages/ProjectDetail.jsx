import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Icon } from '../components/Icons'
import { projects } from '../data'

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug)

  if (!p) {
    return (
      <>
        <Navbar />
        <section className="wrap" style={{ textAlign: 'center', borderBottom: 'none' }}>
          <h2 className="col-head" style={{ marginBottom: 20 }}>Project not found</h2>
          <Link to="/projects" className="btn btn-primary">Back to projects</Link>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="wrap detail">
        <Link to="/projects" className="back-link">
          <Icon name="arrowRight" size={15} className="flip" /> Back to projects
        </Link>

        <div className="detail-head">
          <div className="kick">{p.category}</div>
          <h1>{p.title}</h1>
          <p className="hero-desc" style={{ margin: '16px 0 0' }}>{p.desc}</p>
          <div className="hero-btns" style={{ justifyContent: 'flex-start', marginTop: 26 }}>
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Demo <Icon name="external" size={15} />
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View Code <Icon name="github" size={15} />
              </a>
            )}
          </div>
        </div>

        <div
          className="detail-hero"
          style={{ background: `linear-gradient(135deg, ${p.thumb[0]}, ${p.thumb[1]})` }}
        >
          <span className="pcard-mono">{p.title}</span>
        </div>

        <div className="detail-grid">
          <div className="detail-about">
            <div className="term-title" style={{ marginBottom: 18 }}>About this project</div>
            {p.longDesc.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {p.features?.length > 0 && (
              <>
                <div className="term-title" style={{ margin: '30px 0 16px' }}>Key features</div>
                <ul className="feature-list">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="detail-side">
            <div className="term-title">Tech stack</div>
            <div className="side-tech">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary side-btn">
                Open Live Site <Icon name="external" size={15} />
              </a>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </>
  )
}
