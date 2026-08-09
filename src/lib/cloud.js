import { doc, setDoc, getDoc, deleteDoc, collection, query, where, limit, getDocs, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

const COLLECTION = 'portfolios'

export function slugify(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

// Find the signed-in user's existing portfolio (or null). Keyed by ownerId so
// each Google account has exactly one, regardless of its URL slug.
export async function getMyPortfolio(user) {
  if (!isFirebaseConfigured || !user) return null
  const q = query(collection(db, COLLECTION), where('ownerId', '==', user.uid), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { ...d.data(), _id: d.id }
}

// Save/update the user's portfolio under a readable username (slug). Returns the slug.
export async function saveToCloud(user, profile) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
  if (!user) throw new Error('Please sign in first')

  let slug = slugify(profile.slug || profile.name || 'portfolio') || 'portfolio'

  // The slug must be free (or already yours).
  const existing = await getDoc(doc(db, COLLECTION, slug))
  if (existing.exists() && existing.data().ownerId !== user.uid) {
    throw new Error(`The URL "/p/${slug}" is already taken — pick a different username in the editor.`)
  }

  // One portfolio per account: if the slug changed, remove the old document.
  const mine = await getMyPortfolio(user)
  if (mine && mine._id && mine._id !== slug) {
    try { await deleteDoc(doc(db, COLLECTION, mine._id)) } catch { /* ignore */ }
  }

  const { _id, ...clean } = profile
  await setDoc(
    doc(db, COLLECTION, slug),
    { ...clean, slug, ownerId: user.uid, ownerName: user.displayName || '', ownerEmail: user.email || '', updatedAt: serverTimestamp() },
    { merge: true }
  )
  return slug
}

// Public read by slug (= the URL id).
export async function getFromCloud(id) {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) throw new Error('Portfolio not found')
  return snap.data()
}

// Delete the signed-in user's portfolio from Firestore (so they can start fresh).
export async function deleteMyPortfolio(user) {
  if (!isFirebaseConfigured || !user) return
  const mine = await getMyPortfolio(user)
  if (mine && mine._id) {
    await deleteDoc(doc(db, COLLECTION, mine._id))
  }
}

export function publicUrl(id) {
  return `${window.location.origin}/p/${id}`
}
