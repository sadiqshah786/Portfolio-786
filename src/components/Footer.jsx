import { Icon } from "./Icons";

const LINKS = [
  { icon: "github", href: "https://github.com/sadiqshah786", label: "GitHub" },
  { icon: "linkedin", href: "https://www.linkedin.com/in/sadiq-shah-806937166/", label: "LinkedIn" },
  { icon: "mail", href: "mailto:sadiqshahdev234@gmail.com", label: "Email" },
  { icon: "phone", href: "tel:+923076523149", label: "Call" },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-in">
        <p className="footer-credit">
          Developed by <b>Sadiq Shah</b>
        </p>
        <div className="footer-links">
          {LINKS.map((l) => (
            <a
              key={l.icon}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="footer-ic"
              aria-label={l.label}
              title={l.label}
            >
              <Icon name={l.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
