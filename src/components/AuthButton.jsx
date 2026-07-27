import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { Icon } from './Icons'

export default function AuthButton() {
  const { user, signInWithGoogle, signOut, configured, loading } = useAuth()
  const [open, setOpen] = useState(false)
  const [err, setErr] = useState('')

  if (loading) return <span className="auth-loading">…</span>

  if (!configured) {
    return (
      <Link to="/setup" className="auth-btn" title="Connect Firebase to enable Google login">
        <Icon name="google" size={15} /> Set up login
      </Link>
    )
  }

  if (!user) {
    return (
      <button
        className="auth-btn"
        onClick={async () => {
          setErr('')
          try { await signInWithGoogle() } catch (e) { setErr(e.message) }
        }}
        title={err}
      >
        <Icon name="google" size={15} /> Sign in with Google
      </button>
    )
  }

  return (
    <div className="auth-user">
      <button className="auth-avatar" onClick={() => setOpen((o) => !o)}>
        {user.photoURL ? <img src={user.photoURL} alt={user.displayName} /> : <span>{(user.displayName || 'U')[0]}</span>}
      </button>
      {open && (
        <div className="auth-menu" onMouseLeave={() => setOpen(false)}>
          <div className="auth-me">
            <b>{user.displayName}</b>
            <span>{user.email}</span>
          </div>
          <button onClick={() => { setOpen(false); signOut() }}>Sign out</button>
        </div>
      )}
    </div>
  )
}
