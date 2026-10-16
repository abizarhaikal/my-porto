import "../footer.css";

type PortfolioFooterProps = { lang: "en" | "id"; homePath?: string };

const footerCopy = {
  en: {
    title: "Let’s work together.",
    intro: "I’m open to full-time opportunities and freelance projects. Tell me what you’re working on.",
    availability: "Open to opportunities",
    main: "Main",
    links: "Links",
    home: "Home",
    work: "Work",
    journey: "Journey",
    skills: "Skills",
    contact: "Contact",
    resume: "Download resume",
    backToTop: "Back to top",
  },
  id: {
    title: "Mari bekerja sama.",
    intro: "Saya terbuka untuk kesempatan kerja penuh waktu dan proyek freelance. Ceritakan apa yang sedang Anda bangun.",
    availability: "Terbuka untuk peluang kerja",
    main: "Menu",
    links: "Tautan",
    home: "Beranda",
    work: "Karya",
    journey: "Perjalanan",
    skills: "Keahlian",
    contact: "Kontak",
    resume: "Unduh resume",
    backToTop: "Kembali ke atas",
  },
} as const;

export default function PortfolioFooter({ lang, homePath = "" }: PortfolioFooterProps) {
  const t = footerCopy[lang];

  return <footer id="contact" className="portfolio-footer">
    <div className="wrap portfolio-footer-inner">
      <div className="footer-invitation">
        <p className="footer-status"><span aria-hidden="true" />{t.availability}</p>
        <h2>{t.title}</h2>
        <p className="footer-intro">{t.intro}</p>
      </div>
      <div className="portfolio-footer-top">
        <div className="footer-contact">
          <div className="footer-socials" role="group" aria-label={lang === "en" ? "Social profiles" : "Profil sosial"}>
            <a href="https://www.instagram.com/abizarhaikal" target="_blank" rel="noreferrer" aria-label="Instagram (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle className="footer-icon-dot" cx="17.5" cy="6.5" r=".8"/></svg></a>
            <a href="https://www.linkedin.com/in/haikal-abizar/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7.5v.1M12 17v-7m0 3a3 3 0 0 1 6 0v4"/></svg></a>
          </div>
          <a className="footer-email" href="mailto:abizarhaikal@gmail.com">abizarhaikal@gmail.com</a>
        </div>
        <nav className="footer-links" aria-label={lang === "en" ? "Footer navigation" : "Navigasi footer"}>
          <div><span>{t.main}</span><a href={`${homePath}#home`}>{t.home}</a><a href={`${homePath}#work`}>{t.work}</a><a href={`${homePath}#journey`}>{t.journey}</a></div>
          <div><span>{t.links}</span><a href={`${homePath}#skills`}>{t.skills}</a><a href={`${homePath}#contact`}>{t.contact}</a><a href="/Haikal-Abizar-Resume.pdf" download="Haikal-Abizar-Resume.pdf">{t.resume}<span aria-hidden="true"> ↗</span></a></div>
        </nav>
      </div>
      <div className="footer-mark">
        <div className="footer-name" aria-hidden="true">Haikal Abizar</div>
      </div>
      <div className="footer-bottom"><span>© 2026 Haikal Abizar</span><a href={`${homePath}#home`}>{t.backToTop} ↑</a></div>
    </div>
  </footer>;
}
