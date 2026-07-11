import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import AdminActions from "@/components/AdminActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const articles = await prisma.article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const totalViews = articles.reduce((acc, art) => acc + art.views, 0);
  const totalArticles = articles.length;
  const publishedArticles = articles.filter((a) => a.published).length;
  const draftArticles = totalArticles - publishedArticles;
  const topArticle =
    articles.length > 0
      ? [...articles].sort((a, b) => b.views - a.views)[0]
      : null;
  const categoryCount = new Set(articles.map((a) => a.categoryId)).size;

  return (
    <div className="space-y-6">
      {/* Dashboard Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900">Dashboard</h1>
          <p className="text-sm text-stone-500">Manage your news articles</p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-100 hover:opacity-90 transition text-center w-full sm:w-auto"
        >
          + New Article
        </Link>
      </div>

      {/* Stats Dashboard Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Total Views
          </p>
          <h3 className="mt-2 text-3xl font-black text-stone-900">
            {totalViews.toLocaleString()}
          </h3>
          {topArticle && (
            <p
              className="mt-2 text-xs text-stone-500 truncate"
              title={`${topArticle.title} (${topArticle.views} views)`}
            >
              Top:{" "}
              <span className="font-semibold text-orange-600">
                {topArticle.title}
              </span>{" "}
              ({topArticle.views})
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Total Articles
          </p>
          <h3 className="mt-2 text-3xl font-black text-stone-900">
            {totalArticles}
          </h3>
          <p className="mt-2 text-xs text-stone-500">
            {publishedArticles} Published · {draftArticles} Drafts
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Active Categories
          </p>
          <h3 className="mt-2 text-3xl font-black text-stone-900">
            {categoryCount}
          </h3>
          <p className="mt-2 text-xs text-stone-500">Topics covered in news</p>
        </div>
      </div>

      {/* Desktop/Tablet View Table (hidden on mobile) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-100 bg-stone-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-stone-600">Title</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Category</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Media</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Status</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Views</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Date</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 max-w-xs">
                  <Link
                    href={`/article/${article.slug}`}
                    className="font-medium text-stone-900 hover:text-orange-600 line-clamp-2"
                  >
                    {article.title}
                  </Link>
                  {article.featured && (
                    <span className="mt-1 inline-block rounded bg-orange-100 px-1.5 py-0.5 text-xxs font-bold text-orange-700">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: article.category.color }}
                  >
                    {article.category.name}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-stone-500 text-xs">
                    {article.mediaType === "VIDEO" ? "🎬 Video" : "📷 Photo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      article.published
                        ? "bg-green-100 text-green-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-stone-700">
                  {article.views}
                </td>
                <td className="px-4 py-3 text-stone-400 text-xs">
                  {formatDate(article.publishedAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/edit/${article.id}`}
                      className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-orange-100 hover:text-orange-700 transition"
                    >
                      Edit
                    </Link>
                    <AdminActions action="delete" articleId={article.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View Feed (hidden on desktop) */}
      <div className="block md:hidden space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="rounded-full px-2 py-0.5 text-xxs font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: article.category.color }}
                >
                  {article.category.name}
                </span>
                <span className="text-xxs text-stone-400">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <Link
                href={`/article/${article.slug}`}
                className="font-bold text-stone-900 hover:text-orange-600 line-clamp-3 leading-snug"
              >
                {article.title}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3 text-xs">
              <span
                className={`rounded-full px-2 py-0.5 text-xxs font-bold ${
                  article.published
                    ? "bg-green-100 text-green-700"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {article.published ? "Published" : "Draft"}
              </span>
              {article.featured && (
                <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xxs font-bold text-orange-700">
                  Featured
                </span>
              )}
              <span className="ml-auto text-xxs font-bold text-stone-500">
                👁️ {article.views} views
              </span>
            </div>

            <div className="flex gap-2 border-t border-stone-100 pt-3">
              <Link
                href={`/admin/edit/${article.id}`}
                className="flex-1 rounded-xl bg-stone-100 py-2.5 text-center text-xs font-bold text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition"
              >
                Edit
              </Link>
              <div className="flex-1">
                <AdminActions
                  action="delete"
                  articleId={article.id}
                  className="w-full rounded-xl bg-red-50 py-2.5 text-center text-xs font-bold text-red-600 hover:bg-red-100 transition block cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="py-16 text-center rounded-2xl border border-dashed border-stone-200 bg-white">
          <p className="text-stone-500">No articles yet.</p>
          <Link
            href="/admin/new"
            className="mt-2 inline-block font-semibold text-orange-600 hover:underline"
          >
            Create your first article →
          </Link>
        </div>
      )}
    </div>
  );
}
