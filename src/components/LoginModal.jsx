import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { Icon } from './Icons'

export default function LoginModal({ open, onClose, onSuccess, title = 'Sign in to continue', subtitle }) {
  const { signInWithGoogle, signInDemo, configured } = useAuth()
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (!open) return null

  const login = async () => {
    setErr('')
    setBusy(true)
    try {
      await signInWithGoogle()
      onSuccess?.()
    } catch (e) {
      setErr(e.message || 'Sign-in failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {onClose && <button className="modal-x" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>}
        <div className="modal-ic"><Icon name="lock" size={26} /></div>
        <h2>{title}</h2>
        <p>{subtitle || 'Sign in with your Google account to edit and save your portfolio.'}</p>

        {configured ? (
          <button className="modal-google" onClick={login} disabled={busy}>
            <Icon name="google" size={18} /> {busy ? 'Signing in…' : 'Continue with Google'}
          </button>
        ) : (
          <>
            <p className="modal-warn">Login is temporarily unavailable.</p>
            <button className="modal-demo" onClick={() => { signInDemo(); onSuccess?.() }}>
              <Icon name="arrowRight" size={15} /> Continue as demo
            </button>
          </>
        )}

        {err && <p className="modal-err"><Icon name="close" size={13} /> {err}</p>}
      </div>
    </div>
  )
}
