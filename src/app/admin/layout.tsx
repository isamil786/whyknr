import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-black text-stone-900 text-lg">
            Why<span className="text-orange-600">.</span>Karimnagar Admin
          </Link>
          <div className="flex items-center gap-4 text-sm w-full sm:w-auto justify-between sm:justify-end">
            <Link href="/" className="text-stone-500 hover:text-orange-600 font-medium">
              View Site
            </Link>
            <Link
              href="/admin/new"
              className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700 transition"
            >
              + New Article
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
