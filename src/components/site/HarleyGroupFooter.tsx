export function HarleyGroupFooter() {
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="group-footer-row">
          <a href="/the-harley-group" className="group-wordmark">
            THE HARLEY GROUP<span>THOUGHTFUL DESIGN. USEFUL TECHNOLOGY.</span>
          </a>
          <nav aria-label="Group footer">
            <a href="https://harleydigitalworks.com">Harley Digital Works ↗</a>
            <a href="#contact">Contact</a>
            <a href="https://harleydigitalworks.com/privacy">Privacy</a>
          </nav>
        </div>
        <div className="studio-footer-bottom">
          <span>© {new Date().getFullYear()} The Harley Group.</span>
          <span>Practical digital services for independent businesses.</span>
        </div>
      </div>
    </footer>
  );
}
