"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "en" | "te";
/** A bilingual string. */
export type L = { en: string; te: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (x: L) => string };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (x) => x.en });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "te" || q === "en") initial = q;
      else {
        const saved = localStorage.getItem("hs-lang");
        if (saved === "te" || saved === "en") initial = saved;
      }
    } catch {}
    if (initial) setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "te" ? "te" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("hs-lang", l);
    } catch {}
  }, []);

  const t = useCallback((x: L) => (lang === "te" ? x.te : x.en), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Turns "[VERIFY]" / "[EDIT]" markers inside content into visible owner badges. */
function withFlags(s: string) {
  if (!s.includes("[")) return s;
  return s.split(/(\[VERIFY[^\]]*\]|\[EDIT[^\]]*\])/g).map((part, i) =>
    /^\[(VERIFY|EDIT)/.test(part) ? (
      <span key={i} className={`ml-1 inline-block rounded-md px-1.5 py-0.5 align-middle text-[11px] font-extrabold tracking-wide ${part.startsWith("[VERIFY") ? "bg-amber-200 text-amber-900" : "bg-sky-200 text-sky-900"}`}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

/** Render a bilingual string in the current language. */
export function T({ en, te }: L) {
  const { lang } = useLang();
  return <>{withFlags(lang === "te" ? te : en)}</>;
}

/** Render the OTHER language (used for the small "second line" under headings). */
export function TAlt({ en, te }: L) {
  const { lang } = useLang();
  return <>{lang === "te" ? en : te}</>;
}
