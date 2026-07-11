import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import ArticleForm from "@/components/ArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black text-stone-900">New Article</h1>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <ArticleForm categories={categories} />
      </div>
    </div>
  );
}
