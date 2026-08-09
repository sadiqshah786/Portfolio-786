import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import Footer from '../components/Footer'
import { Icon } from '../components/Icons'
import { useAuth } from '../lib/auth'
import { getMyPortfolio, publicUrl } from '../lib/cloud'
import { saveProfile } from '../lib/store'
import { buildCvHtml, openHtmlInNewTab, exportZip } from '../lib/exporters'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [zipping, setZipping] = useState(false)

  useEffect(() => {
    if (!user || user.isDemo) { navigate('/build', { replace: true }); return }
    getMyPortfolio(user)
      .then((p) => {
        if (p && p.name) { saveProfile(p); setData(p); setLoading(false) }
        else navigate('/build', { replace: true })
      })
      .catch(() => navigate('/build', { replace: true }))
  }, [user, navigate])

  if (loading) {
    return (
      <div className="portfolio-loading"><div className="pl-spinner" /><p>Loading your portfolio…</p></div>
    )
  }

  const link = publicUrl(user.uid)
  const initials = (data.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('')
  const copy = async () => { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const doExport = async () => { setZipping(true); try { await exportZip(data) } finally { setZipping(false) } }

  return (
    <>
      <BuilderNav />
      <section className="wrap dash">
        <div className="dash-card">
          <div className="dash-avatar">
            {data.avatar ? <img src={data.avatar} alt={data.name} /> : <span>{initials}</span>}
          </div>
          <div className="dash-kick">// Welcome back</div>
          <h1>{data.name}</h1>
          <p className="dash-sub">Your portfolio is live 🎉 — here's your public link.</p>

          <div className="dash-link">
            <span className="dash-url">{link}</span>
            <button onClick={copy} className="dash-copy">
              <Icon name={copied ? 'check' : 'external'} size={15} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="dash-actions">
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open portfolio <Icon name="external" size={15} />
            </a>
            <Link to="/editor" className="btn btn-ghost"><Icon name="lock" size={15} /> Edit portfolio</Link>
            <Link to="/me" className="btn btn-ghost">Preview</Link>
          </div>

          <div className="dash-tools">
            <button onClick={() => openHtmlInNewTab(buildCvHtml(data))} className="dash-tool"><Icon name="file" size={14} /> Download CV</button>
            <button onClick={doExport} className="dash-tool" disabled={zipping}><Icon name="external" size={14} /> {zipping ? 'Zipping…' : 'Export ZIP'}</button>
          </div>

          <p className="dash-note">One account = one portfolio. You can edit it anytime — your link stays the same.</p>
        </div>
      </section>
      <Footer />
    </>
  )
}
