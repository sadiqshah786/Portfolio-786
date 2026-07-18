import Section from './Section'
import Accordion from './Accordion'
import { faqs } from '../data'

export default function Faq() {
  return (
    <Section id="faq" kicker="// Questions" title="FAQs" blurb="Common questions about working with me.">
      <Accordion items={faqs} />
    </Section>
  )
}
