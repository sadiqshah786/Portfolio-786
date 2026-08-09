export const GRADIENTS = [
  ['#3a1c71', '#7b61ff'], ['#0f2027', '#2ee6b6'], ['#8e2de2', '#ffb454'],
  ['#ee4f8b', '#ff6b45'], ['#2e9df0', '#00c6ff'], ['#11998e', '#38ef7d'],
]

export const grad = (i) => GRADIENTS[i % GRADIENTS.length]

// LinkedIn headlines are often long pipe-separated lists — take just the first,
// short part so big hero headings don't overflow.
export function shortRole(data) {
  const h = (data.headline || '').split(/[|·•\n,;/]/)[0].trim()
  if (!h) return 'Developer'
  return h.length > 40 ? h.slice(0, 40).trim() + '…' : h
}

// Map experience/education arrays into the accordion item shape.
export const expItems = (data) =>
  (data.experience || []).map((e) => ({
    tag: e.period || '',
    title: e.org ? `${e.title} · ${e.org}` : e.title,
    desc: e.desc || `${e.title}${e.org ? ' at ' + e.org : ''}.`,
  }))

export const eduItems = (data) =>
  (data.education || []).map((e) => ({
    tag: e.period || '',
    title: e.degree || e.school,
    desc: e.school || '',
  }))
