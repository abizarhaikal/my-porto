"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectStack from "./components/ProjectStack";
import ExpertiseSummary from "./components/ExpertiseSummary";
import PortfolioFooter from "./components/PortfolioFooter";
import usePortfolioLanguage from "./components/usePortfolioLanguage";
import homeStyles from "./home.module.css";
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
    contribution: "My contribution", previewLabel: "Illustrative preview",
    now: "Present", before: "Before", foundation: "Foundation",
    nowChapter: ["IT Staff — Software Development", "I build enterprise web applications and warehouse inbound workflows. For Aktivasi Budaya, I also built a Python service that compares visual image features with OpenCV ORB."],
    beforeChapter: ["IT Intern", "I developed backend services with Express, TypeScript, Prisma, and PostgreSQL, alongside Next.js dashboards and a Flutter app. I also maintained corporate websites with WordPress, Elementor, PHP, and JavaScript."],
    wms: ["Warehouse dashboards and inbound workflows.", "I design and build interfaces for a Warehouse Management System (WMS), covering vehicle queues, inbound checks, and warehouse capacity. The app uses React Router, TypeScript, Tailwind CSS, and HeroUI, with views tailored to different user roles.", "React Router · TypeScript · HeroUI · Warehouse workflows"],
    dice: ["Image analysis for activity reporting.", "For Aktivasi Budaya, I built an internal reporting app and a Python API to check for possible image reuse. It compares visual features with OpenCV ORB, a method for matching image features, to support review and reporting.", "Python · FastAPI · OpenCV ORB · REST APIs"],
    intern: ["Learning to build across the stack.", "As an IT intern at Perum BULOG, I developed backend services with Express, TypeScript, Prisma, and PostgreSQL, alongside Next.js dashboards and a Flutter application."],
    trailoo: ["Web and tablet dashboards for a smart trolley.", "I built TRAILOO’s web and tablet dashboards with Next.js and worked with backend and AI teams to integrate navigation and transaction APIs. In 2025, the project received national funding through Indonesia’s Program Kreativitas Mahasiswa (PKM), in the Karya Inovatif (Innovative Works) category.", "Next.js · shadcn/ui · API integration · PKM-KI 2025"],
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
    contribution: "Kontribusi saya", previewLabel: "Pratinjau ilustratif",
    now: "Sekarang", before: "Sebelumnya", foundation: "Fondasi",
    nowChapter: ["IT Staff — Software Development", "Saya membangun aplikasi web perusahaan dan alur penerimaan barang di gudang. Untuk Aktivasi Budaya, saya juga membangun layanan Python untuk membandingkan fitur visual gambar dengan OpenCV ORB."],
    beforeChapter: ["IT Intern", "Saya mengembangkan layanan backend dengan Express, TypeScript, Prisma, dan PostgreSQL, serta dashboard Next.js dan aplikasi Flutter. Saya juga mengelola website perusahaan dengan WordPress, Elementor, PHP, dan JavaScript."],
    wms: ["Dashboard gudang dan alur penerimaan barang.", "Saya merancang dan membangun antarmuka sistem manajemen pergudangan (WMS) untuk antrean kendaraan, pemeriksaan barang masuk, dan kapasitas gudang. Aplikasi memakai React Router, TypeScript, Tailwind CSS, dan HeroUI, dengan tampilan sesuai peran pengguna.", "React Router · TypeScript · HeroUI · Operasional gudang"],
    dice: ["Analisis gambar untuk pelaporan kegiatan.", "Untuk Aktivasi Budaya, saya membangun aplikasi internal untuk pelaporan kegiatan dan API Python untuk memeriksa kemungkinan penggunaan ulang gambar. Layanan ini membandingkan fitur visual dengan OpenCV ORB, metode pencocokan fitur gambar, sebagai bahan tinjauan dan pelaporan.", "Python · FastAPI · OpenCV ORB · REST API"],
    intern: ["Belajar membangun dari frontend hingga backend.", "Saat magang di Perum BULOG, saya mengembangkan layanan backend dengan Express, TypeScript, Prisma, dan PostgreSQL, serta dashboard Next.js dan aplikasi Flutter."],
    trailoo: ["Dashboard web dan tablet untuk smart trolley.", "Saya membangun dashboard web dan tablet TRAILOO dengan Next.js, lalu bekerja sama dengan tim backend dan AI untuk mengintegrasikan API navigasi dan transaksi. Pada 2025, proyek ini mendapat pendanaan nasional Program Kreativitas Mahasiswa (PKM), bidang Karya Inovatif (KI).", "Next.js · shadcn/ui · Integrasi API · PKM-KI 2025"],
    lab: ["Ketua Asisten Laboratorium", "Saya mengoordinasikan 24+ asisten laboratorium untuk 20 kelas dan mengelola data akademik sekitar 4.000 mahasiswa. Saya juga mengelola website internal, server, dan database."],
    education: "S1 Ilmu Komputer · Universitas Gunadarma", educationDetail: "Sep 2021 – Agu 2025 · IPK 3,95 / 4,00",
  },
} as const;

