"use client";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: category.color }}
        >
          {categoryLabel}
        </span>
        <h1 className="mt-3 text-3xl font-black text-stone-900 md:text-4xl">
          {getCategoryName(category.slug, category.name)}
        </h1>
        <p className="mt-2 text-stone-500">
          {storiesCountText()}
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-stone-200 py-16 text-center text-stone-500">
          {emptyText}
        </div>
      )}
    </div>
  );
}
