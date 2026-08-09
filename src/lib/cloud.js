import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

const COLLECTION = 'portfolios'

// Each signed-in user gets ONE object in Firestore, keyed by their uid.
// Saving again updates that same object. Returns the document id (= uid).
export async function saveToCloud(user, profile) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
  if (!user) throw new Error('Please sign in first')
  const id = user.uid
  await setDoc(
    doc(db, COLLECTION, id),
    {
      ...profile,
      ownerId: user.uid,
      ownerName: user.displayName || '',
      ownerEmail: user.email || '',
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
  return id
}

// Load the signed-in user's own saved object (or null if they haven't saved yet).
export async function getMyPortfolio(user) {
  if (!isFirebaseConfigured || !user) return null
  const snap = await getDoc(doc(db, COLLECTION, user.uid))
  return snap.exists() ? snap.data() : null
}

// Public read of any user's portfolio by id (= their uid).
export async function getFromCloud(id) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) throw new Error('Portfolio not found')
  return snap.data()
}

export function publicUrl(id) {
  return `${window.location.origin}/p/${id}`
}

// Health-check: attempt a public read to verify Firestore exists + read rules.
export async function testFirestore() {
  if (!isFirebaseConfigured) return { ok: false, code: 'no-config', message: 'No Firebase config yet' }
  try {
    await getDoc(doc(db, COLLECTION, '__healthcheck__'))
    return { ok: true, message: 'Firestore reachable and read rules are correct.' }
  } catch (e) {
    const code = e.code || 'error'
    let message = e.message
    if (code === 'permission-denied') message = 'Firestore is set up, but the rules block reads. Publish the rules from step 4.'
    else if (code === 'unavailable') message = "Can't reach Firestore. Make sure you created the database (step 3)."
    else if (code === 'not-found') message = 'Database not found — create Firestore (step 3).'
    return { ok: false, code, message }
  }
}
