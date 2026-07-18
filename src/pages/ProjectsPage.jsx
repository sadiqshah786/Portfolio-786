import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { projects, categories } from '../data'

export default function ProjectsPage() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active]
  )

  return (
    <>
      <Navbar />
      <header className="page-head">
        <div className="wrap">
          <div className="kick">// Portfolio</div>
          <h1>All Projects</h1>
          <p className="hero-desc">
            {projects.length} projects across interactive 3D, WebGL and everyday web apps.
          </p>
        </div>
      </header>

      <section style={{ borderBottom: 'none', paddingTop: '40px' }}>
        <div className="wrap">
          <div className="filters">
            {categories.map((c) => {
              const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
              return (
                <button
                  key={c}
                  className={`filter-chip ${active === c ? 'sel' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {c} <span className="fc-count">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="pcard-grid">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
