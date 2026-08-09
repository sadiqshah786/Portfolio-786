import TemplateDevDark from './TemplateDevDark'
import TemplateProLight from './TemplateProLight'
import TemplateSidebarPro from './TemplateSidebarPro'
import TemplateDigital from './TemplateDigital'
import TemplateTerminal from './TemplateTerminal'

export const TEMPLATES = [
  { id: 'dev', name: 'Dev', desc: 'Dark, code-editor hero', Component: TemplateDevDark },
  { id: 'pro', name: 'Pro', desc: 'Light, photo + stat cards', Component: TemplateProLight },
  { id: 'sidebar', name: 'Sidebar', desc: 'Fixed nav sidebar, dark', Component: TemplateSidebarPro },
  { id: 'digital', name: 'Digital', desc: 'Light, feature cards', Component: TemplateDigital },
  { id: 'terminal', name: 'Terminal', desc: 'Minimal mono, dark', Component: TemplateTerminal },
]

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0]
}
