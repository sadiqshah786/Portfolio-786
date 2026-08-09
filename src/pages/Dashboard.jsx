import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import Footer from '../components/Footer'
import { Icon } from '../components/Icons'
import { useAuth } from '../lib/auth'
import { getMyPortfolio, publicUrl, deleteMyPortfolio } from '../lib/cloud'
import { saveProfile, clearProfile } from '../lib/store'
import { buildCvHtml, openHtmlInNewTab, exportZip } from '../lib/exporters'
import { getTemplate } from '../templates'

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

  const rows = [
    ['Name', data.name],
    ['Headline', data.headline || '—'],
    ['Template', getTemplate(data.template).name],
    ['Skills', data.skills?.length || 0],
    ['Projects', data.projects?.length || 0],
    ['Experience', data.experience?.length || 0],
    ['Status', <span className="dash-status" key="s"><Icon name="check" size={13} /> Published</span>],
  ]

  return (
    <>
      <BuilderNav />
      <section className="wrap dash">
        <div className="dash-head">
          <div className="dash-avatar">
            {data.avatar ? <img src={data.avatar} alt={data.name} /> : <span>{initials}</span>}
          </div>
          <div>
            <div className="dash-kick">// Welcome back</div>
            <h1>{data.name}</h1>
            <p className="dash-sub">Your portfolio is live. Manage it below.</p>
          </div>
        </div>

        {/* URL bar */}
        <div className="dash-link">
          <span className="dash-url">{link}</span>
          <button onClick={copy} className="dash-copy"><Icon name={copied ? 'check' : 'external'} size={15} /> {copied ? 'Copied!' : 'Copy'}</button>
          <a href={link} target="_blank" rel="noopener noreferrer" className="dash-copy"><Icon name="external" size={15} /> Open</a>
        </div>

        {/* Details table */}
        <div className="dash-table-wrap">
          <table className="dash-table">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}><th>{k}</th><td>{v}</td></tr>
              ))}
              <tr>
                <th>Public URL</th>
                <td><a href={link} target="_blank" rel="noopener noreferrer" className="dash-tlink">{link}</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="dash-actions">
          <Link to="/editor" className="btn btn-primary"><Icon name="lock" size={15} /> Edit</Link>
          <Link to="/me" className="btn btn-ghost">Preview</Link>
          <button onClick={() => openHtmlInNewTab(buildCvHtml(data))} className="btn btn-ghost"><Icon name="file" size={15} /> CV</button>
          <button onClick={doExport} className="btn btn-ghost" disabled={zipping}>{zipping ? 'Zipping…' : 'Export ZIP'}</button>
          <button onClick={doDelete} className="btn btn-danger" disabled={deleting}><Icon name="close" size={15} /> {deleting ? 'Deleting…' : 'Delete'}</button>
        </div>

        <p className="dash-note">One account = one portfolio. Edit anytime (URL stays the same) or delete to build a new one.</p>
      </section>
      <Footer />
    </>
  )
}
