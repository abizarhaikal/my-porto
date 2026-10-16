"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { detail } from "../work/projects";
import styles from "./ProjectStack.module.css";

export type ProjectType = "wms" | "dice" | "trailoo";
type Project = { id: ProjectType; name: string; title: string; description: string; tags: string[] };
type Selection = { id: ProjectType; x: number; y: number };

export default function ProjectStack({ projects, lang, preview }: { projects: Project[]; lang: "en" | "id"; preview: (id: ProjectType) => ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const t = detail[lang];
  const selected = projects.find((project) => project.id === selection?.id);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const slots = gsap.utils.toArray<HTMLElement>("[data-project-slot]");
        slots.slice(0, -1).forEach((slot, index) => {
          gsap.to(slot.querySelector("[data-project-card]"), {
            scale: .94, opacity: .45, y: -16, ease: "none",
            scrollTrigger: { trigger: slots[index + 1], start: "top 85%", end: "top top", scrub: true },
          });
        });
      });
      return () => media.revert();
    }, root);
    return () => ctx.revert();
  }, [lang]);

  useEffect(() => {
    const node = dialog.current;
    if (!selection || !node) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closing.current = false;
    node.showModal();
    node.scrollTop = 0;
    const splash = node.querySelector("[data-splash]");
    const sheet = node.querySelector("[data-project-sheet]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const radius = Math.hypot(window.innerWidth, window.innerHeight);
    gsap.set(node, { opacity: 1, clipPath: reduced ? "none" : `circle(0px at ${selection.x}px ${selection.y}px)` });
    gsap.set(splash, { autoAlpha: reduced ? 0 : 1 });
    gsap.set(sheet, { opacity: reduced ? 1 : 0 });
    if (!reduced) {
      transition.current = gsap.timeline()
        .to(node, { clipPath: `circle(${radius}px at ${selection.x}px ${selection.y}px)`, duration: .65, ease: "power4.inOut" })
        .set(node, { clipPath: "none" })
        .fromTo(splash?.querySelector("span") ?? null, { scale: .85, rotation: -8 }, { scale: 1, rotation: 0, duration: .6, ease: "power3.out" }, .1)
        .to(splash, { autoAlpha: 0, duration: .3 }, .55)
        .to(sheet, { opacity: 1, duration: .35 }, .65);
    }
    return () => {
      transition.current?.kill();
      if (node.open) node.close();
      document.body.style.overflow = oldOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [selection]);

  function open(project: Project, event: MouseEvent<HTMLButtonElement>) {
    opener.current = event.currentTarget;
    setSelection({ id: project.id, x: event.detail ? event.clientX : window.innerWidth / 2, y: event.detail ? event.clientY : window.innerHeight / 2 });
  }

  function close() {
    if (closing.current) return;
    closing.current = true;
    transition.current?.kill();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    transition.current = gsap.timeline().to(dialog.current, { opacity: 0, duration: reduced ? 0 : .2, onComplete: () => setSelection(null) });
  }

  return <div ref={root} className={styles.stack}>
    {projects.map((project, index) => <div key={project.id} className={styles.slot} data-project-slot style={{ zIndex: index + 1 }}>
      <article className={`${styles.card} ${styles[project.id]}`} data-project-card>
        <div className={styles.copy}>
          <span className={styles.identifier}>{project.name} <span>0{index + 1} / 03</span></span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className={styles.visual}>{preview(project.id)}<span className={styles.visualCaption}>{project.name} <span>— {lang === "en" ? "Illustrative preview" : "Preview ilustratif"}</span></span></div>
        <button type="button" className={styles.open} aria-label={`${t.view}: ${project.name}`} onClick={event => open(project, event)}><span>{t.view} <b aria-hidden="true">↗</b></span></button>
        <Link className={styles.caseLink} href={`/work/${project.id}`}>{lang === "en" ? "Read case study" : "Baca studi kasus"} <span aria-hidden="true">↗</span></Link>
      </article>
    </div>)}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="project-detail-title" onCancel={event => { event.preventDefault(); close(); }}>
      {selected && <>
        <div className={styles.splash} data-splash aria-hidden="true"><span>{selected.name}<i>↗</i></span></div>
        <div className={styles.sheet} data-project-sheet>
          <div className={styles.detailTop}><span>Haikal Abizar / {selected.name}</span><button type="button" onClick={close}>{t.close} <span aria-hidden="true">×</span></button></div>
          <div className={styles.detailIntro}><span>{selected.name}</span><h2 id="project-detail-title">{selected.title}</h2></div>
          <div className={styles.detailPreview}>{preview(selected.id)}</div>
          <div className={styles.detailGrid}><section><h3>{t.context}</h3><p>{t[selected.id][0]}</p></section><section><h3>{t.contribution}</h3><p>{selected.description}</p><h3>{t.built}</h3><ul>{t[selected.id][1].map(item => <li key={item}>{item}</li>)}</ul></section></div>
          <p className={styles.note}>{t.note}</p>
          <Link className={styles.caseDetailLink} href={`/work/${selected.id}`}>{lang === "en" ? "Read full case study" : "Baca studi kasus lengkap"} <span aria-hidden="true">↗</span></Link>
          <button className={styles.back} type="button" onClick={close}>{t.close} <span aria-hidden="true">↙</span></button>
        </div>
      </>}
    </dialog>
  </div>;
}
