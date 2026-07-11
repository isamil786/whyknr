import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const existing = await prisma.article.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const article = await prisma.article.update({
      where: { id: existing.id },
      data: { views: { increment: 1 } },
    });
    return NextResponse.json({ success: true, views: article.views });
  } catch (error) {
    console.error("Failed to increment views:", error);
    return NextResponse.json({ error: "Failed to increment views" }, { status: 500 });
  }
}
