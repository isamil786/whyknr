"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import MediaPlayer from "@/components/MediaPlayer";
import ShareButton from "@/components/ShareButton";
import { useLanguage } from "@/lib/language-context";
import AdSlot from "@/components/AdSlot";

export type Article = {
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
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
};

type Props = {
  article: Article;
  relatedArticles: Article[];
};

export default function ArticleDisplay({ article, relatedArticles }: Props) {
  const { t, language } = useLanguage();
  const [articleUrl, setArticleUrl] = useState("");

  const title =
    language === "te"
      ? article.titleTe
      : language === "hi"
      ? article.titleHi
      : article.title;

  const content =
    language === "te"
      ? article.contentTe
      : language === "hi"
      ? article.contentHi
      : article.content;

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setArticleUrl(`${window.location.origin}/article/${article.slug}`);
    }
  }, [article.slug]);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href={`/category/${article.category.slug}`}
          className="rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: article.category.color }}
        >
          {getCategoryName(article.category.slug, article.category.name)}
        </Link>
        <time className="text-sm text-stone-400">
          {formatDate(article.publishedAt)}
        </time>
      </div>

      <h1 className="text-3xl font-black leading-tight text-stone-900 md:text-4xl">
        {title}
      </h1>

      <p className="mt-3 text-sm font-medium text-stone-500">
        By {article.author}
      </p>

      <div className="mt-6">
        <ShareButton title={title} url={articleUrl} />
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
        <MediaPlayer
          mediaType={article.mediaType}
          mediaUrl={article.mediaUrl}
          title={title}
          className="w-full"
        />
      </div>

      <AdSlot slotId="article-body" />

      <div
        className="article-content mt-8 text-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {relatedArticles.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 text-2xl font-black text-stone-900">
            {t("moreFrom")} {getCategoryName(article.category.slug, article.category.name)}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedArticles.map((related) => {
              const relatedTitle =
                language === "te"
                  ? related.titleTe
                  : language === "hi"
                  ? related.titleHi
                  : related.title;
              return (
                <Link
                  key={related.id}
                  href={`/article/${related.slug}`}
                  className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-stone-900">{relatedTitle}</p>
                  <p className="mt-2 text-sm text-stone-500">{formatDate(related.publishedAt)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 p-6 text-center">
        <p className="font-semibold text-stone-700">
          {t("followUpdates")}
        </p>
        <a
          href="https://www.instagram.com/why.karimnagar/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 text-sm font-bold text-white"
        >
          @why.karimnagar on Instagram
        </a>
      </div>
    </article>
  );
}
