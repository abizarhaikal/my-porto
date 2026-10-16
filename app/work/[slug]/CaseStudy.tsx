"use client";

import Link from "next/link";
import PortfolioFooter from "../../components/PortfolioFooter";
import usePortfolioLanguage from "../../components/usePortfolioLanguage";
import { detail, diceArticle, projectIds, projectInfo, wmsArticle, type ProjectId } from "../projects";
import "./case-study.css";

export default function CaseStudy({ id }: { id: ProjectId }) {
  const [lang, setLang] = usePortfolioLanguage();
  const t = detail[lang];
  const project = projectInfo[id];
  const [context, contributions] = t[id];
  const position = projectIds.indexOf(id);
  const next = projectIds[(position + 1) % projectIds.length];
  const article = id === "wms" ? wmsArticle[lang] : id === "dice" ? diceArticle[lang] : null;

  return <div className="site case-study">
    <header className="header">
      <Link className="brand" href="/">Haikal Abizar<span>.</span></Link>
      <nav aria-label="Main navigation"><Link href="/#work">{lang === "en" ? "Work" : "Karya"}</Link><Link href="/#journey">{lang === "en" ? "Journey" : "Perjalanan"}</Link><Link href="/#contact">{lang === "en" ? "Contact" : "Kontak"}</Link></nav>
      <div className="languages" aria-label="Language"><button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button><button type="button" aria-pressed={lang === "id"} onClick={() => setLang("id")}>ID</button></div>
    </header>
    <main>
      <div className="wrap case-content">
        <Link className="case-return" href="/#work">← {t.close}</Link>
        <div className="case-heading"><span>SELECTED WORK / 0{position + 1}</span><h1>{project.name}<i>.</i></h1><p>{project.title[lang]}</p></div>
        <div className={`case-art case-art-${id}`} role="img" aria-label={`${project.name} ${lang === "en" ? "illustrative interface preview" : "pratinjau antarmuka ilustratif"}`}><span>{project.name}</span><small>{lang === "en" ? "Illustrative interface · Internal details concealed" : "Antarmuka ilustratif · Detail internal disamarkan"}</small></div>
        <div className="case-facts"><div><small>{lang === "en" ? "PROJECT" : "PROYEK"}</small><strong>{project.name}</strong></div><div><small>{lang === "en" ? "FOCUS" : "FOKUS"}</small><strong>{project.stack}</strong></div></div>
        <div className="case-sections"><section><span>01 / {t.context}</span><h2>{t.context}</h2><p>{context}</p></section><section><span>02 / {t.contribution}</span><h2>{t.contribution}</h2><ul>{contributions.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
        {article && <article className="case-article" aria-label={lang === "en" ? `${project.name} case study` : `Studi kasus ${project.name}`}>
          <p className="case-article-lead">{article.intro}</p>
          <section className="case-article-section"><span>03 / {article.challengeTitle}</span><h2>{article.challengeTitle}</h2><p>{article.challenge}</p></section>
          <section className="case-article-section"><span>04 / {article.flowTitle}</span><h2>{article.flowTitle}</h2><ol className="case-flow">{article.flow.map((step) => <li key={step.label}><strong>{step.label}</strong><p>{step.text}</p></li>)}</ol></section>
          <div className="case-article-pair"><section className="case-article-section"><span>05 / {article.decisionsTitle}</span><h2>{article.decisionsTitle}</h2><p>{article.decisions}</p></section><section className="case-article-section"><span>06 / {article.methodTitle}</span><h2>{article.methodTitle}</h2><p>{article.method}</p></section></div>
          <section className="case-article-section case-article-outcome"><span>07 / {article.outcomeTitle}</span><h2>{article.outcomeTitle}</h2><p>{article.outcome}</p></section>
        </article>}
        <p className="case-note">{t.note}</p>
        <div className="case-next"><span>{lang === "en" ? "NEXT PROJECT" : "PROYEK BERIKUTNYA"}</span><Link href={`/work/${next}`}>{projectInfo[next].name} <span aria-hidden="true">↗</span></Link></div>
      </div>
    </main>
    <PortfolioFooter lang={lang} homePath="/" />
  </div>;
}
