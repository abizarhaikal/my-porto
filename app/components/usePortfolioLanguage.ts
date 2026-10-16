"use client";

import { useEffect, useSyncExternalStore } from "react";

export type PortfolioLanguage = "en" | "id";

const storageKey = "portfolio-language";
const changeEvent = "portfolio-language-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function getSnapshot(): PortfolioLanguage {
  return window.localStorage.getItem(storageKey) === "id" ? "id" : "en";
}

function getServerSnapshot(): PortfolioLanguage {
  return "en";
}

export default function usePortfolioLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(value: PortfolioLanguage) {
    window.localStorage.setItem(storageKey, value);
    window.dispatchEvent(new Event(changeEvent));
  }

  return [lang, setLang] as const;
}
