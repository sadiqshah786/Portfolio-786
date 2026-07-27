import { doc, setDoc, getDoc, collection, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

const COLLECTION = 'portfolios'

function slug(str) {
  return (str || 'portfolio')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24) || 'portfolio'
}
function shortId() {
  return Math.random().toString(36).slice(2, 8)
}

// Save/update a portfolio for the signed-in user. Returns the document id.
export async function saveToCloud(user, profile, existingId) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
  if (!user) throw new Error('Please sign in first')
  const id = existingId || `${slug(profile.name)}-${shortId()}`
  await setDoc(
    doc(db, COLLECTION, id),
    { ...profile, ownerId: user.uid, ownerName: user.displayName || '', updatedAt: serverTimestamp() },
    { merge: true }
  )
  return id
}

// Public read of a portfolio by id.
export async function getFromCloud(id) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) throw new Error('Portfolio not found')
  return snap.data()
}

// List the signed-in user's portfolios.
export async function listMyPortfolios(user) {
  if (!isFirebaseConfigured || !user) return []
  const q = query(collection(db, COLLECTION), where('ownerId', '==', user.uid), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
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
