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

  const instagramButtonText =
    language === "te" ? "ఇన్‌స్టాగ్రామ్ @why.karimnagar" : language === "hi" ? "इंस्टाग्राम @why.karimnagar" : "Instagram @why.karimnagar";

  const rightsText =
    language === "te"
      ? "అన్ని హక్కులు ప్రత్యేకించబడినవి."
      : language === "hi"
      ? "सर्वाधिकार सुरक्षित।"
      : "All rights reserved.";

  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-black text-white">
              Why<span className="text-orange-500">.</span>Karimnagar
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              {description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">{categoriesHeading}</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "breaking-news",
                "local-news",
                "politics",
                "events",
                "in-focus",
              ].map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/category/${slug}`}
                    className="capitalize transition hover:text-orange-400"
                  >
                    {getCategoryName(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">{followUsHeading}</h4>
            <a
              href="https://www.instagram.com/why.karimnagar/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {instagramButtonText}
            </a>
            <p className="mt-4 text-xs text-stone-500">
              © {new Date().getFullYear()} Why.Karimnagar. {rightsText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
