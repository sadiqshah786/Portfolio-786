import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StepBar from '../components/StepBar'
import { Icon } from '../components/Icons'
import { palettes } from '../data'
import { readSharedProfile, loadProfile, saveProfile } from '../lib/store'
import { getFromCloud, saveToCloud, publicUrl } from '../lib/cloud'
import { useAuth } from '../lib/auth'
import { buildCvHtml, openHtmlInNewTab, exportZip } from '../lib/exporters'
import { getTemplate, TEMPLATES } from '../templates'

export default function GeneratedPortfolio() {
  const { id } = useParams()
  const { user, configured } = useAuth()
  const [data, setData] = useState(null)
  const [shared, setShared] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [publishMsg, setPublishMsg] = useState('')
  const [zipping, setZipping] = useState(false)
  const [loadingCloud, setLoadingCloud] = useState(!!id)

  useEffect(() => {
    if (id) {
      setShared(true)
      setLoadingCloud(true)
      getFromCloud(id)
        .then((d) => { setData(d); setLoadingCloud(false) })
        .catch(() => { setNotFound(true); setLoadingCloud(false) })
      return
    }
    const fromUrl = readSharedProfile()
    if (fromUrl) { setData(fromUrl); setShared(true); return }
    const local = loadProfile()
    if (local) setData(local)
  }, [id])

  if (loadingCloud) {
    return (
      <div className="portfolio-loading">
        <div className="pl-spinner" />
        <p>Loading portfolio…</p>
      </div>
    )
  }

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
  const changeTemplate = (id) => {
    const next = { ...data, template: id }
    setData(next)
    saveProfile(next)
  }
  const downloadCv = () => openHtmlInNewTab(buildCvHtml(data))
  const doExport = async () => {
    setZipping(true)
    try { await exportZip(data) } finally { setZipping(false) }
  }
  const publish = async () => {
    setPublishMsg('')
    if (!configured) { setPublishMsg('Login is not available right now'); return }
    if (!user) { setPublishMsg('Sign in from the editor to publish'); return }
    setPublishing(true)
    try {
      const pid = await saveToCloud(user, data)
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

  const Template = getTemplate(data.template).Component

  return (
    <div style={{ ...themeVars(), background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
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

      {!shared && <StepBar current={2} />}

      {!shared && (
        <div className="tpl-switch">
          <span className="tpl-switch-label">Template</span>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={(data.template || 'dev') === t.id ? 'sel' : ''}
              onClick={() => changeTemplate(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}

      <Template data={data} />
    </div>
  )
}
