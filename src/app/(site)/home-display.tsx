"use client";

import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import MediaPlayer from "@/components/MediaPlayer";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import AdSlot from "@/components/AdSlot";

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

  const heroArticle = featuredArticles[0] ?? latestArticles[0];
  const supportingStories =
    featuredArticles.length > 1
      ? featuredArticles.slice(1)
      : latestArticles.slice(1, 4);
  const regularArticles = latestArticles.filter(
    (article) => !featuredArticles.some((featured) => featured.id === article.id)
  );

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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">
                {t("todayCoverage")}
              </p>
              <div className="mt-3 space-y-3">
                {latestArticles.slice(0, 3).map((article) => {
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
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

        {videoArticles.length > 0 && (
          <section className="mb-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-black text-stone-900">
                <span className="h-6 w-1 rounded-full bg-red-600" />
                {t("videoHighlights")}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {videoArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

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
          {regularArticles.length === 0 && featuredArticles.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-stone-200 py-16 text-center">
              <p className="text-stone-500">
                {language === "te"
                  ? "ఇంకా కథనాలు లేవు."
                  : language === "hi"
                  ? "अभी तक कोई समाचार नहीं है।"
                  : "No articles yet."}
              </p>
              <Link
                href="/admin"
                className="mt-2 inline-block font-semibold text-orange-600 hover:underline"
              >
                {language === "te"
                  ? "మీ మొదటి కథనాన్ని ప్రచురించండి →"
                  : language === "hi"
                  ? "अपनी पहली खबर प्रकाशित करें →"
                  : "Publish your first story →"}
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
