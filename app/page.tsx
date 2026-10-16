"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectStack from "./components/ProjectStack";
import ExpertiseSummary from "./components/ExpertiseSummary";
import PortfolioFooter from "./components/PortfolioFooter";
import usePortfolioLanguage from "./components/usePortfolioLanguage";
import "./journey.css";

const content = {
  en: {
    nav: ["Work", "Journey", "Contact"],
    role: "Full-stack developer with a frontend focus",
    lead: "Web applications built around real work.",
    intro: "I’m a software engineer based in Jakarta. I build web applications, warehouse dashboards, and backend services, with a focus on frontend development.",
    explore: "Explore my work", contact: "Get in touch",
    workTitle: "My career so far.",
    workIntro: "From university labs and developer training to building enterprise applications at Perum BULOG.", resume: "Download resume",
    selected: "Selected work", selectedIntro: "Three projects showing my work in frontend development, backend services, and API integration.",
    availability: "Open to work", opportunity: "Full-time & freelance", exploreMore: "Scroll to explore",
    contribution: "My contribution", previewNote: "Illustrative interface · Internal details concealed",
    now: "Present", before: "Before", foundation: "Foundation",
    nowChapter: ["IT Staff — Software Development", "I build enterprise web applications and warehouse inbound workflows. For Aktivasi Budaya, I also built a Python service that compares images using FastAPI and OpenCV ORB."],
    beforeChapter: ["IT Intern", "I developed backend services with Express, TypeScript, Prisma, and PostgreSQL, alongside Next.js dashboards and a Flutter app. I also maintained corporate websites with WordPress, Elementor, PHP, and JavaScript."],
    wms: ["Warehouse dashboards and inbound workflows.", "I design and build WMS interfaces for vehicle queues, inbound checks, and warehouse capacity. The app uses React Router, TypeScript, Tailwind CSS, and HeroUI, with views tailored to different user roles.", "React Router · TypeScript · HeroUI · Warehouse workflows"],
    dice: ["Image analysis for activity reporting.", "For Aktivasi Budaya, I built an internal web application and a Python API for image-fraud checks. The service extracts and matches image features with OpenCV ORB, supporting analysis, monitoring, and reporting.", "Python · FastAPI · OpenCV ORB · REST APIs"],
    intern: ["Learning to build across the stack.", "As an IT intern at Perum BULOG, I developed backend services with Express, TypeScript, Prisma, and PostgreSQL, alongside Next.js dashboards and a Flutter application."],
    trailoo: ["Web and tablet dashboards for a smart trolley.", "I built TRAILOO’s web and tablet dashboards with Next.js and worked with backend and AI teams to integrate navigation and transaction APIs. The project received national PKM-KI funding in 2025.", "Next.js · shadcn/ui · API integration · PKM-KI 2025"],
    lab: ["Lead Laboratory Assistant", "I coordinated 24+ laboratory assistants across 20 classes and managed academic data for about 4,000 students. I also maintained internal websites, servers, and databases."],
    education: "Bachelor of Computer Science · Gunadarma University", educationDetail: "Sep 2021 – Aug 2025 · GPA 3.95 / 4.00",
  },
  id: {
    nav: ["Karya", "Perjalanan", "Kontak"],
    role: "Full-stack developer dengan fokus frontend",
    lead: "Membangun aplikasi untuk kebutuhan kerja sehari-hari.",
    intro: "Saya software engineer yang berbasis di Jakarta. Saya membangun aplikasi web, dashboard gudang, dan layanan backend, dengan fokus pada pengembangan frontend.",
    explore: "Lihat karya saya", contact: "Hubungi saya",
    workTitle: "Perjalanan karier saya.",
    workIntro: "Dari laboratorium kampus dan pelatihan developer hingga membangun aplikasi perusahaan di Perum BULOG.", resume: "Unduh resume",
    selected: "Karya pilihan", selectedIntro: "Tiga proyek yang menunjukkan kontribusi saya di frontend, layanan backend, dan integrasi API.",
    availability: "Terbuka untuk kerja", opportunity: "Full-time & freelance", exploreMore: "Gulir untuk menjelajah",
    contribution: "Kontribusi saya", previewNote: "Antarmuka ilustratif · Detail internal disamarkan",
    now: "Sekarang", before: "Sebelumnya", foundation: "Fondasi",
    nowChapter: ["IT Staff — Software Development", "Saya membangun aplikasi web perusahaan dan alur penerimaan barang di gudang. Untuk Aktivasi Budaya, saya juga membangun layanan Python untuk membandingkan gambar dengan FastAPI dan OpenCV ORB."],
    beforeChapter: ["IT Intern", "Saya mengembangkan layanan backend dengan Express, TypeScript, Prisma, dan PostgreSQL, serta dashboard Next.js dan aplikasi Flutter. Saya juga mengelola website perusahaan dengan WordPress, Elementor, PHP, dan JavaScript."],
    wms: ["Dashboard gudang dan alur penerimaan barang.", "Saya merancang dan membangun antarmuka WMS untuk antrean kendaraan, pemeriksaan barang masuk, dan kapasitas gudang. Aplikasi memakai React Router, TypeScript, Tailwind CSS, dan HeroUI, dengan tampilan sesuai peran pengguna.", "React Router · TypeScript · HeroUI · Operasional gudang"],
    dice: ["Analisis gambar untuk pelaporan kegiatan.", "Untuk Aktivasi Budaya, saya membangun aplikasi web internal dan API Python untuk membantu pemeriksaan kecurangan gambar. Layanan ini mengekstraksi dan mencocokkan fitur gambar dengan OpenCV ORB untuk mendukung analisis, pemantauan, dan pelaporan.", "Python · FastAPI · OpenCV ORB · REST API"],
    intern: ["Belajar membangun dari frontend hingga backend.", "Saat magang di Perum BULOG, saya mengembangkan layanan backend dengan Express, TypeScript, Prisma, dan PostgreSQL, serta dashboard Next.js dan aplikasi Flutter."],
    trailoo: ["Dashboard web dan tablet untuk smart trolley.", "Saya membangun dashboard web dan tablet TRAILOO dengan Next.js, lalu bekerja sama dengan tim backend dan AI untuk mengintegrasikan API navigasi dan transaksi. Proyek ini mendapat pendanaan nasional PKM-KI pada 2025.", "Next.js · shadcn/ui · Integrasi API · PKM-KI 2025"],
    lab: ["Ketua Asisten Laboratorium", "Saya mengoordinasikan 24+ asisten laboratorium untuk 20 kelas dan mengelola data akademik sekitar 4.000 mahasiswa. Saya juga mengelola website internal, server, dan database."],
    education: "S1 Ilmu Komputer · Universitas Gunadarma", educationDetail: "Sep 2021 – Agu 2025 · IPK 3,95 / 4,00",
  },
} as const;

