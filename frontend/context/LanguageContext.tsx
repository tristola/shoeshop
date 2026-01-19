"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { en } from "@/locales/en";
import { sv } from "@/locales/sv";
import { fi } from "@/locales/fi";

type Locale = "en" | "sv" | "fi";
type Translations = typeof en;

const translations = { en, sv, fi };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("app-locale");
    if (saved && (saved === "en" || saved === "sv" || saved === "fi")) {
      setLocaleState(saved as Locale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("app-locale", newLocale);
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = translations[locale];
    
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
