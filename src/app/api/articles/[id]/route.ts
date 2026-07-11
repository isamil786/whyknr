import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { createSlug } from "@/lib/utils";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const article = await prisma.article.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { category: true },
  });

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
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

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let slug = existing.slug;
  if (title && title !== existing.title) {
    slug = createSlug(title);
    const slugExists = await prisma.article.findFirst({
      where: { slug, NOT: { id } },
    });
    if (slugExists) slug = `${slug}-${Date.now()}`;
  }

  const article = await prisma.article.update({
    where: { id },
    data: {
      title,
      titleTe,
      titleHi,
      slug,
      excerpt: excerpt ?? null,
      excerptTe: excerptTe ?? null,
      excerptHi: excerptHi ?? null,
      content,
      contentTe,
      contentHi,
      mediaType,
      mediaUrl: mediaUrl ?? null,
      categoryId,
      featured,
      published,
      author,
    },
    include: { category: true },
  });

  return NextResponse.json(article);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
