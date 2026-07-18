import { useRef, useState } from 'react'
import { Icon } from './Icons'

function AccItem({ item }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  return (
    <div className={`acc-item ${open ? 'open' : ''}`}>
      <button className="acc-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {item.tag && <span className="acc-tag">{item.tag}</span>}
        <span className="acc-title">{item.title}</span>
        <span className="acc-toggle"><Icon name="plus" size={16} /></span>
      </button>
      <div
        className="acc-body"
        ref={bodyRef}
        style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight}px` : 0 }}
      >
        <div className="acc-body-inner">
          <p>{item.desc}</p>
          {item.tech && (
            <div className="ptech">
              {item.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
          {item.link && (
            <a className="plink" href={item.link} target="_blank" rel="noopener noreferrer">
              View code <Icon name="external" size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Accordion({ items }) {
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccItem key={item.title + i} item={item} />
      ))}
    </div>
  )
}
