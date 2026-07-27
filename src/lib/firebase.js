import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Config can come from (1) build-time env vars, or (2) a config the user pastes
// in the in-app /setup page (stored in localStorage). These values are safe to
// expose in the client — security lives in Firestore Rules.
const LS_KEY = 'firebase-config'

function fromEnv() {
  const c = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  return c.apiKey && c.projectId ? c : null
}

function fromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    const c = raw ? JSON.parse(raw) : null
    return c && c.apiKey && c.projectId ? c : null
  } catch {
    return null
  }
}

const cfg = fromEnv() || fromStorage()
export const isFirebaseConfigured = Boolean(cfg)

let auth = null
let db = null
if (isFirebaseConfigured) {
  const app = initializeApp(cfg)
  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db }
export const googleProvider = new GoogleAuthProvider()

// Save a pasted config and (the caller should) reload so Firebase re-initializes.
export function saveFirebaseConfig(obj) {
  localStorage.setItem(LS_KEY, JSON.stringify(obj))
}
export function clearFirebaseConfig() {
  localStorage.removeItem(LS_KEY)
}
export function getStoredConfig() {
  return fromStorage() || {}
}
