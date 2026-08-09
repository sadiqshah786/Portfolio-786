import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { Icon } from './Icons'

export default function AuthButton() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  // Login happens via the "Get started" modal, so the header only shows the
  // user icon + sign-out once a user is signed in.
  if (!user) return null

  return (
    <div className="auth-user">
      <button className="auth-avatar" onClick={() => setOpen((o) => !o)} title={user.displayName || 'Account'}>
        {user.photoURL ? <img src={user.photoURL} alt={user.displayName} /> : <span>{(user.displayName || 'U')[0]}</span>}
      </button>
      {open && (
        <div className="auth-menu" onMouseLeave={() => setOpen(false)}>
          <div className="auth-me">
            <b>{user.displayName || 'Signed in'}</b>
            <span>{user.email}</span>
          </div>
          <button onClick={() => { setOpen(false); signOut() }}>
            <Icon name="close" size={13} /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}
