"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type TickerArticle = {
  slug: string;
  title: string;
  titleTe: string;
  titleHi: string;
};

type NewsTickerProps = {
  articles: TickerArticle[];
};

export default function NewsTicker({ articles }: NewsTickerProps) {
  const { language } = useLanguage();

  if (!articles || articles.length === 0) return null;

  const getTitle = (article: TickerArticle) => {
    return language === "te"
      ? article.titleTe
      : language === "hi"
      ? article.titleHi
      : article.title;
  };

  // Double the articles to create seamless loop
  const tickerItems = [...articles, ...articles];

  return (
    <div className="border-b border-stone-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-0 px-4">
        <div className="flex shrink-0 items-center gap-2 border-r border-stone-100 py-2 pr-4">
          <span className="live-dot" />
          <span className="text-xs font-black uppercase tracking-wider text-red-600">
            {language === "te" ? "లైవ్" : language === "hi" ? "लाइव" : "LIVE"}
          </span>
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden py-2 pl-4">
          <div className="ticker-track">
            {tickerItems.map((article, index) => (
              <Link
                key={`${article.slug}-${index}`}
                href={`/article/${article.slug}`}
                className="mr-10 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-orange-600"
              >
                <span className="text-orange-400">●</span>
                {getTitle(article)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
