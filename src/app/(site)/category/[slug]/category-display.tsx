"use client";

import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { useLanguage } from "@/lib/language-context";

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
  content?: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string | null;
  publishedAt: Date;
  author: string;
  category: {
    name: string;
    slug: string;
    color: string;
  };
};

type CategoryDisplayProps = {
  category: Category;
  articles: Article[];
};

export default function CategoryDisplay({ category, articles }: CategoryDisplayProps) {
  const { t, language } = useLanguage();

  const getCategoryName = (slug: string, defaultName: string) => {
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
      case "lifestyle":
        return t("lifestyle");
      default:
        return defaultName;
    }
  };

  const categoryLabel =
    language === "te"
      ? "వర్గం"
      : language === "hi"
      ? "श्रेणी"
      : "Category";

  const storiesCountText = () => {
    if (language === "te") {
      return `${articles.length} కథ${articles.length === 1 ? "" : "లు"}`;
    }
    if (language === "hi") {
      return `${articles.length} खबर${articles.length === 1 ? "" : "ें"}`;
    }
    return `${articles.length} ${articles.length === 1 ? "story" : "stories"}`;
  };

  const emptyText =
    language === "te"
      ? "ఈ వర్గంలో ఇంకా కథనాలు లేవు."
      : language === "hi"
      ? "इस श्रेणी में अभी कोई खबर नहीं है।"
      : "No articles in this category yet.";

  const categoryName = getCategoryName(category.slug, category.name);

  return (
    <div className="animate-fade-in">
      {/* Category Hero Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.color}dd 0%, ${category.color}99 50%, ${category.color}dd 100%)`,
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition hover:text-white">
              {language === "te" ? "హోమ్" : language === "hi" ? "होम" : "Home"}
            </Link>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-white/80">{categoryLabel}</span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
                {categoryLabel}
              </span>
              <h1
                className="mt-3 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
              >
                {categoryName}
              </h1>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/10">
              <p className="text-sm font-bold text-white">
                {storiesCountText()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {articles.length > 0 ? (
          <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-stone-200 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <svg className="h-7 w-7 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-stone-500">{emptyText}</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:opacity-90"
            >
              {language === "te" ? "హోమ్ కి వెళ్ళు" : language === "hi" ? "होम पर जाएं" : "Go to Homepage"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
