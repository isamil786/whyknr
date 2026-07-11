"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-xs font-semibold text-stone-600">{t("language")}:</span>
      <div className="flex gap-1">
        <button
          onClick={() => setLanguage("en")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            language === "en"
              ? "bg-orange-600 text-white"
              : "bg-stone-200 text-stone-700 hover:bg-stone-300"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("te")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            language === "te"
              ? "bg-orange-600 text-white"
              : "bg-stone-200 text-stone-700 hover:bg-stone-300"
          }`}
        >
          TE
        </button>
        <button
          onClick={() => setLanguage("hi")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            language === "hi"
              ? "bg-orange-600 text-white"
              : "bg-stone-200 text-stone-700 hover:bg-stone-300"
          }`}
        >
          HI
        </button>
      </div>
    </div>
  );
}
