import { socials, profile } from '../data'
import { useReveal } from '../hooks'
import { Icon } from './Icons'

export default function Contact() {
  const [ref, shown] = useReveal()
  return (
    <section id="contact" style={{ borderBottom: 'none' }}>
      <div ref={ref} className={`wrap reveal ${shown ? 'in' : ''}`}>
        <div className="contact-box">
          <div className="kick">// Let's connect</div>
          <h2>Have a project in mind?</h2>
          <p>I'm open to freelance work, collaborations and full-time opportunities. Let's build something great together.</p>
          <div className="contact-details">
            <a href={`mailto:${profile.email}`} className="cdetail">
              <Icon name="mail" size={16} /> {profile.email}
            </a>
            <a href={`tel:+92${profile.phone.replace(/\D/g, '').replace(/^0/, '')}`} className="cdetail">
              <Icon name="phone" size={16} /> {profile.phone}
            </a>
          </div>
          <a
            href="https://www.linkedin.com/in/sadiq-shah-806937166/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Say Hello <Icon name="arrowRight" size={15} />
          </a>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social">
                <Icon name={s.icon} size={16} /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
