import Section from './Section'
import Accordion from './Accordion'
import { education } from '../data'

export default function Education() {
  return (
    <Section id="education" kicker="// Learning" title="Education" blurb="Where I built my foundations.">
      <Accordion items={education} />
    </Section>
  )
}
