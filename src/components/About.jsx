import Section from './Section'
import { profile, values } from '../data'
import { Icon } from './Icons'
import profileImg from '../profile.jpg'

export default function About() {
  return (
    <Section id="about" kicker="// About" title="Who I Am" blurb="What I bring to every project I take on.">
      <div className="about-body">
        <div className="about-intro">
          <img className="about-photo" src={profileImg} alt={profile.name} />
          <p>{profile.about[0]}</p>
        </div>
        {profile.about.slice(1).map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {values.map((v) => (
          <div className="value-row" key={v.title}>
            <div className="vic"><Icon name={v.icon} size={19} /></div>
            <div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </div>
        ))}

        <div className="highlight-box">
          <h4>Here's what you need to know about working with me</h4>
          <ul>
            <li>Software Engineer at Sofcom × Dax, based in Karachi, Pakistan</li>
            <li>3+ years of front-end experience across 6 companies</li>
            <li>Specialist in React, Next.js, TypeScript &amp; responsive mobile-first design</li>
            <li>1.5 years mentoring students as an Instructor at SMIT</li>
            <li>Open to freelance, contract and full-time opportunities</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
