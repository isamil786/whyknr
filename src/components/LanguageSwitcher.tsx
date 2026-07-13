"use client";

import { useLanguage } from "@/lib/language-context";

const languages = [
  { code: "en" as const, label: "EN", script: "A" },
  { code: "te" as const, label: "తె", script: "అ" },
  { code: "hi" as const, label: "हि", script: "अ" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full bg-stone-100 p-0.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`relative rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
            language === lang.code
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200/50"
              : "text-stone-600 hover:text-orange-600"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
