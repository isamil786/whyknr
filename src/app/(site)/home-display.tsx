"use client";

import { useState } from "react";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import MediaPlayer from "@/components/MediaPlayer";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import AdSlot from "@/components/AdSlot";
import CalendarDropdown from "@/components/CalendarDropdown";

type Category = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

type Article = {
  id: string;
  title: string;
  titleTe: string;
  titleHi: string;
  slug: string;
  excerpt: string | null;
  excerptTe: string | null;
  excerptHi: string | null;
  content: string;
  contentTe: string;
  contentHi: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string | null;
  featured: boolean;
  published: boolean;
  author: string;
  publishedAt: Date;
  category: Category;
};

type HomeDisplayProps = {
  featuredArticles: Article[];
  latestArticles: Article[];
  videoArticles: Article[];
};

export default function HomeDisplay({
  featuredArticles,
  latestArticles,
  videoArticles,
}: HomeDisplayProps) {
  const { t, language } = useLanguage();
  const [filterDate, setFilterDate] = useState("");

  const handleDateSelect = (date: string) => {
    setFilterDate(date);
    if (date) {
      // Smooth scroll to news content area on mobile/desktop
      setTimeout(() => {
        const contentArea = document.getElementById("main-content-start");
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // 1. Sync filter: Filter the source news lists by date if a date filter is selected
  const activeLatest = filterDate
    ? latestArticles.filter(
        (article) =>
          new Date(article.publishedAt).toISOString().split("T")[0] === filterDate
      )
    : latestArticles;

  const activeFeatured = filterDate
    ? featuredArticles.filter(
        (article) =>
          new Date(article.publishedAt).toISOString().split("T")[0] === filterDate
      )
    : featuredArticles;

  const activeVideo = filterDate
    ? videoArticles.filter(
        (article) =>
          new Date(article.publishedAt).toISOString().split("T")[0] === filterDate
      )
    : videoArticles;

  // 2. Re-calculate Hero, Supporting and Regular articles dynamically based on active filtered lists
  const heroArticle = activeFeatured[0] ?? activeLatest[0];
  const supportingStories =
    activeFeatured.length > 1
      ? activeFeatured.slice(1)
      : activeLatest.slice(1, 4);

  const regularArticles = activeLatest.filter(
    (article) => !activeFeatured.some((featured) => featured.id === article.id)
  );

  const hasNews = activeLatest.length > 0;

  return (
    <div className="bg-stone-50">
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em]">
                {t("voice")}
              </span>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                Why<span className="text-orange-200">.</span>Karimnagar
              </h1>
              <p className="mt-4 text-lg text-orange-100">{t("tagline")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/why.karimnagar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-orange-700 transition hover:bg-orange-50"
                >
                  {t("follow")} →
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">
                  {t("todayCoverage")}
                </p>
                <CalendarDropdown
                  selectedDate={filterDate}
                  onSelectDate={handleDateSelect}
                  language={language}
                />
              </div>
              <div className="space-y-3">
                {activeLatest.slice(0, 3).map((article) => {
                  const title =
                    language === "te"
                      ? article.titleTe
                      : language === "hi"
                      ? article.titleHi
                      : article.title;
                  return (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="block rounded-2xl bg-black/10 p-3 transition hover:bg-black/20"
                    >
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-xs text-orange-100">
                        {formatDate(article.publishedAt)}
                      </p>
                    </Link>
                  );
                })}
                {activeLatest.length === 0 && (
                  <p className="text-xs text-orange-200 py-4 text-center">
                    {language === "te"
                      ? "ఈ తేదీన ఎటువంటి సమాచారం లేదు."
                      : language === "hi"
                      ? "इस तारीख को कोई समाचार उपलब्ध नहीं है।"
                      : "No articles available on this date."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target anchor for smooth scroll */}
      <div id="main-content-start" className="mx-auto max-w-6xl px-4 py-10">
        {filterDate && (
          <div className="mb-8 flex items-center justify-between rounded-2xl bg-orange-50 border border-orange-100 p-4 shadow-sm">
            <span className="text-sm font-semibold text-orange-800">
              {language === "te" ? "తేదీ ఆధారంగా శోధించబడింది:" : language === "hi" ? "तारीख से फ़िल्टर किया गया:" : "Filtered by Date:"}{" "}
              <span className="font-bold">{filterDate}</span>
            </span>
            <button
              onClick={() => setFilterDate("")}
              className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition shadow-sm"
            >
              {language === "te" ? "అన్నీ చూపించు" : language === "hi" ? "सभी दिखाएं" : "Clear Filter"}
            </button>
          </div>
        )}

        {!hasNews ? (
          <div className="rounded-3xl border-2 border-dashed border-stone-200 py-20 text-center">
            <p className="text-stone-500 font-medium text-lg">
              {language === "te"
                ? "ఈ తేదీన ప్రచురించిన వార్తలు లేవు."
                : language === "hi"
                ? "इस तारीख को कोई खबर प्रकाशित नहीं हुई।"
                : "No news articles published on this date."}
            </p>
            <button
              onClick={() => setFilterDate("")}
              className="mt-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 hover:opacity-90 transition"
            >
              {language === "te" ? "అన్ని వార్తలను చూడండి" : language === "hi" ? "सभी समाचार देखें" : "View All News"}
            </button>
          </div>
        ) : (
          <>
            {heroArticle && (
              <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                {(() => {
                  const heroTitle =
                    language === "te"
                      ? heroArticle.titleTe
                      : language === "hi"
                      ? heroArticle.titleHi
                      : heroArticle.title;
                  const heroExcerpt =
                    language === "te"
                      ? heroArticle.excerptTe
                      : language === "hi"
                      ? heroArticle.excerptHi
                      : heroArticle.excerpt;
                  return (
                    <Link
                      href={`/article/${heroArticle.slug}`}
                      className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <MediaPlayer
                          mediaType={heroArticle.mediaType}
                          mediaUrl={heroArticle.mediaUrl}
                          title={heroTitle}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                            {t("topStory")}
                          </span>
                          <span className="text-sm text-stone-400">
                            {formatDate(heroArticle.publishedAt)}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black leading-tight text-stone-900 group-hover:text-orange-600">
                          {heroTitle}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-stone-600">
                          {heroExcerpt ||
                            (language === "te"
                              ? "Why.Karimnagar నుండి పూర్తి నివేదిక చదవండి."
                              : language === "hi"
                              ? "Why.Karimnagar से पूरी रिपोर्ट पढ़ें।"
                              : "Read the full report from Why.Karimnagar.")}
                        </p>
                      </div>
                    </Link>
                  );
                })()}

                <div className="space-y-4">
                  {supportingStories.map((article) => {
                    const title =
                      language === "te"
                        ? article.titleTe
                        : language === "hi"
                        ? article.titleHi
                        : article.title;
                    return (
                      <Link
                        key={article.id}
                        href={`/article/${article.slug}`}
                        className="block rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                          {article.category.name}
                        </p>
                        <h3 className="mt-2 font-bold text-stone-900">{title}</h3>
                        <p className="mt-2 text-sm text-stone-500">
                          {formatDate(article.publishedAt)}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            <AdSlot slotId="home-top" className="mb-10" />

            {activeVideo.length > 0 && (
              <section className="mb-10">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-2xl font-black text-stone-900">
                    <span className="h-6 w-1 rounded-full bg-red-600" />
                    {t("videoHighlights")}
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {activeVideo.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {regularArticles.length > 0 && (
              <section>
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-stone-900">
                  <span className="h-6 w-1 rounded-full bg-orange-600" />
                  {t("latestNews")}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {regularArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
