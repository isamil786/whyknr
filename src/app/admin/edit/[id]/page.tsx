import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import ArticleForm from "@/components/ArticleForm";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: PageProps) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const { id } = await params;
  const [article, categories] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!article) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-stone-900">Edit Article</h1>
        <div className="rounded-xl bg-orange-50 border border-orange-100 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm flex items-center gap-1.5">
          <span>👁️ {article.views} views</span>
        </div>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <ArticleForm
          categories={categories}
          initialData={{
            id: article.id,
            title: article.title,
            titleTe: article.titleTe,
            titleHi: article.titleHi,
            excerpt: article.excerpt || "",
            excerptTe: article.excerptTe || "",
            excerptHi: article.excerptHi || "",
            content: article.content,
            contentTe: article.contentTe,
            contentHi: article.contentHi,
            mediaType: article.mediaType,
            mediaUrl: article.mediaUrl || "",
            categoryId: article.categoryId,
            featured: article.featured,
            published: article.published,
            author: article.author,
          }}
        />
      </div>
    </div>
  );
}
