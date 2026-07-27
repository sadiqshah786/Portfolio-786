import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icons'
import AuthButton from '../components/AuthButton'
import LoginModal from '../components/LoginModal'
import StepBar from '../components/StepBar'
import { palettes } from '../data'
import { loadProfile, saveProfile, emptyProfile } from '../lib/store'
import { useAuth } from '../lib/auth'
import { saveToCloud, publicUrl } from '../lib/cloud'
import { exportZip } from '../lib/exporters'

/* ---------- small field helpers ---------- */
function Field({ label, value, onChange, placeholder, full }) {
  return (
    <label className={`ed-field ${full ? 'full' : ''}`}>
      <span>{label}</span>
      <input value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}
function Area({ label, value, onChange, placeholder }) {
  return (
    <label className="ed-field full">
      <span>{label}</span>
      <textarea rows={4} value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export default function Editor() {
  const { user, configured, loading } = useAuth()
  const navigate = useNavigate()

  // Login gate: editing requires a signed-in user (Google when configured,
  // or a demo session otherwise).
  const locked = !loading && !user
  const [p, setP] = useState(() => loadProfile() || emptyProfile())
  const [saved, setSaved] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState('')
  const [publishErr, setPublishErr] = useState('')
  const [exporting, setExporting] = useState(false)

  const doExport = async () => {
    setExporting(true)
    try { await exportZip(p) } finally { setExporting(false) }
  }

  // autosave
  useEffect(() => {
    saveProfile(p)
    setSaved(true)
    const t = setTimeout(() => setSaved(false), 1200)
    return () => clearTimeout(t)
  }, [p])

  const set = (key, val) => setP((x) => ({ ...x, [key]: val }))
  const setSocial = (key, val) => setP((x) => ({ ...x, socials: { ...x.socials, [key]: val } }))

  const addItem = (key, tpl) => setP((x) => ({ ...x, [key]: [...(x[key] || []), tpl] }))
  const removeItem = (key, i) => setP((x) => ({ ...x, [key]: x[key].filter((_, j) => j !== i) }))
  const updateItem = (key, i, field, val) =>
    setP((x) => ({ ...x, [key]: x[key].map((it, j) => (j === i ? { ...it, [field]: val } : it)) }))
  const moveItem = (key, i, dir) =>
    setP((x) => {
      const arr = [...x[key]]
      const ni = i + dir
      if (ni < 0 || ni >= arr.length) return x
      ;[arr[i], arr[ni]] = [arr[ni], arr[i]]
      return { ...x, [key]: arr }
    })

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !p.skills.includes(s)) set('skills', [...p.skills, s])
    setSkillInput('')
  }

  const publish = async () => {
    setPublishErr('')
    if (!configured) { setPublishErr('Firebase not configured yet — add keys in .env'); return }
    if (!user) { setPublishErr('Sign in with Google first (top-right)'); return }
    setPublishing(true)
    try {
      const savedId = localStorage.getItem('cloud-id') || undefined
      const id = await saveToCloud(user, p, savedId)
      localStorage.setItem('cloud-id', id)
      const url = publicUrl(id)
      setPublishedUrl(url)
      await navigator.clipboard.writeText(url).catch(() => {})
    } catch (e) {
      setPublishErr(e.message)
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="editor">
      <LoginModal
        open={locked}
        onClose={() => navigate('/')}
        title="Sign in to edit"
        subtitle="Log in with Google to customize and save your portfolio to the cloud."
      />

      {/* top bar */}
      <div className="ed-bar">
        <div className="ed-bar-l">
          <Link to="/build" className="ed-back"><Icon name="arrowRight" size={14} className="flip" /> Build</Link>
          <span className="ed-title">Portfolio Editor</span>
          <span className={`ed-saved ${saved ? 'on' : ''}`}><Icon name="check" size={12} /> Saved</span>
        </div>
        <div className="ed-bar-r">
          <button className="ed-btn" onClick={doExport} disabled={exporting}>
            <Icon name="external" size={14} /> {exporting ? 'Exporting…' : 'Export code (ZIP)'}
          </button>
          <Link to="/me" className="ed-btn"><Icon name="arrowRight" size={14} /> Preview</Link>
          <button className="ed-btn primary" onClick={publish} disabled={publishing}>
            <Icon name="external" size={14} /> {publishing ? 'Publishing…' : 'Publish & get link'}
          </button>
          <AuthButton />
        </div>
      </div>

      <StepBar current={2} />

      {(publishedUrl || publishErr) && (
        <div className={`ed-publish ${publishErr ? 'err' : ''}`}>
          {publishErr ? (
            <span><Icon name="close" size={14} /> {publishErr}</span>
          ) : (
            <span>
              <Icon name="check" size={14} /> Published &amp; copied! Public link:{' '}
              <a href={publishedUrl} target="_blank" rel="noopener noreferrer">{publishedUrl}</a>
            </span>
          )}
        </div>
      )}

      <div className="ed-body wrap">
        {/* PROFILE */}
        <section className="ed-sec">
          <h2><span className="kick">01</span> Profile</h2>
          <div className="ed-grid">
            <Field label="Full name" value={p.name} onChange={(v) => set('name', v)} placeholder="Sadiq Shah" />
            <Field label="Headline" value={p.headline} onChange={(v) => set('headline', v)} placeholder="Software Engineer · React · Node" />
            <Field label="Location" value={p.location} onChange={(v) => set('location', v)} placeholder="Karachi, Pakistan" />
            <Field label="Avatar URL" value={p.avatar} onChange={(v) => set('avatar', v)} placeholder="https://…/photo.jpg" />
            <Field label="Email" value={p.email} onChange={(v) => set('email', v)} placeholder="you@email.com" />
            <Field label="Phone" value={p.phone} onChange={(v) => set('phone', v)} placeholder="0300 0000000" />
            <Area label="Summary / About" value={p.summary} onChange={(v) => set('summary', v)} placeholder="A short intro about you…" />
          </div>
        </section>

        {/* SOCIALS */}
        <section className="ed-sec">
          <h2><span className="kick">02</span> Links</h2>
          <div className="ed-grid">
            <Field label="GitHub" value={p.socials.github} onChange={(v) => setSocial('github', v)} placeholder="https://github.com/username" />
            <Field label="LinkedIn" value={p.socials.linkedin} onChange={(v) => setSocial('linkedin', v)} placeholder="https://linkedin.com/in/…" />
            <Field label="Twitter / X" value={p.socials.twitter} onChange={(v) => setSocial('twitter', v)} placeholder="https://twitter.com/…" />
            <Field label="Website" value={p.socials.website} onChange={(v) => setSocial('website', v)} placeholder="https://…" />
          </div>
        </section>

        {/* SKILLS */}
        <section className="ed-sec">
          <h2><span className="kick">03</span> Skills</h2>
          <div className="ed-chips">
            {p.skills.map((s, i) => (
              <span className="ed-chip" key={s}>
                {s} <button onClick={() => removeItem('skills', i)} aria-label="remove"><Icon name="close" size={12} /></button>
              </span>
            ))}
          </div>
          <div className="ed-add-row">
            <input
              value={skillInput}
              placeholder="Add a skill and press Enter"
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
            <button className="ed-btn" onClick={addSkill}>Add</button>
          </div>
        </section>

        {/* EXPERIENCE */}
        <ListSection
          title="Experience" num="04" items={p.experience}
          onAdd={() => addItem('experience', { title: '', org: '', period: '', desc: '' })}
          onRemove={(i) => removeItem('experience', i)}
          onMove={(i, d) => moveItem('experience', i, d)}
          render={(it, i) => (
            <>
              <Field label="Role / Title" value={it.title} onChange={(v) => updateItem('experience', i, 'title', v)} />
              <Field label="Company" value={it.org} onChange={(v) => updateItem('experience', i, 'org', v)} />
              <Field label="Period" value={it.period} onChange={(v) => updateItem('experience', i, 'period', v)} placeholder="2023 — Present" />
              <Area label="Description" value={it.desc} onChange={(v) => updateItem('experience', i, 'desc', v)} />
            </>
          )}
        />

        {/* PROJECTS */}
        <ListSection
          title="Projects" num="05" items={p.projects}
          onAdd={() => addItem('projects', { title: '', desc: '', tech: [], live: '', code: '' })}
          onRemove={(i) => removeItem('projects', i)}
          onMove={(i, d) => moveItem('projects', i, d)}
          render={(it, i) => (
            <>
              <Field label="Title" value={it.title} onChange={(v) => updateItem('projects', i, 'title', v)} />
              <Field label="Tech (comma separated)" value={(it.tech || []).join(', ')} onChange={(v) => updateItem('projects', i, 'tech', v.split(',').map((t) => t.trim()).filter(Boolean))} />
              <Field label="Live URL" value={it.live} onChange={(v) => updateItem('projects', i, 'live', v)} placeholder="https://…" />
              <Field label="Code URL" value={it.code} onChange={(v) => updateItem('projects', i, 'code', v)} placeholder="https://github.com/…" />
              <Area label="Description" value={it.desc} onChange={(v) => updateItem('projects', i, 'desc', v)} />
            </>
          )}
        />

        {/* EDUCATION */}
        <ListSection
          title="Education" num="06" items={p.education}
          onAdd={() => addItem('education', { school: '', degree: '', period: '' })}
          onRemove={(i) => removeItem('education', i)}
          onMove={(i, d) => moveItem('education', i, d)}
          render={(it, i) => (
            <>
              <Field label="Degree" value={it.degree} onChange={(v) => updateItem('education', i, 'degree', v)} />
              <Field label="School" value={it.school} onChange={(v) => updateItem('education', i, 'school', v)} />
              <Field label="Period" value={it.period} onChange={(v) => updateItem('education', i, 'period', v)} placeholder="2016 — 2021" />
            </>
          )}
        />

        {/* THEME */}
        <section className="ed-sec">
          <h2><span className="kick">07</span> Theme</h2>
          <div className="ed-themes">
            {palettes.map((t) => (
              <button
                key={t.id}
                className={`ed-theme ${p.theme === t.id ? 'sel' : ''}`}
                style={{ background: `linear-gradient(135deg, ${t.pink}, ${t.coral})` }}
                onClick={() => set('theme', t.id)}
                title={t.name}
              >
                {p.theme === t.id && <Icon name="check" size={16} />}
              </button>
            ))}
          </div>
        </section>

        <div className="ed-footer">
          <Link to="/me" className="btn btn-primary">Preview portfolio <Icon name="arrowRight" size={15} /></Link>
          <button className="btn btn-ghost" onClick={publish} disabled={publishing}>
            {publishing ? 'Publishing…' : 'Publish & get link'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- reusable list section (experience / projects / education) ---------- */
function ListSection({ title, num, items, onAdd, onRemove, onMove, render }) {
  return (
    <section className="ed-sec">
      <h2><span className="kick">{num}</span> {title} <button className="ed-add" onClick={onAdd}><Icon name="plus" size={14} /> Add</button></h2>
      {items.length === 0 && <p className="ed-empty">Nothing yet — click “Add”.</p>}
      {items.map((it, i) => (
        <div className="ed-item" key={i}>
          <div className="ed-item-tools">
            <span className="ed-item-n">#{i + 1}</span>
            <div>
              <button onClick={() => onMove(i, -1)} aria-label="up">↑</button>
              <button onClick={() => onMove(i, 1)} aria-label="down">↓</button>
              <button className="del" onClick={() => onRemove(i)} aria-label="remove"><Icon name="close" size={14} /></button>
            </div>
          </div>
          <div className="ed-grid">{render(it, i)}</div>
        </div>
      ))}
    </section>
  )
}
