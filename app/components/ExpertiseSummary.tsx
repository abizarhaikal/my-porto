"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ExpertiseSummary.module.css";

const copy = {
  en: {
    skills: "Skills & tools", skillsIntro: "The tools I use to build software.",
    groups: [
      { title: "Frontend", detail: "Responsive web apps and operational dashboards.", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"], badge: "UI" },
      { title: "Backend", detail: "REST APIs, backend services, and database integration.", tools: ["Node.js", "Express", "Prisma", "PostgreSQL"], badge: "API" },
      { title: "Python & computer vision", detail: "Image feature extraction and matching for image-fraud checks.", tools: ["Python", "FastAPI", "OpenCV", "ORB"], badge: "IMG" },
    ],
    summary: "About me", summaryIntro: "I build interfaces and the services behind them.",
    focus: "Full-stack, frontend focused", focusDetail: "Software engineer at Perum BULOG. Computer Science graduate from Gunadarma University.",
    labels: ["Flutter", "Android"], graduated: "Graduated", projects: "Featured projects",
    steps: ["Understand", "Build", "Integrate", "Refine"],
    portrait: "Portrait of Haikal Abizar",
  },
  id: {
    skills: "Keahlian & alat", skillsIntro: "Teknologi yang saya pakai untuk membangun aplikasi.",
    groups: [
      { title: "Frontend", detail: "Aplikasi web responsif dan dashboard operasional.", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"], badge: "UI" },
      { title: "Backend", detail: "REST API, layanan backend, dan integrasi database.", tools: ["Node.js", "Express", "Prisma", "PostgreSQL"], badge: "API" },
      { title: "Python & computer vision", detail: "Ekstraksi dan pencocokan fitur gambar untuk membantu pemeriksaan kecurangan.", tools: ["Python", "FastAPI", "OpenCV", "ORB"], badge: "IMG" },
    ],
    summary: "Tentang saya", summaryIntro: "Saya membangun antarmuka dan layanan di baliknya.",
    focus: "Full-stack, fokus frontend", focusDetail: "Software engineer di Perum BULOG. Lulusan Ilmu Komputer Universitas Gunadarma.",
    labels: ["Flutter", "Android"], graduated: "Lulus", projects: "Proyek pilihan",
    steps: ["Pahami", "Bangun", "Integrasikan", "Sempurnakan"],
    portrait: "Potret Haikal Abizar",
  },
} as const;

const tools = [
  { name: "React", image: "/skills/react.webp" },
  { name: "TypeScript", image: "/skills/typescript.webp" },
  { name: "Next.js", image: "/skills/nextjs.webp" },
  { name: "Express", image: "/skills/express.webp" },
  { name: "Prisma", image: "/skills/prisma.webp" },
  { name: "PostgreSQL", image: "/skills/postgresql.webp" },
  { name: "Flutter", image: "/skills/flutter.webp" },
];

export default function ExpertiseSummary({ lang }: { lang: "en" | "id" }) {
  const t = copy[lang];
  const root = useRef<HTMLDivElement>(null);
  const ticker = useRef<HTMLDivElement>(null);
  const floats = useRef<HTMLDivElement>(null);
  const factsCard = useRef<HTMLDivElement>(null);
  const gpa = useRef<HTMLElement>(null);
  const projectCount = useRef<HTMLElement>(null);
  const workflow = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const tickerNode = ticker.current;
    const floatsNode = floats.current;
    if (!root.current || !tickerNode || !floatsNode) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const motion = [
          { element: tickerNode, animation: gsap.to(tickerNode, { xPercent: -50, duration: 28, ease: "none", repeat: -1, paused: true }) },
          { element: floatsNode, animation: gsap.to(floatsNode.querySelectorAll(`.${styles.cursorLabels} > span`), { y: -7, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 1, paused: true }) },
        ];
        const tickerRegion = tickerNode.parentElement!;
        let hovered = false;
        let focused = false;
        const syncMotion = () => {
          motion.forEach(({ element, animation }) => {
            const bounds = element.getBoundingClientRect();
            const tickerStopped = element === tickerNode && (hovered || focused);
            if (document.hidden || tickerStopped || bounds.bottom <= 0 || bounds.top >= innerHeight) animation.pause();
            else animation.play();
          });
        };
        const onEnter = () => { hovered = true; syncMotion(); };
        const onLeave = () => { hovered = false; syncMotion(); };
        const onFocus = () => { focused = true; syncMotion(); };
        const onBlur = () => { focused = false; syncMotion(); };
        const observer = new IntersectionObserver(syncMotion);
        motion.forEach(({ element }) => observer.observe(element));
        tickerRegion.addEventListener("pointerenter", onEnter);
        tickerRegion.addEventListener("pointerleave", onLeave);
        tickerRegion.addEventListener("focusin", onFocus);
        tickerRegion.addEventListener("focusout", onBlur);
        document.addEventListener("visibilitychange", syncMotion);
        return () => {
          observer.disconnect();
          tickerRegion.removeEventListener("pointerenter", onEnter);
          tickerRegion.removeEventListener("pointerleave", onLeave);
          tickerRegion.removeEventListener("focusin", onFocus);
          tickerRegion.removeEventListener("focusout", onBlur);
          document.removeEventListener("visibilitychange", syncMotion);
        };
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (!root.current || !factsCard.current || !workflow.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let countsPlayed = false;
      let workflowPlayed = false;
      let observer: IntersectionObserver | undefined;
      const ctx = gsap.context(() => {
        observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.hasAttribute("data-word-reveal")) {
            observer?.unobserve(entry.target);
            ctx.add(() => gsap.fromTo(entry.target.querySelectorAll("[data-heading-word]"),
              { y: 10, opacity: .35, filter: "blur(4px)" },
              { y: 0, opacity: 1, filter: "blur(0px)", duration: .65, stagger: .035, ease: "power3.out" }));
          }
          if (entry.isIntersecting && entry.target === factsCard.current && !countsPlayed) {
            countsPlayed = true;
            const gpaValue = { value: 0 };
            const projectValue = { value: 0 };
            if (gpa.current) gpa.current.textContent = "0.00";
            if (projectCount.current) projectCount.current.textContent = "00";
            ctx.add(() => {
              gsap.to(gpaValue, { value: 3.95, duration: 1.15, ease: "power2.out", onUpdate: () => { if (gpa.current) gpa.current.textContent = gpaValue.value.toFixed(2); } });
              gsap.to(projectValue, { value: 3, duration: 1, ease: "power2.out", snap: { value: 1 }, onUpdate: () => { if (projectCount.current) projectCount.current.textContent = String(projectValue.value).padStart(2, "0"); } });
            });
          }
          if (entry.isIntersecting && entry.target === workflow.current && !workflowPlayed) {
            workflowPlayed = true;
            const nodes = workflow.current?.querySelectorAll(`.${styles.workflowNode}`);
            if (nodes) {
              ctx.add(() => {
                gsap.set(nodes, { backgroundColor: "#c7c4bb" });
                gsap.to(nodes, { backgroundColor: "#718a70", duration: 0.24, stagger: 0.36, ease: "power1.out" });
              });
            }
          }
        }));
        observer.observe(factsCard.current!);
        observer.observe(workflow.current!);
        root.current?.querySelectorAll("[data-word-reveal]").forEach(heading => observer?.observe(heading));
      }, root);
      return () => {
        observer?.disconnect();
        ctx.revert();
        if (gpa.current) gpa.current.textContent = "3.95";
        if (projectCount.current) projectCount.current.textContent = "03";
      };
    });
    return () => media.revert();
  }, []);

  return <div className={styles.expertise} ref={root}>
    <section id="skills" className={styles.skills} aria-labelledby="expertise-title">
      <div className={styles.skillsInner}>
        <div className={styles.skillsHeading}>
          <span className={styles.eyebrow}>{t.skills}</span>
          <h2 id="expertise-title" aria-label={t.skillsIntro} data-word-reveal>{t.skillsIntro.split(" ").map((word, index) => <span className={styles.headingWord} data-heading-word aria-hidden="true" key={`${word}-${index}`}>{word}&nbsp;</span>)}</h2>
        </div>
        <div className={styles.skillSide}>
          <div className={styles.tickerWindow} role="group" tabIndex={0} aria-label={tools.map((tool) => tool.name).join(", ")}>
            <div className={styles.tickerTrack} ref={ticker} aria-hidden="true">
              {[...tools, ...tools].map((tool, index) => <span className={styles.toolBadge} key={`${tool.name}-${index}`}><Image src={tool.image} alt="" width={112} height={112} sizes="(max-width: 560px) 86px, 112px" /><small>{tool.name}</small></span>)}
            </div>
          </div>
          <div className={styles.skillGroups}>
            {t.groups.map(({ title, detail, tools: stack, badge }) => <article className={styles.skillGroup} key={title}>
              <span className={styles.groupBadge} aria-hidden="true">{badge}</span>
              <h3>{title}</h3><p>{detail}</p>
              <div className={styles.groupTools}>{stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </article>)}
          </div>
          <p className={styles.supportingTools}>{lang === "en" ? "Additional experience: JavaScript, PHP, Laravel, WordPress, and Flutter. Everyday tools: Git, GitHub, Figma, and Postman." : "Pengalaman lainnya: JavaScript, PHP, Laravel, WordPress, dan Flutter. Alat kerja: Git, GitHub, Figma, dan Postman."}</p>
        </div>
      </div>
    </section>

    <section id="summary" className={styles.summary} aria-labelledby="summary-title">
      <div className={styles.summaryInner}>
        <div className={styles.summaryHeading}><span className={styles.eyebrow}>{t.summary}</span><h2 id="summary-title" aria-label={t.summaryIntro} data-word-reveal>{t.summaryIntro.split(" ").map((word, index) => <span className={styles.headingWord} data-heading-word aria-hidden="true" key={`${word}-${index}`}>{word}&nbsp;</span>)}</h2></div>
        <div className={styles.bento}>
          <figure className={styles.portrait}><Image src="/haikal-portrait-editorial.png" alt={t.portrait} fill sizes="(max-width: 700px) 90vw, 28vw" /></figure>
          <article className={styles.focusCard}><span className={styles.cardLabel}>HAIKAL ABIZAR</span><h3>{t.focus}</h3><p>{t.focusDetail}</p><div className={styles.facts} ref={factsCard}><div><strong ref={gpa}>3.95</strong><span>GPA / 4.00</span></div><div><strong>2025</strong><span>{t.graduated}</span></div><div><strong ref={projectCount}>03</strong><span>{t.projects}</span></div></div></article>
          <aside className={styles.collaborators} ref={floats} aria-label={t.labels.join(" · ")}>
            <h3>{lang === "en" ? "Mobile experience" : "Pengalaman mobile"}</h3>
            <p>{lang === "en" ? "Built a Flutter app during my internship and trained in Android development at Bangkit Academy." : "Membangun aplikasi Flutter saat magang dan mengikuti pelatihan pengembangan Android di Bangkit Academy."}</p>
            <div className={styles.cursorLabels}><span>{t.labels[0]}<i aria-hidden="true">H</i></span><span>{t.labels[1]}<i aria-hidden="true">A</i></span></div>
          </aside>
          <div className={styles.workflow}><div className={styles.workflowTitle}><span>WORKFLOW</span><span>01 — 04</span></div><ol ref={workflow}>{t.steps.map((step, index) => <li key={step}><span className={styles.workflowNode} aria-hidden="true" /><i>{String(index + 1).padStart(2, "0")}</i>{step}</li>)}</ol></div>
        </div>
      </div>
    </section>
  </div>;
}
