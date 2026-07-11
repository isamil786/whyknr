import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";
import HomeDisplay from "./home-display";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await seedDatabase();

  const [featuredArticles, latestArticles, videoArticles] = await Promise.all([
    prisma.article.findMany({
      where: { published: true, featured: true },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.article.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 12,
    }),
    prisma.article.findMany({
      where: { published: true, mediaType: "VIDEO" },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <HomeDisplay
      featuredArticles={featuredArticles as any}
      latestArticles={latestArticles as any}
      videoArticles={videoArticles as any}
    />
  );
}

