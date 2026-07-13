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
      setTimeout(() => {
        const contentArea = document.getElementById("main-content-start");
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // Filter by date
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

  const heroArticle = activeFeatured[0] ?? activeLatest[0];
  const supportingStories =
    activeFeatured.length > 1
      ? activeFeatured.slice(1)
      : activeLatest.slice(1, 4);

  const regularArticles = activeLatest.filter(
    (article) => !activeFeatured.some((featured) => featured.id === article.id)
  );

  const hasNews = activeLatest.length > 0;

  const getTitle = (article: Article) =>
    language === "te" ? article.titleTe : language === "hi" ? article.titleHi : article.title;

  const getExcerpt = (article: Article) =>
    language === "te" ? article.excerptTe : language === "hi" ? article.excerptHi : article.excerpt;

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 text-white animate-gradient">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute right-1/3 top-1/2 h-24 w-24 rounded-full bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="max-w-2xl animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-sm">
                {t("voice")}
              </span>
              <h1
                className="mt-5 text-4xl font-black leading-[1.1] md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
              >
                Why<span className="text-orange-200">.</span>Karimnagar
              </h1>
              <p className="mt-4 text-base text-orange-100/90 leading-relaxed sm:text-lg">{t("tagline")}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/why.karimnagar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-orange-700 shadow-lg shadow-orange-900/20 transition hover:shadow-xl hover:shadow-orange-900/30 hover:scale-[1.02]"
                >
                  {t("follow")}
                  <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Today's coverage card */}
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur animate-fade-in-up" style={{ animationDelay: "200ms" }}>
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
                  const title = getTitle(article);
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

      {/* Main Content */}
      <div id="main-content-start" className="mx-auto max-w-6xl px-4 py-10">
        {/* Date filter banner */}
        {filterDate && (
          <div className="mb-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 p-4 shadow-sm animate-slide-down">
            <span className="flex items-center gap-2 text-sm font-semibold text-orange-800">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              {language === "te" ? "తేదీ:" : language === "hi" ? "तारीख:" : "Date:"}{" "}
              <span className="font-bold">{filterDate}</span>
            </span>
            <button
              onClick={() => setFilterDate("")}
              className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-orange-700 shadow-sm"
            >
              {language === "te" ? "అన్నీ చూపించు" : language === "hi" ? "सभी दिखाएं" : "Clear Filter"}
            </button>
          </div>
        )}

        {!hasNews ? (
          <div className="rounded-3xl border-2 border-dashed border-stone-200 py-20 text-center animate-fade-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100">
              <svg className="h-8 w-8 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-stone-500">
              {language === "te"
                ? "ఈ తేదీన ప్రచురించిన వార్తలు లేవు."
                : language === "hi"
                ? "इस तारीख को कोई खबर प्रकाशित नहीं हुई।"
                : "No news articles published on this date."}
            </p>
            <button
              onClick={() => setFilterDate("")}
              className="mt-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:opacity-90 hover:shadow-xl"
            >
              {language === "te" ? "అన్ని వార్తలను చూడండి" : language === "hi" ? "सभी समाचार देखें" : "View All News"}
            </button>
          </div>
        ) : (
          <>
            {/* Hero Article */}
            {heroArticle && (
              <section className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] animate-fade-in-up">
                <Link
                  href={`/article/${heroArticle.slug}`}
                  className="card-hover card-shine group overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm"
                >
                  <div className="image-gradient-overlay relative aspect-[16/10] overflow-hidden">
                    <MediaPlayer
                      mediaType={heroArticle.mediaType}
                      mediaUrl={heroArticle.mediaUrl}
                      title={getTitle(heroArticle)}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Overlay text for hero */}
                    <div className="absolute bottom-0 left-0 right-0 z-[2] p-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-600/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        {t("topStory")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-stone-400">
                        {formatDate(heroArticle.publishedAt)}
                      </span>
                    </div>
                    <h2
                      className="text-2xl font-extrabold leading-tight text-stone-900 transition group-hover:text-orange-600"
                      style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
                    >
                      {getTitle(heroArticle)}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-500">
                      {getExcerpt(heroArticle) ||
                        (language === "te"
                          ? "Why.Karimnagar నుండి పూర్తి నివేదిక చదవండి."
                          : language === "hi"
                          ? "Why.Karimnagar से पूरी रिपोर्ट पढ़ें।"
                          : "Read the full report from Why.Karimnagar.")}
                    </p>
                  </div>
                </Link>

                <div className="stagger-children space-y-4">
                  {supportingStories.map((article) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="card-hover group block rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm"
                    >
                      <h3
                        className="mt-1 font-bold text-stone-900 leading-snug transition group-hover:text-orange-600"
                        style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
                      >
                        {getTitle(article)}
                      </h3>
                      <p className="mt-2 text-sm text-stone-400">
                        {formatDate(article.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <AdSlot slotId="home-top" className="mb-12" />

            {/* Video Highlights */}
            {activeVideo.length > 0 && (
              <section className="mb-12 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <div className="mb-6 flex items-center justify-between">
                  <h2
                    className="flex items-center gap-3 text-2xl font-extrabold text-stone-900"
                    style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
                  >
                    <span className="flex h-8 w-1 rounded-full bg-gradient-to-b from-red-500 to-red-600" />
                    {t("videoHighlights")}
                  </h2>
                </div>
                <div className="stagger-children grid gap-6 md:grid-cols-3">
                  {activeVideo.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Latest News */}
            {regularArticles.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <h2
                  className="mb-6 flex items-center gap-3 text-2xl font-extrabold text-stone-900"
                  style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
                >
                  <span className="flex h-8 w-1 rounded-full bg-gradient-to-b from-orange-500 to-orange-600" />
                  {t("latestNews")}
                </h2>
                <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {regularArticles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
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
