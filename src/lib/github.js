// Fetch a user's public GitHub data — no auth needed (rate-limited to 60/hr per IP).

// Accepts a full URL or a bare username and returns the username.
export function parseGithubUsername(input) {
  if (!input) return ''
  let s = input.trim()
  s = s.replace(/^https?:\/\/(www\.)?github\.com\//i, '')
  s = s.replace(/^@/, '')
  s = s.split(/[/?#]/)[0]
  return s.trim()
}

const API = 'https://api.github.com'

async function gh(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (res.status === 404) throw new Error('GitHub user not found')
  if (res.status === 403) throw new Error('GitHub rate limit reached — try again in a while')
  if (!res.ok) throw new Error(`GitHub error (${res.status})`)
  return res.json()
}

// Returns { profile, repos, languages, featured }
export async function fetchGithub(input) {
  const username = parseGithubUsername(input)
  if (!username) throw new Error('Enter a GitHub username or URL')

  const user = await gh(`/users/${encodeURIComponent(username)}`)
  const repos = await gh(`/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`)

  const own = repos.filter((r) => !r.fork)

  // Count languages across owned repos.
  const langCount = {}
  own.forEach((r) => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
  })
  const languages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang)

  // Pick featured repos: has description, most stars first.
  const featured = own
    .filter((r) => r.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      title: prettifyRepoName(r.name),
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || '',
      language: r.language || '',
      stars: r.stargazers_count,
      topics: r.topics || [],
    }))

  return {
    profile: {
      username: user.login,
      name: user.name || user.login,
      avatar: user.avatar_url,
      bio: user.bio || '',
      company: user.company || '',
      location: user.location || '',
      blog: user.blog || '',
      twitter: user.twitter_username || '',
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      url: user.html_url,
    },
    repos: own,
    languages,
    featured,
  }
}

// "my-cool-app" -> "My Cool App"
function prettifyRepoName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}