function Preview({ type, label }: { type: "wms" | "dice" | "trailoo"; label: string }) {
  return <div className={`preview preview-${type}`} role="img" aria-label={label}>
    <div className="preview-caption"><span>{type === "wms" ? "01 / WMS" : type === "dice" ? "02 / DICE" : "03 / TRAILOO"}</span><span>INTERFACE PREVIEW</span></div>
    <div className="preview-screen">
      {type === "wms" && <div className="mock-app mock-wms">
        <div className="mock-sidebar"><b>W<span>·</span></b><i /><i /><i /><i /></div>
        <div className="mock-content"><div className="mock-topline"><strong>Warehouse overview</strong><span>OPERATIONS / DEMO</span></div>
          <div className="wms-summary"><div><small>CAPACITY</small><strong>—</strong><span className="mock-line" /></div><div><small>INBOUND</small><strong>—</strong><span className="mock-line" /></div><div><small>QUEUE</small><strong>—</strong><span className="mock-line" /></div></div>
          <div className="wms-panels"><div className="wms-map"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><i className="map-pin pin-one" /><i className="map-pin pin-two" /><i className="map-pin pin-three" /><span className="map-label">WAREHOUSE NETWORK</span></div><div className="wms-list"><small>INBOUND FLOW</small><i /><i /><i /><i /></div></div>
        </div></div>}
      {type === "dice" && <div className="mock-app mock-dice">
        <div className="mock-sidebar"><b>D<span>·</span></b><i /><i /><i /><i /></div>
        <div className="mock-content"><div className="mock-topline"><strong>Culture activity</strong><span>REPORTING / OVERVIEW</span></div>
          <div className="dice-summary"><div><small>ACTIVITIES</small><strong>—</strong></div><div><small>PARTICIPATION</small><strong>—</strong></div><div><small>REVIEWED</small><strong>—</strong></div></div>
          <div className="dice-panels"><div className="dice-chart"><small>ACTIVITY OVER TIME</small><div className="dice-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-baseline" /></div><div className="dice-ranking"><small>UNIT ENGAGEMENT</small><span><i /></span><span><i /></span><span><i /></span><span><i /></span></div></div>
        </div></div>}
      {type === "trailoo" && <div className="mock-app mock-trailoo">
        <div className="trailoo-head"><strong>trailoo<span>°</span></strong><span>SHOPPING JOURNEY / DEMO</span></div>
        <div className="trailoo-content"><div className="trailoo-route"><small>STORE NAVIGATION</small><div className="shelf shelf-one" /><div className="shelf shelf-two" /><div className="shelf shelf-three" /><div className="shelf shelf-four" /><div className="shelf shelf-five" /><div className="shelf shelf-six" /><div className="route-path" /><i className="route-start" /><i className="route-end" /></div><div className="trailoo-basket"><small>YOUR TROLLEY</small><div className="basket-item"><i /><span /></div><div className="basket-item"><i /><span /></div><div className="basket-item"><i /><span /></div><div className="basket-total"><span>CHECKOUT</span><b>↗</b></div></div></div>
      </div>}
    </div>
  </div>;
}

