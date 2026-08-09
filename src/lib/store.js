// Profile persistence: localStorage + a shareable URL that carries the whole
// profile encoded in the link (works with no backend). Swap for a real DB later.

const KEY = 'builder-profile'

export function saveProfile(profile) {
  localStorage.setItem(KEY, JSON.stringify(profile))
}

export function clearProfile() {
  localStorage.removeItem(KEY)
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Unicode-safe base64
function encode(obj) {
  const json = JSON.stringify(obj)
  return btoa(unescape(encodeURIComponent(json)))
}
function decode(str) {
  const json = decodeURIComponent(escape(atob(str)))
  return JSON.parse(json)
}

// Build a shareable link like https://site/#/me?d=<encoded>
export function makeShareLink(profile) {
  const d = encode(profile)
  const base = `${window.location.origin}/me`
  return `${base}?d=${encodeURIComponent(d)}`
}

// Read a profile from ?d= in the URL, if present.
export function readSharedProfile() {
  try {
    const params = new URLSearchParams(window.location.search)
    const d = params.get('d')
    return d ? decode(d) : null
  } catch {
    return null
  }
}

export function downloadJSON(profile, filename = 'portfolio.json') {
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// A blank profile so the editor works even without building first.
export function emptyProfile() {
  return {
    name: '', slug: '', avatar: '', headline: '', location: '', email: '', phone: '', summary: '',
    socials: { github: '', behance: '', linkedin: '', twitter: '', website: '' },
    stats: { repos: 0, followers: 0, experience: 0, skills: 0 },
    skills: [], languages: [], experience: [], education: [], projects: [],
    theme: 'magenta', template: 'dev', mode: 'dark',
  }
}
