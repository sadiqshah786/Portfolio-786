import { Icon } from "./Icons";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-in">
        <p className="footer-credit">
          Developed by <b>Sadiq Shah</b>
        </p>
        <div className="footer-links">
          <a href="https://github.com/sadiqshah786" target="_blank" rel="noopener noreferrer" className="footer-gh">
            <Icon name="github" size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sadiq-shah-806937166/" target="_blank" rel="noopener noreferrer" className="footer-gh">
            <Icon name="linkedin" size={16} /> LinkedIn
          </a>
          <a href="mailto:sadiqshahdev234@gmail.com" className="footer-gh">
            <Icon name="mail" size={16} /> sadiqshahdev234@gmail.com
          </a>
          <a href="tel:+923076523149" className="footer-gh">
            <Icon name="phone" size={16} /> 0307 6523149
          </a>
        </div>
      </div>
    </footer>
  );
}
