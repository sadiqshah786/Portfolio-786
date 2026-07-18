import Section from './Section'
import Accordion from './Accordion'
import { experience } from '../data'

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="// Career"
      title="Experience"
      blurb="From Frontend Developer to Senior Software Engineer across 6 companies since 2020."
    >
      <Accordion items={experience} />
    </Section>
  )
}
