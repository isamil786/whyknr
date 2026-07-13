"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t, language } = useLanguage();

  const getCategoryName = (slug: string) => {
    switch (slug) {
      case "breaking-news":
        return t("breaking");
      case "local-news":
        return t("local");
      case "politics":
        return t("politics");
      case "events":
        return t("events");
      case "in-focus":
        return t("focus");
      default:
        return slug.replace(/-/g, " ");
    }
  };

  const description =
    language === "te"
      ? "కరీమ్‌నగర్ వార్తలు, నవీకరణలు మరియు కథనాల కోసం మీ విశ్వసనీయ మూలం. జిల్లా అంతటా స్థానిక సంఘటనలు, రాజకీయాలు మరియు సంఘటనలను కవర్ చేస్తుంది."
      : language === "hi"
      ? "करीमनगर के समाचार, अपडेट और कहानियों के लिए आपका विश्वसनीय स्रोत। पूरे जिले में स्थानीय घटनाओं, राजनीति और सामुदायिक गतिविधियों को कवर करता है।"
      : "Your trusted source for Karimnagar news, updates, and stories. Covering local events, politics, and community happenings across the district.";

  const categoriesHeading =
    language === "te" ? "వర్గాలు" : language === "hi" ? "श्रेणियाँ" : "Categories";

  const followUsHeading =
    language === "te" ? "మమ్మల్ని ఫాలో చేయండి" : language === "hi" ? "हमें फॉलो करें" : "Follow Us";

  const rightsText =
    language === "te"
      ? "అన్ని హక్కులు ప్రత్యేకించబడినవి."
      : language === "hi"
      ? "सर्वाधिकार सुरक्षित।"
      : "All rights reserved.";

  const backToTopText =
    language === "te"
      ? "పైకి వెళ్ళండి"
      : language === "hi"
      ? "ऊपर जाएं"
      : "Back to Top";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-900 text-stone-300">
      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 animate-gradient" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3
              className="text-xl font-black text-white"
              style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
            >
              Why<span className="text-orange-500">.</span>Karimnagar
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400/70">
              {language === "te"
                ? "విషయాలు · నిర్భయ · విశ్వాసాన్ని"
                : language === "hi"
                ? "तथ्य · निर्भीक · निष्पक्ष"
                : "Facts · Fearless · Faithful"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              {description}
            </p>
          </div>


          {/* Follow Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
              {followUsHeading}
            </h4>
            <div className="mt-4 space-y-3">
              <a
                href="https://www.instagram.com/why.karimnagar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 shadow-lg shadow-purple-900/20"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
                @why.karimnagar
              </a>
            </div>
          </div>

          {/* Back to Top + Info */}
          <div className="flex flex-col justify-between">
            <div>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 rounded-xl border border-stone-700 px-4 py-3 text-sm font-semibold text-stone-400 transition hover:border-orange-500 hover:text-orange-400"
              >
                <svg
                  className="h-4 w-4 transition group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                {backToTopText}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-6 sm:flex-row">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Why.Karimnagar. {rightsText}
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-stone-600">
            {language === "te"
              ? "కరీమ్‌నగర్ వాయిస్"
              : language === "hi"
              ? "करीमनगर की आवाज़"
              : "Karimnagar's Voice"}
          </p>
        </div>
      </div>
    </footer>
  );
}
