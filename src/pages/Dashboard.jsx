import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import Footer from '../components/Footer'
import { Icon } from '../components/Icons'
import { useAuth } from '../lib/auth'
import { getMyPortfolio, publicUrl, deleteMyPortfolio } from '../lib/cloud'
import { saveProfile, clearProfile } from '../lib/store'
import { buildCvHtml, openHtmlInNewTab, exportZip } from '../lib/exporters'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [zipping, setZipping] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
    return <div className="portfolio-loading"><div className="pl-spinner" /><p>Loading your portfolio…</p></div>
  }

  const link = publicUrl(data.slug || data._id)
  const initials = (data.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('')
  const copy = async () => { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const doExport = async () => { setZipping(true); try { await exportZip(data) } finally { setZipping(false) } }
  const doDelete = async () => {
    if (!window.confirm('Delete your portfolio permanently? This removes it from the cloud and frees your URL. You can build a new one afterwards.')) return
    setDeleting(true)
    try { await deleteMyPortfolio(user); clearProfile(); navigate('/build', { replace: true }) }
    catch (e) { alert(e.message || 'Could not delete'); setDeleting(false) }
  }

  const actions = [
    { label: 'Edit portfolio', desc: 'Update content, template & theme', icon: 'lock', btn: 'Edit', onClick: () => navigate('/editor') },
    { label: 'Open live', desc: 'Your public portfolio page', icon: 'external', btn: 'Open', href: link },
    { label: 'Preview', desc: 'View it in the builder', icon: 'grid', btn: 'Preview', onClick: () => navigate('/me') },
    { label: 'Download CV', desc: 'Your CV as a PDF', icon: 'file', btn: 'Download', onClick: () => openHtmlInNewTab(buildCvHtml(data)) },
    { label: 'Export code', desc: 'Portfolio as a ZIP file', icon: 'external', btn: zipping ? 'Zipping…' : 'Export', onClick: doExport },
    { label: 'Delete portfolio', desc: 'Remove it & free your URL', icon: 'close', btn: deleting ? 'Deleting…' : 'Delete', onClick: doDelete, danger: true },
  ]

  return (
    <>
      <BuilderNav />
      <section className="wrap dash">
        <div className="dash-head">
          <div className="dash-avatar">
            {data.avatar ? <img src={data.avatar} alt={data.name} /> : <span>{initials}</span>}
          </div>
          <div className="dash-head-info">
            <div className="dash-kick">// Welcome back</div>
            <h1>{data.name}</h1>
            <p className="dash-sub">Your portfolio is live. Manage it below.</p>
          </div>
          <div className="dash-head-actions">
            <Link to="/editor" className="btn btn-primary"><Icon name="lock" size={15} /> Edit</Link>
            <button onClick={doDelete} className="btn btn-danger" disabled={deleting}>
              <Icon name="close" size={15} /> {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>

        {/* URL bar */}
        <div className="dash-link">
          <span className="dash-url">{link}</span>
          <button onClick={copy} className="dash-copy"><Icon name={copied ? 'check' : 'external'} size={15} /> {copied ? 'Copied!' : 'Copy'}</button>
          <a href={link} target="_blank" rel="noopener noreferrer" className="dash-copy"><Icon name="external" size={15} /> Open</a>
        </div>

        {/* Actions table */}
        <div className="dash-table-wrap">
          <table className="dash-table">
            <tbody>
              {actions.map((a) => (
                <tr key={a.label} className={a.danger ? 'row-danger' : ''}>
                  <td className="dash-act-ic"><span className={a.danger ? 'danger' : ''}><Icon name={a.icon} size={16} /></span></td>
                  <td className="dash-act-label"><b>{a.label}</b><span>{a.desc}</span></td>
                  <td className="dash-act-btn">
                    {a.href ? (
                      <a href={a.href} target="_blank" rel="noopener noreferrer" className={`btn ${a.danger ? 'btn-danger' : 'btn-ghost'}`}>{a.btn}</a>
                    ) : (
                      <button onClick={a.onClick} disabled={deleting && a.danger} className={`btn ${a.danger ? 'btn-danger' : a.label === 'Edit portfolio' ? 'btn-primary' : 'btn-ghost'}`}>{a.btn}</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="dash-note">One account = one portfolio. Edit anytime (URL stays the same) or delete to build a new one.</p>
      </section>
      <Footer />
    </>
  )
}
