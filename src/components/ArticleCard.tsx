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
};

export default function ArticleCard({ article, featured }: ArticleCardProps) {
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

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg hover:border-orange-200 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div className={`relative overflow-hidden bg-stone-100 ${featured ? "h-full min-h-[220px]" : "aspect-[16/10]"}`}>
          <MediaPlayer
            mediaType={article.mediaType}
            mediaUrl={article.mediaUrl}
            title={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            preview
          />
          {article.mediaType === "VIDEO" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <svg className="ml-1 h-6 w-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className={`flex flex-col p-5 ${featured ? "justify-center" : ""}`}>
        <div className="mb-2 flex items-center gap-2">
          <Link
            href={`/category/${article.category.slug}`}
            className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </Link>
          <span className="text-xs text-stone-400">{formatDate(article.publishedAt)}</span>
        </div>

        <Link href={`/article/${article.slug}`}>
          <h2
            className={`font-bold text-stone-900 transition group-hover:text-orange-600 ${
              featured ? "text-2xl leading-tight" : "text-lg leading-snug line-clamp-2"
            }`}
          >
            {title}
          </h2>
        </Link>

        {excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-stone-500 line-clamp-2">
            {truncate(excerpt, featured ? 180 : 120)}
          </p>
        )}

        <div className="mt-auto pt-4 text-xs font-medium text-stone-400">
          {article.author}
        </div>
      </div>
    </article>
  );
}