export default function Home() {
  const [lang, setLang] = usePortfolioLanguage();
  const root = useRef<HTMLDivElement>(null);
  const t = content[lang];

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".hero-copy > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .1, ease: "power3.out" });
        gsap.fromTo(".portrait", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .2, ease: "power3.out" });
        gsap.fromTo(".journey-progress", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".journey-track", start: "top center", end: "bottom center", scrub: .45 } });
        gsap.utils.toArray<HTMLElement>(".journey-entry").forEach((entry) => {
          gsap.fromTo(entry.querySelector(".journey-card"), { y: 34, opacity: .28 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: entry, start: "top 92%", end: "top 62%", scrub: .45 } });
          gsap.fromTo(entry.querySelector(".journey-dot"), { scale: .7, backgroundColor: "#b9bab2" }, { scale: 1, backgroundColor: "#9f4f3d", ease: "none", scrollTrigger: { trigger: entry, start: "center 65%", end: "center center", scrub: .45 } });
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((node) => {
          gsap.fromTo(node, { y: 32 }, { y: 0, ease: "none", scrollTrigger: { trigger: node, start: "top 90%", end: "top 60%", scrub: .5 } });
        });
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return <div ref={root} className="site">
    <header className="header">
      <a className="brand" href="#home">Haikal Abizar<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#work">{t.nav[0]}</a><a href="#journey">{t.nav[1]}</a><a href="#contact">{t.nav[2]}</a></nav>
      <div className="languages" aria-label="Language"><button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button><button type="button" aria-pressed={lang === "id"} onClick={() => setLang("id")}>ID</button></div>
    </header>
    <main id="home">
      <section className="hero wrap">
        <div className="hero-copy"><div className="hero-chips"><span>FULL-STACK</span><span>FRONTEND FOCUS</span><span>2026</span></div><p className="eyeline"><i />{t.role}</p><h1>Haikal<br />Abizar<span>.</span></h1><h2>{t.lead}</h2><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button primary" href="#work">{t.explore}<span aria-hidden="true">↗</span></a><a className="quiet-link" href="#contact">{t.contact}<span aria-hidden="true">↗</span></a></div></div>
        <div className="portrait"><div className="portrait-inner"><Image src="/haikal-portrait-editorial.png" alt={lang === "en" ? "Formal portrait of Haikal Abizar" : "Potret formal Haikal Abizar"} fill priority sizes="(max-width: 650px) 300px, (max-width: 950px) 40vw, 435px" /></div><small>HA / 2026</small></div>
        <div className="hero-status"><span><i />{t.availability}</span><span>{t.opportunity}</span><a href="#work">{t.exploreMore} ↓</a></div>
      </section>
      <section id="work" className="selected-work"><div className="wrap"><div className="selected-heading"><h2>{t.selected}</h2><p>{t.selectedIntro}</p></div><ProjectStack lang={lang} projects={([
        { id: "wms", name: "WMS", data: t.wms },
        { id: "dice", name: "DICE", data: t.dice },
        { id: "trailoo", name: "TRAILOO", data: t.trailoo },
      ] as const).map(project => ({ id: project.id, name: project.name, title: project.data[0], description: project.data[1], tags: project.data[2].split(" · ") }))} preview={type => <Preview type={type} label={`${type.toUpperCase()} illustrative interface preview`} />} /></div></section>
      <ExpertiseSummary lang={lang} />
      <section id="journey" className="journey"><div className="wrap journey-grid">
        <div className="journey-list">
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{t.now} · WMS / DICE</span><h3>{t.nowChapter[0]}</h3><strong>Perum BULOG</strong><p>{t.nowChapter[1]}</p><span className="journey-date">Jan 2026 — {t.now}</span></article><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{t.before} · SOFTWARE DEVELOPMENT</span><h3>{t.beforeChapter[0]}</h3><strong>Perum BULOG</strong><p>{t.beforeChapter[1]}</p><span className="journey-date">{lang === "en" ? "Feb – Dec 2025" : "Feb – Des 2025"}</span></article><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{lang === "en" ? "TRAINING" : "PELATIHAN"}</span><h3>Fullstack Developer</h3><strong>Coding Camp · DBS Foundation</strong><p>{lang === "en" ? "I developed web applications with React, Node.js, and Express, built REST APIs, and integrated relational and non-relational databases." : "Saya mengembangkan aplikasi web dengan React, Node.js, dan Express, membangun REST API, serta mengintegrasikan database relasional dan nonrelasional."}</p><span className="journey-date">Feb – Jun 2025</span></article><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{t.foundation} · LEAD LABORATORY ASSISTANT</span><h3>{t.lab[0]}</h3><strong>{lang === "en" ? "Gunadarma University · Informatics Engineering Lab" : "Universitas Gunadarma · Laboratorium Teknik Informatika"}</strong><p>{t.lab[1]}</p><span className="journey-date">{lang === "en" ? "Oct 2024 – Nov 2025" : "Okt 2024 – Nov 2025"}</span></article><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{lang === "en" ? "TRAINING" : "PELATIHAN"}</span><h3>Mobile Development</h3><strong>Bangkit Academy</strong><p>{lang === "en" ? "I integrated machine learning models and Google Maps into Android applications. As a Student Representative, I also shared my experience as a speaker during the program’s outreach." : "Saya mengintegrasikan model machine learning dan Google Maps ke aplikasi Android. Sebagai Student Representative, saya juga berbagi pengalaman sebagai pembicara dalam sosialisasi program."}</p><span className="journey-date">{lang === "en" ? "Feb – Aug 2024" : "Feb – Agu 2024"}</span></article><span className="journey-dot" aria-hidden="true" /></div>
        </div>
        <div className="journey-track" aria-hidden="true"><span className="journey-progress" /></div>
        <div className="journey-intro"><span className="section-number">{t.nav[1]}</span><h2>{t.workTitle}</h2><p>{t.workIntro}</p><a className="resume-link" href="/Haikal-Abizar-Resume.pdf" download="Haikal-Abizar-Resume.pdf">{t.resume}<span aria-hidden="true">↓</span></a><div className="journey-education"><strong>{t.education}</strong><span>{t.educationDetail}</span><span>BNSP Certified Programmer</span></div></div>
      </div></section>
    </main>
    <PortfolioFooter lang={lang} />
  </div>;
}
