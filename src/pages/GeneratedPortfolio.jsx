import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion'
import StepBar from '../components/StepBar'
import { Icon } from '../components/Icons'
import { palettes } from '../data'
import { readSharedProfile, loadProfile } from '../lib/store'
import { getFromCloud, saveToCloud, publicUrl } from '../lib/cloud'
import { useAuth } from '../lib/auth'
import { buildCvHtml, openHtmlInNewTab, exportZip } from '../lib/exporters'

const GRADIENTS = [
  ['#3a1c71', '#7b61ff'], ['#0f2027', '#2ee6b6'], ['#8e2de2', '#ffb454'],
  ['#ee4f8b', '#ff6b45'], ['#2e9df0', '#00c6ff'], ['#11998e', '#38ef7d'],
]

export default function GeneratedPortfolio() {
  const { id } = useParams()
  const { user, configured } = useAuth()
  const [data, setData] = useState(null)
  const [shared, setShared] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [publishMsg, setPublishMsg] = useState('')

  useEffect(() => {
    // Cloud portfolio: /p/:id
    if (id) {
      setShared(true)
      getFromCloud(id).then(setData).catch(() => setNotFound(true))
      return
    }
    const fromUrl = readSharedProfile()
    if (fromUrl) { setData(fromUrl); setShared(true); return }
    const local = loadProfile()
    if (local) setData(local)
  }, [id])

  if (notFound) {
    return (
      <section className="wrap" style={{ textAlign: 'center', paddingTop: 80, borderBottom: 'none' }}>
        <h2 className="sec-title" style={{ marginBottom: 20 }}>Portfolio not found</h2>
        <Link to="/" className="btn btn-primary">Build your own <Icon name="arrowRight" size={15} /></Link>
      </section>
    )
  }

  const themeVars = () => {
    const t = palettes.find((x) => x.id === (data?.theme || 'magenta')) || palettes[0]
    return { '--pink': t.pink, '--coral': t.coral, '--teal': t.teal, '--purple': t.purple }
  }
  const downloadCv = () => openHtmlInNewTab(buildCvHtml(data))
  const [zipping, setZipping] = useState(false)
  const doExport = async () => {
    setZipping(true)
    try { await exportZip(data) } finally { setZipping(false) }
  }
  const publish = async () => {
    setPublishMsg('')
    if (!configured) { setPublishMsg('Set up Firebase first (/setup) to publish'); return }
    if (!user) { setPublishMsg('Sign in from the editor to publish'); return }
    setPublishing(true)
    try {
      const savedId = localStorage.getItem('cloud-id') || undefined
      const pid = await saveToCloud(user, data, savedId)
      localStorage.setItem('cloud-id', pid)
      const url = publicUrl(pid)
      setPublishedUrl(url)
      await navigator.clipboard.writeText(url).catch(() => {})
    } catch (e) {
      setPublishMsg(e.message)
    } finally {
      setPublishing(false)
    }
  }

  if (!data) {
    return (
      <section className="wrap" style={{ textAlign: 'center', paddingTop: 80, borderBottom: 'none' }}>
        <h2 className="sec-title" style={{ marginBottom: 20 }}>No portfolio yet</h2>
        <Link to="/build" className="btn btn-primary">Build one now <Icon name="arrowRight" size={15} /></Link>
      </section>
    )
  }

  const s = data.socials || {}
  const expItems = data.experience.map((e) => ({
    tag: e.period || '',
    title: e.org ? `${e.title} · ${e.org}` : e.title,
    desc: e.desc || `${e.title}${e.org ? ' at ' + e.org : ''}.`,
  }))
  const eduItems = data.education.map((e) => ({
    tag: e.period || '',
    title: e.degree || e.school,
    desc: e.school || '',
  }))

  return (
    <div style={themeVars()}>
      <div className="gen-bar">
        <span>{shared ? `${data.name}'s portfolio` : 'Portfolio preview'}</span>
        <span className="gen-actions">
          <button className="gen-rebuild" onClick={downloadCv}><Icon name="file" size={13} /> Download CV</button>
          <button className="gen-rebuild" onClick={doExport} disabled={zipping}>
            <Icon name="external" size={13} /> {zipping ? 'Zipping…' : 'Export ZIP'}
          </button>
          {!shared && (
            <>
              <Link to="/editor" className="gen-rebuild"><Icon name="lock" size={13} /> Edit</Link>
              <Link to="/setup" className="gen-rebuild"><Icon name="google" size={13} /> Setup</Link>
              <button className="gen-rebuild pub" onClick={publish} disabled={publishing}>
                <Icon name="external" size={13} /> {publishing ? 'Publishing…' : 'Publish & Share'}
              </button>
            </>
          )}
        </span>
      </div>

      {!shared && (publishedUrl || publishMsg) && (
        <div className={`ed-publish ${publishMsg ? 'err' : ''}`}>
          {publishMsg ? (
            <span><Icon name="close" size={14} /> {publishMsg}</span>
          ) : (
            <span><Icon name="check" size={14} /> Published &amp; copied! Public link: <a href={publishedUrl} target="_blank" rel="noopener noreferrer">{publishedUrl}</a></span>
          )}
        </div>
      )}

      {!shared && <StepBar current={3} />}

      {/* HERO */}
      <header id="top">
        <div className="wrap">
          {data.avatar && (
            <div className="hero-avatar"><img src={data.avatar} alt={data.name} /></div>
          )}
          <h1>{data.name}</h1>
          <div className="hero-role">{data.headline}{data.location ? ` · ${data.location}` : ''}</div>
          {data.summary && <p className="hero-desc">{data.summary}</p>}
          <div className="hero-btns">
            {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="github" size={15} /> GitHub</a>}
            {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Icon name="linkedin" size={15} /> LinkedIn</a>}
            {data.email && <a href={`mailto:${data.email}`} className="btn btn-primary"><Icon name="mail" size={15} /> Contact</a>}
          </div>
          <div className="stats">
            <div className="stat"><div className="num">{data.stats.repos}</div><div className="lbl">Repositories</div></div>
            <div className="stat"><div className="num">{data.stats.followers}</div><div className="lbl">Followers</div></div>
            <div className="stat"><div className="num">{data.experience.length}</div><div className="lbl">Experience</div></div>
            <div className="stat"><div className="num">{data.skills.length}</div><div className="lbl">Skills</div></div>
          </div>
        </div>
      </header>

      {/* SKILLS */}
      {data.skills.length > 0 && (
        <section>
          <div className="wrap two-col">
            <div className="col-head"><div className="kick">// Stack</div><h2>Skills</h2></div>
            <div className="chips">
              {data.skills.map((sk) => <span className="chip" key={sk}>{sk}</span>)}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {expItems.length > 0 && (
        <section>
          <div className="wrap two-col">
            <div className="col-head"><div className="kick">// Career</div><h2>Experience</h2></div>
            <Accordion items={expItems} />
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects.length > 0 && (
        <section>
          <div className="wrap two-col">
            <div className="col-head"><div className="kick">// Work</div><h2>Projects</h2></div>
            <div className="pcard-grid">
              {data.projects.map((p, i) => (
                <a key={i} href={p.live || p.code} target="_blank" rel="noopener noreferrer" className="pcard">
                  <div className="pcard-thumb" style={{ background: `linear-gradient(135deg, ${GRADIENTS[i % 6][0]}, ${GRADIENTS[i % 6][1]})` }}>
                    <span className="pcard-mono">{p.title}</span>
                  </div>
                  <div className="pcard-body">
                    <div className="pcard-top"><h3>{p.title}</h3><span className="pcard-ext"><Icon name="external" size={16} /></span></div>
                    <p>{p.desc}</p>
                    {p.tech.length > 0 && <div className="ptech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {eduItems.length > 0 && (
        <section>
          <div className="wrap two-col">
            <div className="col-head"><div className="kick">// Learning</div><h2>Education</h2></div>
            <Accordion items={eduItems} />
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="contact-box">
            <div className="kick">// Get in touch</div>
            <h2>Let's connect</h2>
            <div className="socials">
              {data.email && <a href={`mailto:${data.email}`} className="social"><Icon name="mail" size={16} /> Email</a>}
              {data.phone && <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`} className="social"><Icon name="phone" size={16} /> Call</a>}
              {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="social"><Icon name="github" size={16} /> GitHub</a>}
              {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="social"><Icon name="linkedin" size={16} /> LinkedIn</a>}
              {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" className="social"><Icon name="external" size={16} /> Website</a>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
