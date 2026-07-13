"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import MediaPlayer from "@/components/MediaPlayer";
import ShareButton from "@/components/ShareButton";
import ReadingProgressBar from "@/components/ReadingProgressBar";
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

function estimateReadTime(content: string): number {
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

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

  const readTime = estimateReadTime(content);

  const readTimeLabel =
    language === "te"
      ? `${readTime} ని. చదువు`
      : language === "hi"
      ? `${readTime} मि. पढ़ें`
      : `${readTime} min read`;

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

  useEffect(() => {
    if (article.id) {
      fetch(`/api/articles/${article.id}/view`, { method: "POST" }).catch((err) =>
        console.error("Failed to register view:", err)
      );
    }
  }, [article.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C / Cmd+C
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
      }
      // Prevent Ctrl+U / Cmd+U (View Source shortcut)
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
      }
      // Prevent Ctrl+A / Cmd+A
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      <ReadingProgressBar />

      <article
        className="mx-auto max-w-4xl px-4 py-10 animate-fade-in-up select-none"
        style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }}
      >
        {/* Date only */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <time className="text-sm text-stone-400">
            {formatDate(article.publishedAt)}
          </time>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-stone-400">
            {formatRelativeDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-extrabold leading-tight text-stone-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
        >
          {title}
        </h1>

        {/* Author + Read Time */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-sm font-bold text-white shadow-md shadow-orange-200/50">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">{article.author}</p>
              <p className="text-xs text-stone-400">{readTimeLabel}</p>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="mt-8 overflow-hidden rounded-2xl shadow-xl shadow-stone-200/50">
          <MediaPlayer
            mediaType={article.mediaType}
            mediaUrl={article.mediaUrl}
            title={title}
            className="w-full"
          />
        </div>

        <AdSlot slotId="article-body" />

        {/* Article Content */}
        <div
          className="article-content mt-10 select-none"
          style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }}
          onCopy={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 animate-fade-in-up">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-1 rounded-full bg-gradient-to-b from-orange-500 to-red-500" />
              <h2
                className="text-2xl font-extrabold text-stone-900"
                style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
              >
                {language === "te" ? "మరిన్ని వార్తలు" : language === "hi" ? "और खबरें" : "Related Stories"}
              </h2>
            </div>
            <div className="stagger-children grid gap-5 md:grid-cols-3">
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
                    className="card-hover group rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm"
                  >
                    {related.mediaUrl && related.mediaType === "IMAGE" && (
                      <div className="mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={related.mediaUrl}
                          alt={relatedTitle}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <p
                      className="font-bold text-stone-900 leading-snug transition group-hover:text-orange-600"
                      style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
                    >
                      {relatedTitle}
                    </p>
                    <p className="mt-2 text-sm text-stone-400">{formatDate(related.publishedAt)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Instagram CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 p-8 text-center shadow-sm border border-orange-100/50">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-200/50">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>
          </div>
          <p className="font-semibold text-stone-700">
            {t("followUpdates")}
          </p>
          <a
            href="https://www.instagram.com/why.karimnagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200/30 transition hover:opacity-90 hover:shadow-xl hover:scale-[1.02]"
          >
            @why.karimnagar on Instagram
          </a>
        </div>
      </article>

      <ShareButton title={title} url={articleUrl} />
    </>
  );
}
