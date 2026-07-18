import { useReveal } from '../hooks'

// Two-column section: sticky-ish heading on the left, content on the right.
export default function Section({ id, kicker, title, blurb, children }) {
  const [ref, shown] = useReveal()
  return (
    <section id={id}>
      <div ref={ref} className={`wrap two-col reveal ${shown ? 'in' : ''}`}>
        <div className="col-head">
          {kicker && <div className="kick">{kicker}</div>}
          <h2>{title}</h2>
          {blurb && <p>{blurb}</p>}
        </div>
        <div className="col-body">{children}</div>
      </div>
    </section>
  )
}
