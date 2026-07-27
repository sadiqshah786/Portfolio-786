import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuilderNav from '../components/BuilderNav'
import StepBar from '../components/StepBar'
import { Icon } from '../components/Icons'
import { saveFirebaseConfig, getStoredConfig, isFirebaseConfigured } from '../lib/firebase'
import { testFirestore } from '../lib/cloud'
import { useAuth } from '../lib/auth'

const FIELDS = [
  ['apiKey', 'apiKey', 'AIza…'],
  ['authDomain', 'authDomain', 'your-app.firebaseapp.com'],
  ['projectId', 'projectId', 'your-app'],
  ['storageBucket', 'storageBucket', 'your-app.appspot.com'],
  ['messagingSenderId', 'messagingSenderId', '1234567890'],
  ['appId', 'appId', '1:123:web:abc'],
]

const RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolios/{id} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.ownerId;
    }
  }
}`

function parsePasted(text) {
  const out = {}
  FIELDS.forEach(([key]) => {
    const m = text.match(new RegExp(`${key}\\s*[:=]\\s*["'\\\`]([^"'\\\`]+)["'\\\`]`))
    if (m) out[key] = m[1]
  })
  return out
}
function envName(k) {
  return { apiKey: 'API_KEY', authDomain: 'AUTH_DOMAIN', projectId: 'PROJECT_ID', storageBucket: 'STORAGE_BUCKET', messagingSenderId: 'SENDER_ID', appId: 'APP_ID' }[k]
}
function blank() { return { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' } }

function Copy({ text, label = 'Copy' }) {
  const [d, setD] = useState(false)
  return (
    <button className="copy-btn" onClick={async () => { await navigator.clipboard.writeText(text); setD(true); setTimeout(() => setD(false), 1500) }}>
      <Icon name={d ? 'check' : 'file'} size={13} /> {d ? 'Copied!' : label}
    </button>
  )
}

// A single numbered step in the vertical guide.
function Step({ n, title, children, done }) {
  return (
    <div className={`vstep ${done ? 'done' : ''}`}>
      <div className="vstep-num">{done ? <Icon name="check" size={16} /> : n}</div>
      <div className="vstep-body">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default function FirebaseSetup() {
  const navigate = useNavigate()
  const { signInWithGoogle, user } = useAuth()
  const [cfg, setCfg] = useState(() => ({ ...blank(), ...getStoredConfig() }))
  const [paste, setPaste] = useState('')
  const [done, setDone] = useState(false)
  const [fsCheck, setFsCheck] = useState(null)
  const [authCheck, setAuthCheck] = useState(null)

  const setField = (k, v) => setCfg((c) => ({ ...c, [k]: v }))
  const applyPaste = () => {
    const parsed = parsePasted(paste)
    if (Object.keys(parsed).length) setCfg((c) => ({ ...c, ...parsed }))
  }
  const canSave = cfg.apiKey && cfg.projectId
  const save = () => { saveFirebaseConfig(cfg); setDone(true); setTimeout(() => { window.location.href = '/setup' }, 700) }

  const runFs = async () => { setFsCheck({ loading: true }); setFsCheck(await testFirestore()) }
  const runAuth = async () => {
    setAuthCheck({ loading: true })
    try { await signInWithGoogle(); setAuthCheck({ ok: true, message: 'Google login works — you are signed in.' }) }
    catch (e) {
      let m = e.message
      if (e.code === 'auth/operation-not-allowed') m = 'Google provider is NOT enabled yet (step 2).'
      else if (e.code === 'auth/unauthorized-domain') m = 'This domain is not authorized (step 5).'
      else if (e.code === 'auth/popup-closed-by-user') m = 'Popup closed before finishing.'
      setAuthCheck({ ok: false, message: m })
    }
  }

  const envText = FIELDS.map(([k]) => `VITE_FIREBASE_${envName(k)}=${cfg[k] || ''}`).join('\n')
  const projectId = cfg.projectId || 'your-project-id'
  const deployCmds = `npm install -g firebase-tools\nfirebase login\nfirebase use ${projectId}\nnpm run deploy`
  const liveUrl = `https://${projectId}.web.app`

  return (
    <>
      <BuilderNav />
      <StepBar current={1} />
      <header className="page-head">
        <div className="wrap">
          <div className="kick">// Connect Google Login &amp; Cloud Save</div>
          <h1>Firebase setup</h1>
          <p className="hero-desc">Follow the steps in order. {isFirebaseConfigured
            ? <span style={{ color: 'var(--teal)' }}>Config connected ✓</span>
            : <span style={{ color: 'var(--yellow)' }}>Not connected yet — do step 6.</span>}</p>
        </div>
      </header>

      <section style={{ borderBottom: 'none' }}>
        <div className="wrap setup">
          <div className="vsteps">

            <Step n="1" title="Create a Firebase project">
              <ul className="sub">
                <li>Open the Firebase console.</li>
                <li>Click <b>Add project</b> → give it a name → Continue.</li>
                <li>Analytics is optional → <b>Create project</b>.</li>
              </ul>
              <a className="guide-link" href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Open Firebase Console <Icon name="external" size={13} /></a>
            </Step>

            <Step n="2" title="Enable Google sign-in (Auth provider)" done={authCheck?.ok}>
              <ul className="sub">
                <li>Left menu → <b>Build → Authentication → Get started</b>.</li>
                <li>Open the <b>Sign-in method</b> tab → click <b>Google</b>.</li>
                <li>Toggle <b>Enable</b> → choose a support email → <b>Save</b>.</li>
              </ul>
              <div className="check-row">
                <a className="guide-link" href="https://console.firebase.google.com/project/_/authentication/providers" target="_blank" rel="noopener noreferrer">Open Authentication <Icon name="external" size={13} /></a>
                <button className="check-btn" onClick={runAuth} disabled={!isFirebaseConfigured}>Test Google login</button>
              </div>
              {authCheck && !authCheck.loading && (
                <div className={`check-res ${authCheck.ok ? 'ok' : 'bad'}`}>
                  <Icon name={authCheck.ok ? 'check' : 'close'} size={13} /> {authCheck.message}
                </div>
              )}
            </Step>

            <Step n="3" title="Create the Firestore database" done={fsCheck?.ok}>
              <ul className="sub">
                <li><b>Build → Firestore Database → Create database</b>.</li>
                <li>Choose <b>Production mode</b> → Next.</li>
                <li>Pick a location (closest region) → <b>Enable</b>.</li>
              </ul>
              <div className="check-row">
                <a className="guide-link" href="https://console.firebase.google.com/project/_/firestore" target="_blank" rel="noopener noreferrer">Open Firestore <Icon name="external" size={13} /></a>
                <button className="check-btn" onClick={runFs} disabled={!isFirebaseConfigured}>Test Firestore</button>
              </div>
              {fsCheck && !fsCheck.loading && (
                <div className={`check-res ${fsCheck.ok ? 'ok' : 'bad'}`}>
                  <Icon name={fsCheck.ok ? 'check' : 'close'} size={13} /> {fsCheck.message}
                </div>
              )}
            </Step>

            <Step n="4" title="Publish the security rules">
              <ul className="sub">
                <li>In Firestore, open the <b>Rules</b> tab.</li>
                <li>Replace everything with the rules below → <b>Publish</b>.</li>
              </ul>
              <div className="code-block">
                <div className="code-head"><span>Firestore rules</span><Copy text={RULES} /></div>
                <pre>{RULES}</pre>
              </div>
              <ul className="sub" style={{ marginTop: 12 }}>
                <li><b>read: true</b> → anyone can view a published portfolio (<code>/p/&lt;id&gt;</code>).</li>
                <li><b>create: signed-in</b> → only logged-in users can save.</li>
                <li><b>update/delete: owner only</b> → no one can edit someone else's.</li>
              </ul>
            </Step>

            <Step n="5" title="Add authorized domains">
              <ul className="sub">
                <li><b>Authentication → Settings → Authorized domains</b>.</li>
                <li><code>localhost</code> is already there (local testing).</li>
                <li>After deploying, <b>Add domain</b> → your live URL (e.g. <code>your-site.netlify.app</code>).</li>
              </ul>
              <a className="guide-link" href="https://console.firebase.google.com/project/_/authentication/settings" target="_blank" rel="noopener noreferrer">Open Auth settings <Icon name="external" size={13} /></a>
            </Step>

            <Step n="6" title="Connect your config to this app" done={isFirebaseConfigured}>
              <ul className="sub">
                <li>Project <b>Settings ⚙ → Your apps → Web (&lt;/&gt;)</b> → register an app.</li>
                <li>Copy the <b>firebaseConfig</b> object and paste it below.</li>
              </ul>
              <label className="ed-field full">
                <span>Paste firebaseConfig snippet</span>
                <textarea rows={5} placeholder={'const firebaseConfig = {\n  apiKey: "AIza…",\n  projectId: "…",\n  …\n};'} value={paste} onChange={(e) => setPaste(e.target.value)} />
              </label>
              <button className="ed-btn" onClick={applyPaste} style={{ marginBottom: 18 }}><Icon name="arrowRight" size={14} /> Auto-fill fields</button>
              <div className="ed-grid">
                {FIELDS.map(([key, label, ph]) => (
                  <label className="ed-field" key={key}><span>{label}</span>
                    <input value={cfg[key] || ''} placeholder={ph} onChange={(e) => setField(key, e.target.value)} /></label>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={save} disabled={!canSave || done}>
                {done ? 'Saved — reloading…' : <>Save &amp; connect <Icon name="check" size={15} /></>}
              </button>
            </Step>

            <Step n="7" title="Deploy to Firebase Hosting">
              <ul className="sub">
                <li>Create a <code>.env</code> file in the project root with your config (so the build includes it):</li>
              </ul>
              <div className="code-block">
                <div className="code-head"><span>.env</span><Copy text={envText} /></div>
                <pre>{envText}</pre>
              </div>
              <ul className="sub" style={{ marginTop: 14 }}>
                <li>Then run these commands — it deploys to <b>your</b> project (<code>{projectId}</code>):</li>
              </ul>
              <div className="code-block">
                <div className="code-head"><span>terminal</span><Copy text={deployCmds} /></div>
                <pre>{deployCmds}</pre>
              </div>
              <div className="check-res ok" style={{ marginTop: 14 }}>
                <Icon name="external" size={13} /> Live at:&nbsp;<a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>{liveUrl}</a>
              </div>
              <ul className="sub" style={{ marginTop: 12 }}>
                <li>Also add that domain (<code>{projectId}.web.app</code>) in <b>Authorized domains</b> (step 5).</li>
              </ul>
            </Step>

          </div>

          <div className="setup-actions">
            <button className="btn btn-ghost" onClick={() => navigate('/editor')}>Back to editor</button>
          </div>
        </div>
      </section>
    </>
  )
}