const previewCopy = {
  en: {
    wms: { title: "Warehouse overview", meta: "OPERATIONS / DEMO", capacity: "CAPACITY", inbound: "INBOUND", queue: "QUEUE", network: "WAREHOUSE NETWORK", flow: "INBOUND FLOW" },
    dice: { title: "Culture activity", meta: "REPORTING / OVERVIEW", activities: "ACTIVITIES", participation: "PARTICIPATION", reviewed: "REVIEWED", activityOverTime: "ACTIVITY OVER TIME", unitEngagement: "UNIT ENGAGEMENT" },
    trailoo: { meta: "SHOPPING JOURNEY / DEMO", navigation: "STORE NAVIGATION", trolley: "YOUR TROLLEY", checkout: "CHECKOUT" },
  },
  id: {
    wms: { title: "Ringkasan gudang", meta: "OPERASIONAL / DEMO", capacity: "KAPASITAS", inbound: "BARANG MASUK", queue: "ANTREAN", network: "JARINGAN GUDANG", flow: "ALUR BARANG MASUK" },
    dice: { title: "Aktivasi budaya", meta: "PELAPORAN / RINGKASAN", activities: "KEGIATAN", participation: "PARTISIPASI", reviewed: "DITINJAU", activityOverTime: "KEGIATAN PER WAKTU", unitEngagement: "PARTISIPASI UNIT" },
    trailoo: { meta: "ALUR BELANJA / DEMO", navigation: "NAVIGASI TOKO", trolley: "TROLLEY ANDA", checkout: "PEMBAYARAN" },
  },
} as const;

