import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import StepBar from '../components/StepBar'
import Footer from '../components/Footer'
import { Icon } from '../components/Icons'
import { fetchGithub } from '../lib/github'
import { extractPdfLines } from '../lib/pdf'
import { parseLinkedIn } from '../lib/linkedin'
import { buildProfile } from '../lib/buildProfile'

export default function Build() {
  const navigate = useNavigate()
  const [githubInput, setGithubInput] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f && f.type === 'application/pdf') setPdfFile(f)
    else setError('Please drop a PDF file')
  }

  async function handleBuild() {
    setError('')
    if (!githubInput.trim()) {
      setError('Please add your GitHub username or URL.')
      return
    }
    setStatus('loading')
    try {
      let github = null
      let linkedin = null

      if (githubInput.trim()) {
        github = await fetchGithub(githubInput)
      }
      if (pdfFile) {
        const lines = await extractPdfLines(pdfFile)
        linkedin = parseLinkedIn(lines)
      }

      const profile = buildProfile(github, linkedin, {})
      localStorage.setItem('builder-profile', JSON.stringify(profile))
      setPreview(profile)
      setStatus('done')
    } catch (e) {
      setError(e.message || 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <>
      <BuilderNav />
      <StepBar current={0} />
      <header className="page-head">
        <div className="wrap">
          <div className="kick">// Portfolio Builder</div>
          <h1>Build your portfolio<br />in seconds</h1>
          <p className="hero-desc">
            Drop your LinkedIn PDF and paste your GitHub — we fetch your experience, skills and
            projects, then generate a portfolio like this one.
          </p>
        </div>
      </header>

      <section style={{ borderBottom: 'none', paddingTop: 30 }}>
        <div className="wrap builder">
          <div className="builder-grid">
            {/* GitHub */}
            <div className="build-card">
              <div className="build-num">01</div>
              <h3><Icon name="github" size={18} /> GitHub <span className="req">*</span></h3>
              <p>Your public profile — powers projects, skills &amp; stats.</p>
              <input
                className="build-input"
                placeholder="github.com/username  or  username"
                value={githubInput}
                onChange={(e) => setGithubInput(e.target.value)}
              />
            </div>

            {/* LinkedIn PDF */}
            <div className="build-card">
              <div className="build-num">02</div>
              <h3><Icon name="file" size={18} /> LinkedIn PDF <span className="opt">(optional)</span></h3>
              <p>Export your LinkedIn profile as a PDF, then upload it here:</p>
              <ol className="pdf-steps">
                <li>Open <b>LinkedIn</b> → go to your <b>profile</b></li>
                <li>Click the <b>More</b> button (<b>•••</b>) below your name</li>
                <li>Choose <b>Save to PDF</b> — a file downloads</li>
                <li>Upload that PDF below 👇</li>
              </ol>
              <label
                className={`dropzone ${dragOver ? 'over' : ''} ${pdfFile ? 'has' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                />
                {pdfFile ? (
                  <span className="dz-file"><Icon name="check" size={16} /> {pdfFile.name}</span>
                ) : (
                  <span className="dz-hint"><Icon name="file" size={22} /> Drop PDF or click to browse</span>
                )}
              </label>
            </div>
          </div>

          {error && <div className="build-error"><Icon name="close" size={15} /> {error}</div>}

          <button className="btn btn-primary build-go" onClick={handleBuild} disabled={status === 'loading'}>
            {status === 'loading' ? 'Fetching your data…' : <>Fetch &amp; Build <Icon name="arrowRight" size={15} /></>}
          </button>

          {status === 'done' && preview && (
            <div className="build-preview">
              <div className="bp-head">
                {preview.avatar && <img src={preview.avatar} alt={preview.name} />}
                <div>
                  <h2>{preview.name}</h2>
                  <p className="mono">{preview.headline}</p>
                  {preview.location && <p className="bp-loc">{preview.location}</p>}
                </div>
              </div>

              <div className="bp-stats">
                <div><b>{preview.stats.repos}</b><span>Repos</span></div>
                <div><b>{preview.stats.followers}</b><span>Followers</span></div>
                <div><b>{preview.experience.length}</b><span>Roles</span></div>
                <div><b>{preview.skills.length}</b><span>Skills</span></div>
              </div>

              <div className="bp-cols">
                <div>
                  <h4>Skills detected</h4>
                  <div className="ptech">{preview.skills.map((s) => <span key={s}>{s}</span>)}</div>
                </div>
                <div>
                  <h4>Experience ({preview.experience.length})</h4>
                  <ul className="bp-list">
                    {preview.experience.slice(0, 5).map((e, i) => (
                      <li key={i}><b>{e.title}</b>{e.org ? ` · ${e.org}` : ''} <span>{e.period}</span></li>
                    ))}
                    {!preview.experience.length && <li className="bp-empty">None parsed — you can add these when editing.</li>}
                  </ul>
                  <h4>Projects ({preview.projects.length})</h4>
                  <ul className="bp-list">
                    {preview.projects.slice(0, 5).map((p, i) => (
                      <li key={i}><b>{p.title}</b></li>
                    ))}
                    {!preview.projects.length && <li className="bp-empty">None found.</li>}
                  </ul>
                </div>
              </div>

              <div className="bp-actions">
                <button className="btn btn-primary build-go" onClick={() => navigate('/editor')}>
                  Edit &amp; customize <Icon name="arrowRight" size={15} />
                </button>
                <button className="btn btn-ghost build-go" onClick={() => navigate('/me')}>
                  Preview now
                </button>
              </div>
              <p className="bp-note">Parsed automatically — refine anything in the editor next.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
