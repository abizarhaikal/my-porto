"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PortfolioFooter from "./PortfolioFooter";
import "../not-found.css";

const copy = {
  en: { message: "Sorry, there’s nothing here.", home: "Back to home" },
  id: { message: "Maaf, halaman ini tidak ditemukan.", home: "Kembali ke beranda" },
} as const;

export default function NotFoundPage() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <div className="site">
    <header className="header">
      <Link className="brand" href="/">Haikal Abizar<span>.</span></Link>
      <nav aria-label="Main navigation"><Link href="/#work">{lang === "en" ? "Work" : "Karya"}</Link><Link href="/#journey">{lang === "en" ? "Journey" : "Perjalanan"}</Link><Link href="/#contact">{lang === "en" ? "Contact" : "Kontak"}</Link></nav>
      <div className="languages" aria-label="Language">
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        <button type="button" aria-pressed={lang === "id"} onClick={() => setLang("id")}>ID</button>
      </div>
    </header>
    <main className="not-found-main" aria-labelledby="not-found-title">
      <h1 id="not-found-title">404</h1>
      <p>{t.message}</p>
      <Link className="not-found-home" href="/">{t.home}</Link>
    </main>
    <PortfolioFooter lang={lang} homePath="/" />
  </div>;
}
