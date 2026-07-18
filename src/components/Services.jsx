import Section from './Section'
import Accordion from './Accordion'
import { services } from '../data'

export default function Services() {
  return (
    <Section
      id="services"
      kicker="// What I offer"
      title="Services"
      blurb="Ways I can help you build and ship your product."
    >
      <Accordion items={services} />
    </Section>
  )
}
