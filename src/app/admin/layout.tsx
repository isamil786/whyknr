import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Gradient accent bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 animate-gradient" />

      <div className="border-b border-stone-200 bg-white shadow-sm">
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/admin"
            className="font-black text-stone-900 text-lg transition hover:text-orange-600"
            style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
          >
            Why<span className="text-orange-600">.</span>Karimnagar
            <span className="ml-2 rounded-lg bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-500">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm w-full sm:w-auto justify-between sm:justify-end">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-stone-500 hover:text-orange-600 font-medium transition"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              View Site
            </Link>
            <Link
              href="/admin/new"
              className="rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2 font-semibold text-white shadow-md shadow-orange-100 transition hover:opacity-90 hover:shadow-lg text-sm"
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
