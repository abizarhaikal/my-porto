"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ExpertiseSummary.module.css";

const copy = {
  en: {
    skills: "Skills & tools",
    skillsIntro: "The tools I use to build software.",
    groups: [
      { title: "Frontend", detail: "Responsive web apps and operational dashboards.", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"], badge: "UI" },
      { title: "Backend", detail: "REST APIs for exchanging data between apps and services, plus database integration.", tools: ["Node.js", "Express", "Prisma", "PostgreSQL"], badge: "API" },
      { title: "Python & computer vision", detail: "Image-feature matching to review possible image reuse.", tools: ["Python", "FastAPI", "OpenCV", "ORB"], badge: "IMG" },
    ],
    supportingTools: "Additional experience: JavaScript, PHP, Laravel, WordPress, and Flutter. Everyday tools: Git, GitHub, Figma, and Postman.",
  },
  id: {
    skills: "Keahlian & alat",
    skillsIntro: "Teknologi yang saya pakai untuk membangun aplikasi.",
    groups: [
      { title: "Frontend", detail: "Aplikasi web responsif dan dashboard operasional.", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"], badge: "UI" },
      { title: "Backend", detail: "REST API untuk pertukaran data antara aplikasi dan layanan, serta integrasi database.", tools: ["Node.js", "Express", "Prisma", "PostgreSQL"], badge: "API" },
      { title: "Python & visi komputer", detail: "Pencocokan fitur gambar untuk meninjau kemungkinan penggunaan ulang gambar.", tools: ["Python", "FastAPI", "OpenCV", "ORB"], badge: "IMG" },
    ],
    supportingTools: "Pengalaman lainnya: JavaScript, PHP, Laravel, WordPress, dan Flutter. Alat kerja: Git, GitHub, Figma, dan Postman.",
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

  useEffect(() => {
    const tickerNode = ticker.current;
    const tickerRegion = tickerNode?.parentElement;
    if (!root.current || !tickerNode || !tickerRegion) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.to(tickerNode, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      let hovered = false;
      let focused = false;
      const syncMotion = () => {
        const bounds = tickerNode.getBoundingClientRect();
        if (document.hidden || hovered || focused || bounds.bottom <= 0 || bounds.top >= innerHeight) animation.pause();
        else animation.play();
      };
      const observer = new IntersectionObserver(syncMotion);
      const onEnter = () => { hovered = true; syncMotion(); };
      const onLeave = () => { hovered = false; syncMotion(); };
      const onFocus = () => { focused = true; syncMotion(); };
      const onBlur = () => { focused = false; syncMotion(); };

      observer.observe(tickerNode);
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
        animation.kill();
      };
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let observer: IntersectionObserver | undefined;
      const ctx = gsap.context(() => {
        observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.hasAttribute("data-word-reveal")) {
            observer?.unobserve(entry.target);
            ctx.add(() => gsap.fromTo(entry.target.querySelectorAll("[data-heading-word]"),
              { y: 10, opacity: .35, filter: "blur(4px)" },
              { y: 0, opacity: 1, filter: "blur(0px)", duration: .65, stagger: .035, ease: "power3.out" }));
          }
        }));
        root.current?.querySelectorAll("[data-word-reveal]").forEach(heading => observer?.observe(heading));
      }, root);
      return () => {
        observer?.disconnect();
        ctx.revert();
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
        <div className={styles.tickerWindow} role="group" tabIndex={0} aria-label={tools.map((tool) => tool.name).join(", ")}>
          <div className={styles.tickerTrack} ref={ticker} aria-hidden="true">
            {[...tools, ...tools].map((tool, index) => <span className={styles.toolBadge} key={`${tool.name}-${index}`}>
              <Image src={tool.image} alt="" width={112} height={112} sizes="(max-width: 560px) 86px, 112px" />
              <small>{tool.name}</small>
            </span>)}
          </div>
        </div>
        <div className={styles.skillGroups}>
          {t.groups.map(({ title, detail, tools, badge }) => <article className={styles.skillGroup} key={title}>
            <span className={styles.groupBadge} aria-hidden="true">{badge}</span>
            <h3>{title}</h3><p>{detail}</p>
            <div className={styles.groupTools}>{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </article>)}
        </div>
        <p className={styles.supportingTools}>{t.supportingTools}</p>
      </div>
    </section>
  </div>;
}
