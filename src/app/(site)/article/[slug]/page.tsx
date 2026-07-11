import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import ArticleDisplay from "./article-display";
import type { Article } from "@/app/(site)/article/[slug]/article-display";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.mediaUrl && article.mediaType === "IMAGE" ? [article.mediaUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    include: { category: true },
  });

  if (!article) notFound();

  const relatedArticles = await prisma.article.findMany({
    where: {
      categoryId: article.categoryId,
      published: true,
      id: { not: article.id },
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return <ArticleDisplay article={article as Article} relatedArticles={relatedArticles as Article[]} />;
}
