import { useEffect, useState } from 'react'
import { palettes, headingFonts, fonts, textSizes } from '../data'
import { Icon } from './Icons'

const KEYS = {
  palette: 'portfolio-palette',
  heading: 'portfolio-heading-font',
  font: 'portfolio-font',
  size: 'portfolio-size',
}

function applyPalette(p) {
  const r = document.documentElement.style
  r.setProperty('--pink', p.pink)
  r.setProperty('--coral', p.coral)
  r.setProperty('--teal', p.teal)
  r.setProperty('--purple', p.purple)
}

export default function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [palette, setPalette] = useState(() => localStorage.getItem(KEYS.palette) || palettes[0].id)
  const [heading, setHeading] = useState(() => localStorage.getItem(KEYS.heading) || headingFonts[0].id)
  const [font, setFont] = useState(() => localStorage.getItem(KEYS.font) || fonts[0].id)
  const [size, setSize] = useState(() => localStorage.getItem(KEYS.size) || 'md')

  useEffect(() => {
    const p = palettes.find((x) => x.id === palette) || palettes[0]
    applyPalette(p)
    localStorage.setItem(KEYS.palette, p.id)
  }, [palette])

  useEffect(() => {
    const h = headingFonts.find((x) => x.id === heading) || headingFonts[0]
    document.documentElement.style.setProperty('--font-heading', h.stack)
    localStorage.setItem(KEYS.heading, h.id)
  }, [heading])

  useEffect(() => {
    const f = fonts.find((x) => x.id === font) || fonts[0]
    document.documentElement.style.setProperty('--font-body', f.stack)
    localStorage.setItem(KEYS.font, f.id)
  }, [font])

  useEffect(() => {
    const s = textSizes.find((x) => x.id === size) || textSizes[1]
    document.documentElement.style.zoom = s.zoom
    localStorage.setItem(KEYS.size, s.id)
  }, [size])

  return (
    <div className={`palette ${open ? 'open' : ''}`}>
      <div className="palette-panel">
        <div className="palette-title">Accent color</div>
        <div className="palette-grid">
          {palettes.map((p) => (
            <button
              key={p.id}
              className={`swatch ${palette === p.id ? 'sel' : ''}`}
              style={{ background: `linear-gradient(135deg, ${p.pink}, ${p.coral})` }}
              onClick={() => setPalette(p.id)}
              aria-label={p.name}
              title={p.name}
            >
              {palette === p.id && <Icon name="check" size={16} />}
            </button>
          ))}
        </div>

        <div className="palette-title">Heading font</div>
        <div className="font-list">
          {headingFonts.map((f) => (
            <button
              key={f.id}
              className={`font-btn ${heading === f.id ? 'sel' : ''}`}
              style={{ fontFamily: f.stack, fontSize: f.id === 'pixel' ? '9px' : '13px' }}
              onClick={() => setHeading(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="palette-title">Paragraph font</div>
        <div className="font-list">
          {fonts.map((f) => (
            <button
              key={f.id}
              className={`font-btn ${font === f.id ? 'sel' : ''}`}
              style={{ fontFamily: f.stack }}
              onClick={() => setFont(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="palette-title">Text size</div>
        <div className="size-list">
          {textSizes.map((s) => (
            <button
              key={s.id}
              className={`size-btn ${size === s.id ? 'sel' : ''}`}
              onClick={() => setSize(s.id)}
              title={s.label}
            >
              A
            </button>
          ))}
        </div>
      </div>

      <button className="palette-fab" onClick={() => setOpen((o) => !o)} aria-label="Customize appearance">
        <Icon name={open ? 'close' : 'palette'} size={20} />
      </button>
    </div>
  )
}