function Preview({ type, lang, label, caption }: { type: "wms" | "dice" | "trailoo"; lang: "en" | "id"; label: string; caption: string }) {
  const p = previewCopy[lang];
  return <div className={`preview preview-${type}`} role="img" aria-label={label}>
    <div className="preview-caption"><span>{type === "wms" ? "01 / WMS" : type === "dice" ? "02 / DICE" : "03 / TRAILOO"}</span><span>{caption}</span></div>
    <div className="preview-screen">
      {type === "wms" && <div className="mock-app mock-wms">
        <div className="mock-sidebar"><b>W<span>·</span></b><i /><i /><i /><i /></div>
        <div className="mock-content"><div className="mock-topline"><strong>{p.wms.title}</strong><span>{p.wms.meta}</span></div>
          <div className="wms-summary"><div><small>{p.wms.capacity}</small><strong>—</strong><span className="mock-line" /></div><div><small>{p.wms.inbound}</small><strong>—</strong><span className="mock-line" /></div><div><small>{p.wms.queue}</small><strong>—</strong><span className="mock-line" /></div></div>
          <div className="wms-panels"><div className="wms-map"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><i className="map-pin pin-one" /><i className="map-pin pin-two" /><i className="map-pin pin-three" /><span className="map-label">{p.wms.network}</span></div><div className="wms-list"><small>{p.wms.flow}</small><i /><i /><i /><i /></div></div>
        </div></div>}
      {type === "dice" && <div className="mock-app mock-dice">
        <div className="mock-sidebar"><b>D<span>·</span></b><i /><i /><i /><i /></div>
        <div className="mock-content"><div className="mock-topline"><strong>{p.dice.title}</strong><span>{p.dice.meta}</span></div>
          <div className="dice-summary"><div><small>{p.dice.activities}</small><strong>—</strong></div><div><small>{p.dice.participation}</small><strong>—</strong></div><div><small>{p.dice.reviewed}</small><strong>—</strong></div></div>
          <div className="dice-panels"><div className="dice-chart"><small>{p.dice.activityOverTime}</small><div className="dice-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-baseline" /></div><div className="dice-ranking"><small>{p.dice.unitEngagement}</small><span><i /></span><span><i /></span><span><i /></span><span><i /></span></div></div>
        </div></div>}
      {type === "trailoo" && <div className="mock-app mock-trailoo">
        <div className="trailoo-head"><strong>trailoo<span>°</span></strong><span>{p.trailoo.meta}</span></div>
        <div className="trailoo-content"><div className="trailoo-route"><small>{p.trailoo.navigation}</small><div className="shelf shelf-one" /><div className="shelf shelf-two" /><div className="shelf shelf-three" /><div className="shelf shelf-four" /><div className="shelf shelf-five" /><div className="shelf shelf-six" /><div className="route-path" /><i className="route-start" /><i className="route-end" /></div><div className="trailoo-basket"><small>{p.trailoo.trolley}</small><div className="basket-item"><i /><span /></div><div className="basket-item"><i /><span /></div><div className="basket-item"><i /><span /></div><div className="basket-total"><span>{p.trailoo.checkout}</span><b>↗</b></div></div></div>
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
          const card = entry.querySelector<HTMLElement>(".journey-card");
          const dot = entry.querySelector<HTMLElement>(".journey-dot");
          const connector = entry.querySelector<HTMLElement>(".journey-connector");
          if (!card || !dot || !connector) return;

          gsap.fromTo(dot, { scale: .7, backgroundColor: "#b9bab2" }, { scale: 1, backgroundColor: "#9f4f3d", ease: "none", scrollTrigger: { trigger: entry, start: "center 65%", end: "center center", scrub: .45 } });
          gsap.set(connector, { scaleX: 0 });
          const highlight = gsap.timeline({ paused: true })
            .to(connector, { scaleX: 1, duration: .22, ease: "power2.out" }, 0)
            .to(card, { borderColor: "#9f4f3d", boxShadow: "0 18px 45px -34px #9f4f3d80", duration: .24, ease: "power2.out" }, 0);

          const activation = ScrollTrigger.create({
            trigger: entry,
            start: "center 65%",
            end: "center center",
            onEnter: () => highlight.play(),
            onLeave: () => highlight.reverse(),
            onEnterBack: () => highlight.play(),
            onLeaveBack: () => highlight.reverse(),
          });
          if (activation.isActive) highlight.play();
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((node) => {
          gsap.fromTo(node, { y: 32 }, { y: 0, ease: "none", scrollTrigger: { trigger: node, start: "top 90%", end: "top 60%", scrub: .5 } });
        });
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return <div ref={root} className={`site ${homeStyles.page}`}>
    <header className="header">
      <a className="brand" href="#home">Haikal Abizar<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#work">{t.nav[0]}</a><a href="#journey">{t.nav[1]}</a><a href="#contact">{t.nav[2]}</a></nav>
      <div className="languages" aria-label="Language"><button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button><button type="button" aria-pressed={lang === "id"} onClick={() => setLang("id")}>ID</button></div>
    </header>

    <main id="home">
      <section className="hero wrap hero-distill-structure hero-polish-hierarchy">
        <div className="hero-copy"><p className="eyeline"><i />{t.role}</p><h1>Haikal<br />Abizar<span>.</span></h1><h2>{t.lead}</h2><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button primary" href="#work">{t.explore}<span aria-hidden="true">↗</span></a><a className="button contact-outline" href="#contact">{t.contact}<span aria-hidden="true">↗</span></a></div><p className="hero-availability"><i aria-hidden="true" />{t.availability}<span aria-hidden="true"> · </span>{t.opportunity}</p></div>
        <div className="portrait"><div className="portrait-inner"><Image src="/haikal-portrait-editorial.png" alt={lang === "en" ? "Formal portrait of Haikal Abizar" : "Potret formal Haikal Abizar"} fill priority sizes="(max-width: 650px) 300px, (max-width: 950px) 40vw, 435px" /></div><small>HA / 2026</small></div>
      </section>
      <section id="work" className="selected-work"><div className="wrap"><div className="selected-heading"><h2>{t.selected}</h2><p>{t.selectedIntro}</p></div><ProjectStack lang={lang} projects={([
        { id: "wms", name: "WMS", data: t.wms },
        { id: "dice", name: "DICE", data: t.dice },
        { id: "trailoo", name: "TRAILOO", data: t.trailoo },
      ] as const).map(project => ({ id: project.id, name: project.name, title: project.data[0], description: project.data[1], tags: project.data[2].split(" · ") }))} preview={type => <Preview type={type} lang={lang} label={`${type.toUpperCase()} — ${t.previewLabel}`} caption={t.previewLabel} />} /></div></section>
      <ExpertiseSummary lang={lang} />
      <section id="journey" className="journey"><div className="wrap journey-grid">
        <div className="journey-list">
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{t.now} · WMS / DICE</span><h3>{t.nowChapter[0]}</h3><strong>Perum BULOG</strong><p>{t.nowChapter[1]}</p><span className="journey-date">Jan 2026 — {t.now}</span></article><span className="journey-connector" aria-hidden="true" /><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{t.before} · Software development</span><h3>{t.beforeChapter[0]}</h3><strong>Perum BULOG</strong><p>{t.beforeChapter[1]}</p><span className="journey-date">{lang === "en" ? "Feb – Dec 2025" : "Feb – Des 2025"}</span></article><span className="journey-connector" aria-hidden="true" /><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{lang === "en" ? "Training" : "Pelatihan"}</span><h3>Fullstack Developer</h3><strong>Coding Camp · DBS Foundation</strong><p>{lang === "en" ? "I developed web applications with React, Node.js, and Express, built REST APIs, and integrated relational and non-relational databases." : "Saya mengembangkan aplikasi web dengan React, Node.js, dan Express, membangun REST API, serta mengintegrasikan database relasional dan nonrelasional."}</p><span className="journey-date">Feb – Jun 2025</span></article><span className="journey-connector" aria-hidden="true" /><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{t.foundation} · Lead laboratory assistant</span><h3>{t.lab[0]}</h3><strong>{lang === "en" ? "Gunadarma University · Informatics Engineering Lab" : "Universitas Gunadarma · Laboratorium Teknik Informatika"}</strong><p>{t.lab[1]}</p><span className="journey-date">{lang === "en" ? "Oct 2024 – Nov 2025" : "Okt 2024 – Nov 2025"}</span></article><span className="journey-connector" aria-hidden="true" /><span className="journey-dot" aria-hidden="true" /></div>
          <div className="journey-entry"><article className="journey-card"><span className="journey-card-label">{lang === "en" ? "Training" : "Pelatihan"}</span><h3>Mobile Development</h3><strong>Bangkit Academy</strong><p>{lang === "en" ? "I integrated machine learning models and Google Maps into Android applications. As a Student Representative, I also shared my experience as a speaker during the program’s outreach." : "Saya mengintegrasikan model machine learning dan Google Maps ke aplikasi Android. Sebagai Student Representative, saya juga berbagi pengalaman sebagai pembicara dalam sosialisasi program."}</p><span className="journey-date">{lang === "en" ? "Feb – Aug 2024" : "Feb – Agu 2024"}</span></article><span className="journey-connector" aria-hidden="true" /><span className="journey-dot" aria-hidden="true" /></div>
        </div>
        <div className="journey-track" aria-hidden="true"><span className="journey-progress" /></div>
        <div className="journey-intro"><span className="section-number">{t.nav[1]}</span><h2>{t.workTitle}</h2><p>{t.workIntro}</p><a className="resume-link" href="/Haikal-Abizar-Resume.pdf" download="Haikal-Abizar-Resume.pdf">{t.resume}<span aria-hidden="true">↓</span></a><div className="journey-education"><strong>{t.education}</strong><span>{t.educationDetail}</span><span>BNSP Certified Programmer</span></div></div>
      </div></section>
    </main>

    <PortfolioFooter lang={lang} />
  </div>;
}
