import { Link } from 'react-router-dom'
import Section from './Section'
import ProjectCard from './ProjectCard'
import { Icon } from './Icons'
import { projects } from '../data'

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  return (
    <Section
      id="projects"
      kicker="// Selected work"
      title="Projects"
      blurb="Interactive 3D & WebGL, WordPress e-commerce and web apps. Click any card for the full case study."
    >
      <div className="pcard-grid">
        {featured.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
      <Link to="/projects" className="btn btn-primary view-all">
        View all projects <Icon name="arrowRight" size={15} />
      </Link>
    </Section>
  )
}
