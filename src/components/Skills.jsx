import Section from './Section'
import { skillGroups } from '../data'

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="// Tech stack"
      title="Skills & Tools"
      blurb="The technologies I reach for to design, build and ship complete products."
    >
      {skillGroups.map((g) => (
        <div className="term-group" key={g.title}>
          <div className="term-title">{g.title}</div>
          <ul className="term-list">
            {g.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}
