export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="logo pixel">SS</span> Sadiq Shah
        </a>
        <p className="fpixel">&lt; BUILT WITH ♥ BY SADIQ SHAH /&gt;</p>
        <p className="copy">© {new Date().getFullYear()} Sadiq Shah — Full Stack Developer</p>
      </div>
    </footer>
  )
}
