// Heuristic parser for the text lines extracted from a LinkedIn profile PDF.
// LinkedIn's layout is fairly consistent, but profiles vary — so this is
// best-effort and pairs with a manual-edit step later.

const SECTION_HEADERS = [
  'contact', 'top skills', 'skills', 'languages', 'certifications', 'honors-awards',
  'honors & awards', 'summary', 'experience', 'education', 'projects', 'publications',
  'volunteer experience', 'recommendations', 'interests',
]

const MONTH = '(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)'
// A "date range" line, e.g. "March 2025 - April 2025", "2024 - Present", "Jan 2023 - Present"
const DATE_RANGE = new RegExp(
  `(${MONTH}\\s+)?(19|20)\\d{2}\\s*[-–—]\\s*((${MONTH}\\s+)?(19|20)\\d{2}|Present|present|Current|current)`
)
const EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i
const PHONE = /(\+?\d[\d\s()-]{7,}\d)/

function isHeader(line) {
  return SECTION_HEADERS.includes(line.trim().toLowerCase().replace(/:$/, ''))
}

// Slice the lines belonging to a section (from its header to the next header).
function sliceSection(lines, headerName) {
  const start = lines.findIndex((l) => l.trim().toLowerCase().replace(/:$/, '') === headerName)
  if (start === -1) return []
  const out = []
  for (let i = start + 1; i < lines.length; i++) {
    if (isHeader(lines[i])) break
    out.push(lines[i])
  }
  return out
}

const DURATION_ONLY = /^\d+\s+(year|yr|month|mo)s?(\s+\d+\s+(month|mo)s?)?$/i
const isLocation = (l) => /,\s*[A-Za-z]/.test(l) && l.length < 60 && !DATE_RANGE.test(l)

// LinkedIn groups roles under a company. A company header is a line immediately
// followed by a total-duration line (e.g. "Sofcom" then "4 months").
function parseExperience(lines) {
  const companyHeaders = new Set()
  for (let i = 0; i < lines.length - 1; i++) {
    if (DURATION_ONLY.test(lines[i + 1]) && !DATE_RANGE.test(lines[i]) && !DURATION_ONLY.test(lines[i])) {
      companyHeaders.add(i)
    }
  }
  const companyAt = (idx) => {
    let best = ''
    companyHeaders.forEach((h) => { if (h < idx) best = lines[h].trim() })
    return best
  }

  const jobs = []
  for (let i = 0; i < lines.length; i++) {
    if (!DATE_RANGE.test(lines[i])) continue
    const period = lines[i].replace(/\s*\([^)]*\)\s*$/, '').trim()

    // Title = nearest line above that isn't a duration, company header, date or location.
    let title = ''
    for (let k = i - 1; k >= 0 && k >= i - 3; k--) {
      const l = lines[k].trim()
      if (!l || DURATION_ONLY.test(l) || DATE_RANGE.test(l) || companyHeaders.has(k)) continue
      title = l
      break
    }
    const org = companyAt(i)

    // Description = first substantial line after the date/location that isn't the next role.
    let desc = ''
    for (let k = i + 1; k <= i + 2 && k < lines.length; k++) {
      const l = lines[k] || ''
      if (DATE_RANGE.test(l) || DURATION_ONLY.test(l) || isHeader(l) || isLocation(l)) continue
      if (l.length > 45) { desc = l.trim(); break }
    }

    if (title && title !== org) jobs.push({ title, org, period, desc })
  }
  return dedupe(jobs, (j) => j.title + j.period)
}

function parseEducation(lines) {
  const edu = []
  for (let i = 0; i < lines.length; i++) {
    // A degree line usually has a bullet date "· (2016 - 2021)" on the next line
    const dateLine = lines[i]
    if (/\((19|20)\d{2}/.test(dateLine) || DATE_RANGE.test(dateLine)) {
      const school = (lines[i - 2] || '').trim()
      const degree = (lines[i - 1] || '').trim()
      const period = (dateLine.match(/\(?((19|20)\d{2})\s*[-–]\s*((19|20)\d{2}|Present)\)?/) || [dateLine])[0].replace(/[()]/g, '').trim()
      if (degree || school) edu.push({ school, degree, period })
    }
  }
  return dedupe(edu, (e) => e.degree + e.period)
}

function dedupe(arr, keyFn) {
  const seen = new Set()
  return arr.filter((x) => {
    const k = keyFn(x)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

export function parseLinkedIn(lines) {
  const joined = lines.join('\n')

  const email = (joined.match(EMAIL) || [])[0] || ''
  const phoneMatch = joined.match(PHONE)
  const phone = phoneMatch ? phoneMatch[0].trim() : ''

  const summaryLines = sliceSection(lines, 'summary')
  const summary = summaryLines.join(' ').trim()

  let skills = sliceSection(lines, 'top skills')
  if (!skills.length) skills = sliceSection(lines, 'skills')
  skills = skills.filter((s) => s.length < 40).slice(0, 20)

  const experience = parseExperience(sliceSection(lines, 'experience'))
  const education = parseEducation(sliceSection(lines, 'education'))

  const languages = sliceSection(lines, 'languages').filter((l) => l.length < 40)

  // Location: a line like "City, Region, Country" near the top.
  const location =
    lines.find((l) => /^[A-Z][\w\s]+,\s*[A-Z][\w\s]+(,\s*[A-Z][\w\s]+)?$/.test(l.trim()) && l.length < 50) || ''

  return {
    email,
    phone,
    location: location.trim(),
    summary,
    skills,
    languages,
    experience,
    education,
    rawLines: lines,
  }
}
