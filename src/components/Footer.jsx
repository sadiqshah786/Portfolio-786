import { Icon } from "./Icons";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-in">
        <p className="footer-credit">
          Developed by <b>Sadiq Shah</b>
        </p>
        <a
          href="https://github.com/sadiqshah786"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-gh"
        >
          <Icon name="github" size={16} /> github.com/sadiqshah786
        </a>
      </div>
    </footer>
  );
}
