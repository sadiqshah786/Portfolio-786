import { profile, stats } from '../data'
import { useCountUp } from '../hooks'
import { Icon } from './Icons'
import profileImg from '../profile.jpg'

function Stat({ num, label, plus }) {
  const [ref, value] = useCountUp(num, plus)
  return (
    <div className="stat">
      <div className="num" ref={ref}>{value}</div>
      <div className="lbl">{label}</div>
    </div>
  )
}

export default function Hero() {
  return (
    <header id="top">
      <div className="wrap">
        <div className="hero-avatar">
          <img src={profileImg} alt={profile.name} />
        </div>
        <h1>{profile.name}</h1>
        <div className="hero-role">{profile.role} · {profile.location}</div>
        <div className="hero-headline">{profile.headline}</div>
        <p className="hero-desc">{profile.intro}</p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">View Projects <Icon name="arrowRight" size={15} /></a>
          <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Icon name="file" size={15} /> View CV
          </a>
          <a href="#contact" className="btn btn-ghost">Hire Me</a>
        </div>
        <div className="stats">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </header>
  )
}
