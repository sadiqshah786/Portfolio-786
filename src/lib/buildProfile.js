// Merge GitHub data + parsed LinkedIn PDF into one portfolio data model
// that the generated portfolio page renders from.

export function buildProfile(github, linkedin, extra = {}) {
  const gp = github?.profile || {}
  const li = linkedin || {}

  const skills = uniq([...(li.skills || []), ...((github?.languages) || [])]).slice(0, 18)

  const projects = (github?.featured || []).map((r) => ({
    title: r.title,
    desc: r.description,
    tech: uniq([r.language, ...(r.topics || [])].filter(Boolean)).slice(0, 4),
    live: r.homepage || '',
    code: r.url,
    stars: r.stars,
  }))

  const name = gp.name || 'Your Name'
  return {
    name,
    slug: slugify(name),
    avatar: gp.avatar || '',
    headline: li.headline || gp.bio || 'Developer',
    location: li.location || gp.location || '',
    email: li.email || '',
    phone: li.phone || '',
    summary: li.summary || gp.bio || '',
    socials: {
      github: gp.url || '',
      linkedin: extra.linkedinUrl || '',
      twitter: gp.twitter ? `https://twitter.com/${gp.twitter}` : '',
      website: gp.blog || '',
    },
    stats: {
      repos: gp.publicRepos || 0,
      followers: gp.followers || 0,
      experience: li.experience?.length || 0,
      skills: skills.length,
    },
    skills,
    languages: li.languages || [],
    experience: li.experience || [],
    education: li.education || [],
    projects,
    theme: 'magenta',
    template: 'dev',
    mode: 'dark',
  }
}

function uniq(arr) {
  return [...new Set(arr.map((s) => (s || '').trim()).filter(Boolean))]
}

function slugify(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)
}
