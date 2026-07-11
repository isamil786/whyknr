import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { createSlug } from "@/lib/utils";
import { translateText } from "@/lib/translate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...(category ? { category: { slug: category } } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    titleTe,
    titleHi,
    excerpt,
    excerptTe,
    excerptHi,
    content,
    contentTe,
    contentHi,
    mediaType,
    mediaUrl,
    categoryId,
    featured,
    published,
    author,
  } = body;

  if (!title || !content || !categoryId) {
    return NextResponse.json(
      { error: "Title, content, and category are required" },
      { status: 400 }
    );
  }

  // Auto-translate if fields are missing or empty
  const finalTitleTe = titleTe?.trim() ? titleTe : await translateText(title, "te");
  const finalTitleHi = titleHi?.trim() ? titleHi : await translateText(title, "hi");
  const finalExcerptTe = excerptTe?.trim() ? excerptTe : (excerpt?.trim() ? await translateText(excerpt, "te") : null);
  const finalExcerptHi = excerptHi?.trim() ? excerptHi : (excerpt?.trim() ? await translateText(excerpt, "hi") : null);
  const finalContentTe = contentTe?.trim() ? contentTe : await translateText(content, "te");
  const finalContentHi = contentHi?.trim() ? contentHi : await translateText(content, "hi");

  let slug = createSlug(title);
  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const article = await prisma.article.create({
    data: {
      title,
      titleTe: finalTitleTe,
      titleHi: finalTitleHi,
      slug,
      excerpt: excerpt || null,
      excerptTe: finalExcerptTe,
      excerptHi: finalExcerptHi,
      content,
      contentTe: finalContentTe,
      contentHi: finalContentHi,
      mediaType: mediaType || "IMAGE",
      mediaUrl: mediaUrl || null,
      categoryId,
      featured: featured ?? false,
      published: published ?? true,
      author: author || "Why.Karimnagar Desk",
    },
    include: { category: true },
  });

  return NextResponse.json(article, { status: 201 });
}
