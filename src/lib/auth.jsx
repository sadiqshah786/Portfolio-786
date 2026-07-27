import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from './firebase'

const AuthContext = createContext(null)
const DEMO_KEY = 'demo-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    // Restore a demo session (used when Firebase isn't configured yet).
    try {
      const demo = localStorage.getItem(DEMO_KEY)
      if (demo) setUser(JSON.parse(demo))
    } catch { /* ignore */ }

    if (!isFirebaseConfigured) return
    return onAuthStateChanged(auth, (u) => {
      if (u) setUser(u)
      else if (!localStorage.getItem(DEMO_KEY)) setUser(null)
      setLoading(false)
    })
  }, [])

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) throw new Error('Firebase is not configured yet')
    const res = await signInWithPopup(auth, googleProvider)
    setUser(res.user)
    return res
  }

  // Demo sign-in — lets you experience the full flow without Firebase.
  const signInDemo = (name = 'Demo User') => {
    const demoUser = { uid: 'demo', displayName: name, email: 'demo@local.app', photoURL: null, isDemo: true }
    localStorage.setItem(DEMO_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
  }

  const signOut = async () => {
    localStorage.removeItem(DEMO_KEY)
    if (isFirebaseConfigured && auth.currentUser) await fbSignOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signInDemo, signOut, configured: isFirebaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
