"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

export default function Header() {
  const { t, language } = useLanguage();
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-stone-900/5" : ""
      }`}
    >
      {/* Top accent bar */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white animate-gradient">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs">
          <span className="font-medium tracking-wide">
            {t("voice")} ·{" "}
            {language === "te"
              ? "తెలంగాణ"
              : language === "hi"
              ? "तेलंगाना"
              : "Telangana"}
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/why.karimnagar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium transition hover:text-orange-200"
            >
              <InstagramIcon />
              <span className="hidden sm:inline">@why.karimnagar</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-stone-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              {!logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo.jpg"
                  alt="Why.Karimnagar Logo"
                  className="h-11 w-11 rounded-xl object-cover shadow-md shadow-orange-100 ring-2 ring-orange-100 transition duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-200"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-lg font-black text-white shadow-md shadow-orange-200 transition duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  W
                </div>
              )}
              <div>
                <h1
                  className="text-xl font-black tracking-tight text-stone-900 transition group-hover:text-orange-600 sm:text-2xl"
                  style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
                >
                  Why<span className="text-orange-600">.</span>Karimnagar
                </h1>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                  {language === "te"
                    ? "విషయాలు · నిర్భయ · విశ్వాసాన్ని"
                    : language === "hi"
                    ? "तथ्य · निर्भीक · निष्पक्ष"
                    : "Facts · Fearless · Faithful"}
                </p>
              </div>
            </Link>

            {/* Language switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
