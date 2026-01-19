"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const languages = [
    { code: "en", label: "EN" },
    { code: "sv", label: "SV" },
    { code: "fi", label: "FI" },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code as any)}
          className={`text-xs font-bold transition-colors ${
            locale === lang.code
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
