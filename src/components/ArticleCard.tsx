"use client";

import Link from "next/link";
import { formatDate, truncate } from "@/lib/utils";
import MediaPlayer from "./MediaPlayer";
import { useLanguage } from "@/lib/language-context";

type ArticleCardProps = {
  article: {
    slug: string;
    title: string;
    titleTe: string;
    titleHi: string;
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
  featured?: boolean;
  index?: number;
};

function isNew(publishedAt: Date): boolean {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return new Date(publishedAt).getTime() > oneDayAgo;
}

function estimateReadTime(content?: string): number {
  if (!content) return 2;
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export default function ArticleCard({ article, featured, index = 0 }: ArticleCardProps) {
  const { language } = useLanguage();

  const title =
    language === "te"
      ? article.titleTe
      : language === "hi"
      ? article.titleHi
      : article.title;

  const excerpt =
    language === "te"
      ? article.excerptTe
      : language === "hi"
      ? article.excerptHi
      : article.excerpt;

  const readTime = estimateReadTime(article.content);
  const articleIsNew = isNew(article.publishedAt);

  const readTimeLabel =
    language === "te"
      ? `${readTime} ని. చదువు`
      : language === "hi"
      ? `${readTime} मि. पढ़ें`
      : `${readTime} min read`;

  return (
    <article
      className={`card-hover card-shine group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div
          className={`image-gradient-overlay relative overflow-hidden bg-stone-100 ${
            featured ? "h-full min-h-[220px]" : "aspect-[16/10]"
          }`}
        >
          <MediaPlayer
            mediaType={article.mediaType}
            mediaUrl={article.mediaUrl}
            title={title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            preview
          />

          {/* Video play badge */}
          {article.mediaType === "VIDEO" && (
            <div className="absolute inset-0 z-[2] flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition duration-300 group-hover:scale-110">
                <svg className="ml-1 h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* NEW badge */}
          {articleIsNew && (
            <div className="absolute left-3 top-3 z-[2] flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
              NEW
            </div>
          )}

          {/* Read time badge */}
          <div className="absolute bottom-3 right-3 z-[2] rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {readTimeLabel}
          </div>
        </div>
      </Link>

      <div className={`flex flex-col p-5 ${featured ? "justify-center" : ""}`}>
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-[11px] text-stone-400">{formatDate(article.publishedAt)}</span>
        </div>

        <Link href={`/article/${article.slug}`}>
          <h2
            className={`font-extrabold text-stone-900 transition duration-300 group-hover:text-orange-600 ${
              featured ? "text-xl leading-tight sm:text-2xl" : "text-base leading-snug line-clamp-2 sm:text-lg"
            }`}
            style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
          >
            {title}
          </h2>
        </Link>

        {excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-stone-500 line-clamp-2">
            {truncate(excerpt, featured ? 180 : 120)}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-medium text-stone-400">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100 text-[8px] font-black text-orange-600">
            {article.author.charAt(0)}
          </div>
          {article.author}
        </div>
      </div>
    </article>
  );
}
