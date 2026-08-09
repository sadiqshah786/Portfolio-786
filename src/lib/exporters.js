import { palettes } from '../data'

function theme(profile) {
  return palettes.find((p) => p.id === (profile?.theme || 'magenta')) || palettes[0]
}
function esc(s = '') {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
const FONTS = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'

/* ============ CV (printable A4) ============ */
export function buildCvHtml(p) {
  const t = theme(p)
  const initials = (p.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('')
  const skills = (p.skills || []).map((s) => `<span class="tag">${esc(s)}</span>`).join('')
  const langs = (p.languages || []).map((l) => `<div class="row">${esc(l)}</div>`).join('')
  const exp = (p.experience || []).map((e) => `
    <div class="job">
      <div class="top"><span class="jt">${esc(e.title)}</span><span class="date">${esc(e.period || '')}</span></div>
      ${e.org ? `<div class="co">${esc(e.org)}</div>` : ''}
      ${e.desc ? `<div class="jd">${esc(e.desc)}</div>` : ''}
    </div>`).join('')
  const edu = (p.education || []).map((e) => `
    <div class="edu-item"><div class="jt">${esc(e.degree || e.school)}</div>
    ${e.school && e.degree ? `<div class="co">${esc(e.school)}</div>` : ''}
    <div class="date">${esc(e.period || '')}</div></div>`).join('')
  const swatches = palettes
    .map((pl) => `<button class="cv-sw" title="${pl.name}" style="background:linear-gradient(135deg,${pl.pink},${pl.coral})" onclick="cvTheme('${pl.pink}','${pl.purple}','${pl.coral}')"></button>`)
    .join('')

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/><title>${esc(p.name)}-CV</title>
<link href="${FONTS}" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
:root{--accent:${t.pink};--accent2:${t.purple};--accent3:${t.coral}}
body{font-family:'Space Grotesk',sans-serif;background:#ececf2;color:#1a1a2e}
.toolbar{position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;gap:14px;background:#14143a;color:#fff;padding:12px 20px;font-family:'Space Mono',monospace;font-size:13px}
.cv-tools{display:flex;align-items:center;gap:14px}
.cv-colors{display:flex;gap:6px}
.cv-sw{width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.25);cursor:pointer;padding:0}
.cv-sw:hover{border-color:#fff;transform:scale(1.12)}
.toolbar button{background:linear-gradient(100deg,var(--accent),var(--accent3));color:#fff;border:0;padding:9px 16px;border-radius:8px;font-family:'Space Mono',monospace;font-weight:700;cursor:pointer}
.page{width:100%;max-width:210mm;min-height:297mm;margin:20px auto;background:#fff;display:grid;grid-template-columns:34% 1fr;box-shadow:0 10px 40px rgba(0,0,0,.15)}
aside{background:#14143a;color:#d8d8ec;padding:26px 22px}
.avatar{width:100px;height:100px;border-radius:50%;margin:0 auto 18px;display:grid;place-items:center;object-fit:cover;background:linear-gradient(135deg,var(--accent2),var(--accent));color:#fff;font-family:'Space Mono',monospace;font-weight:700;font-size:28px;border:3px solid rgba(255,255,255,.15)}
aside h1{font-size:22px;text-align:center}aside .role{text-align:center;color:#9494bd;font-family:'Space Mono',monospace;font-size:11px;margin-top:6px}
.sec{margin-top:24px}.sec h2{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);border-bottom:1px solid rgba(255,255,255,.12);padding-bottom:7px;margin-bottom:12px}
.row{font-size:12.5px;margin-bottom:9px;word-break:break-word}.lbl{color:#9494bd;font-family:'Space Mono',monospace;font-size:10px;text-transform:uppercase;display:block}
.tag{display:inline-block;font-family:'Space Mono',monospace;font-size:11px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#d8d8ec;padding:4px 9px;border-radius:5px;margin:0 5px 6px 0}
main{padding:30px}.msec{margin-bottom:24px}.msec h2{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--accent2);margin-bottom:14px;display:flex;align-items:center;gap:10px}.msec h2::after{content:"";flex:1;height:1px;background:#e2e2ec}
.summary{font-size:13.5px;color:#5a5a72}
.job{margin-bottom:16px;position:relative;padding-left:18px}.job::before{content:"";position:absolute;left:0;top:6px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.top{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.jt{font-size:14px;font-weight:600}.date{font-family:'Space Mono',monospace;font-size:10.5px;color:var(--accent);white-space:nowrap}
.co{font-size:12px;color:#5a5a72;font-weight:500}.jd{font-size:12.5px;color:#5a5a72;margin-top:4px}.edu-item{margin-bottom:12px}
@media print{body{background:#fff}.toolbar{display:none}.page{margin:0;box-shadow:none;min-height:296mm;grid-template-columns:68mm 1fr}@page{size:A4;margin:0}}
</style></head><body>
<div class="toolbar"><span>${esc(p.name)} — CV</span><div class="cv-tools"><div class="cv-colors">${swatches}</div><button onclick="window.print()">⬇ Download PDF</button></div></div>
<script>function cvTheme(a,b,c){var r=document.documentElement.style;r.setProperty('--accent',a);r.setProperty('--accent2',b);r.setProperty('--accent3',c)}</script>
<div class="page">
<aside>
${p.avatar ? `<img class="avatar" src="${esc(p.avatar)}" alt="${esc(p.name)}"/>` : `<div class="avatar">${esc(initials)}</div>`}
<h1>${esc(p.name)}</h1><div class="role">${esc(p.headline || '')}</div>
<div class="sec"><h2>Contact</h2>
${p.location ? `<div class="row"><span class="lbl">Location</span>${esc(p.location)}</div>` : ''}
${p.phone ? `<div class="row"><span class="lbl">Phone</span>${esc(p.phone)}</div>` : ''}
${p.email ? `<div class="row"><span class="lbl">Email</span>${esc(p.email)}</div>` : ''}
${p.socials?.github ? `<div class="row"><span class="lbl">GitHub</span>${esc(p.socials.github.replace(/^https?:\/\//, ''))}</div>` : ''}
${p.socials?.linkedin ? `<div class="row"><span class="lbl">LinkedIn</span>${esc(p.socials.linkedin.replace(/^https?:\/\//, ''))}</div>` : ''}
</div>
${skills ? `<div class="sec"><h2>Skills</h2>${skills}</div>` : ''}
${langs ? `<div class="sec"><h2>Languages</h2>${langs}</div>` : ''}
</aside>
<main>
${p.summary ? `<div class="msec"><h2>Summary</h2><p class="summary">${esc(p.summary)}</p></div>` : ''}
${exp ? `<div class="msec"><h2>Experience</h2>${exp}</div>` : ''}
${edu ? `<div class="msec"><h2>Education</h2>${edu}</div>` : ''}
</main></div></body></html>`
}

/* ============ Self-contained portfolio page ============ */
export function buildPortfolioHtml(p) {
  const t = theme(p)
  const chips = (p.skills || []).map((s) => `<span class="chip">${esc(s)}</span>`).join('')
  const exp = (p.experience || []).map((e) => `
    <div class="item"><div class="ihead"><b>${esc(e.title)}${e.org ? ` · ${esc(e.org)}` : ''}</b><span>${esc(e.period || '')}</span></div>
    ${e.desc ? `<p>${esc(e.desc)}</p>` : ''}</div>`).join('')
  const edu = (p.education || []).map((e) => `
    <div class="item"><div class="ihead"><b>${esc(e.degree || e.school)}</b><span>${esc(e.period || '')}</span></div>
    ${e.school && e.degree ? `<p>${esc(e.school)}</p>` : ''}</div>`).join('')
  const projs = (p.projects || []).map((pr) => `
    <a class="card" ${pr.live || pr.code ? `href="${esc(pr.live || pr.code)}" target="_blank" rel="noopener"` : ''}>
      <h3>${esc(pr.title)}</h3><p>${esc(pr.desc || '')}</p>
      <div class="tags">${(pr.tech || []).map((x) => `<span>${esc(x)}</span>`).join('')}</div></a>`).join('')
  const socials = Object.entries(p.socials || {}).filter(([, v]) => v)
    .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${k}</a>`).join('')

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/><title>${esc(p.name)} — Portfolio</title>
<link href="${FONTS}" rel="stylesheet"/>
<style>
:root{--pink:var(--accent);--coral:var(--accent3);--teal:${t.teal};--purple:var(--accent2)}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d24;color:#ececf8;font-family:'Space Grotesk',sans-serif;line-height:1.65}
.wrap{max-width:900px;margin:0 auto;padding:0 24px}
a{color:inherit;text-decoration:none}
header{text-align:center;padding:70px 0 50px;border-bottom:1px solid #262658}
.av{width:120px;height:120px;border-radius:50%;margin:0 auto 22px;object-fit:cover;padding:4px;background:linear-gradient(135deg,var(--purple),var(--pink))}
h1{font-size:clamp(30px,6vw,52px);letter-spacing:-1px}
.role{color:var(--teal);font-family:'Space Mono',monospace;margin-top:12px;font-size:14px}
.sum{max-width:600px;margin:20px auto 0;color:#9494bd}
.stats{display:flex;gap:40px;justify-content:center;margin-top:36px;flex-wrap:wrap}
.stats b{display:block;font-size:26px;color:var(--pink)}.stats span{font-family:'Space Mono',monospace;font-size:11px;color:#9494bd;text-transform:uppercase}
section{padding:50px 0;border-bottom:1px solid #262658}
h2{font-family:'Space Mono',monospace;font-size:13px;text-transform:uppercase;letter-spacing:2px;color:var(--pink);margin-bottom:22px}
.chips{display:flex;flex-wrap:wrap;gap:8px}.chip{font-family:'Space Mono',monospace;font-size:12px;padding:6px 11px;border:1px solid #33336e;border-radius:7px;color:#9494bd}
.item{padding:16px 0;border-bottom:1px solid #1c1c40}.ihead{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.ihead span{font-family:'Space Mono',monospace;font-size:12px;color:var(--pink)}.item p{color:#9494bd;font-size:14px;margin-top:6px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px}
.card{display:block;background:#14143a;border:1px solid #33336e;border-radius:14px;padding:20px;transition:transform .2s,border-color .2s}
.card:hover{transform:translateY(-4px);border-color:var(--pink)}.card h3{font-size:17px;margin-bottom:8px}.card p{color:#9494bd;font-size:14px;margin-bottom:12px}
.tags{display:flex;flex-wrap:wrap;gap:6px}.tags span{font-family:'Space Mono',monospace;font-size:11px;color:var(--teal);border:1px solid #33336e;padding:3px 8px;border-radius:6px}
.socials{display:flex;gap:14px;flex-wrap:wrap}.socials a{font-family:'Space Mono',monospace;font-size:13px;border:1px solid #33336e;padding:9px 16px;border-radius:999px;text-transform:capitalize}.socials a:hover{border-color:var(--teal);color:var(--teal)}
footer{text-align:center;padding:30px;color:#9494bd;font-family:'Space Mono',monospace;font-size:12px}
</style></head><body>
<header><div class="wrap">
${p.avatar ? `<img class="av" src="${esc(p.avatar)}" alt="${esc(p.name)}"/>` : ''}
<h1>${esc(p.name)}</h1><div class="role">${esc(p.headline || '')}${p.location ? ` · ${esc(p.location)}` : ''}</div>
${p.summary ? `<p class="sum">${esc(p.summary)}</p>` : ''}
<div class="stats">
<div><b>${p.stats?.repos ?? 0}</b><span>Repos</span></div>
<div><b>${(p.experience || []).length}</b><span>Experience</span></div>
<div><b>${(p.skills || []).length}</b><span>Skills</span></div>
<div><b>${(p.projects || []).length}</b><span>Projects</span></div>
</div></div></header>
<div class="wrap">
${chips ? `<section><h2>Skills</h2><div class="chips">${chips}</div></section>` : ''}
${exp ? `<section><h2>Experience</h2>${exp}</section>` : ''}
${projs ? `<section><h2>Projects</h2><div class="grid">${projs}</div></section>` : ''}
${edu ? `<section><h2>Education</h2>${edu}</section>` : ''}
<section style="border:none"><h2>Contact</h2>
<div class="socials">
${p.email ? `<a href="mailto:${esc(p.email)}">Email</a>` : ''}
${p.phone ? `<a href="tel:${esc(p.phone.replace(/[^\\d+]/g, ''))}">Call</a>` : ''}
${socials}
</div></section>
</div>
<footer>Built with the Portfolio Builder</footer>
</body></html>`
}

/* ============ helpers ============ */
export function openHtmlInNewTab(html) {
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

export async function exportZip(profile) {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()
  const name = (profile.name || 'portfolio').replace(/\s+/g, '-')
  zip.file('index.html', buildPortfolioHtml(profile))
  zip.file('cv.html', buildCvHtml(profile))
  zip.file('data.json', JSON.stringify(profile, null, 2))
  zip.file('README.md', `# ${profile.name} — Portfolio\n\nStatic portfolio exported from the Portfolio Builder.\n\n- \`index.html\` — your portfolio (open in a browser or host anywhere)\n- \`cv.html\` — printable CV (open and Print → Save as PDF)\n- \`data.json\` — your raw data\n\n## Host it free\nDrag this folder onto Netlify Drop (app.netlify.com/drop) or push to GitHub Pages / Vercel.\n`)
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}-portfolio.zip`
  a.click()
  URL.revokeObjectURL(url)
}
