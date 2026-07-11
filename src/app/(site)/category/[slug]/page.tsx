import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import CategoryDisplay from "./category-display";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description: `${category.name} — Why.Karimnagar local news and updates`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) notFound();

  const articles = await prisma.article.findMany({
    where: { categoryId: category.id, published: true },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <CategoryDisplay category={category} articles={articles as any} />
  );
}
