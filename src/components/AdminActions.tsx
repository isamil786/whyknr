"use client";

import { useRouter } from "next/navigation";

type AdminActionsProps =
  | { action: "logout" }
  | { action: "delete"; articleId: string };

export default function AdminActions(props: AdminActionsProps) {
  const router = useRouter();

  if (props.action === "logout") {
    return (
      <button
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          router.push("/admin/login");
          router.refresh();
        }}
        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={async () => {
        if (!confirm("Delete this article?")) return;
        await fetch(`/api/articles/${props.articleId}`, { method: "DELETE" });
        router.refresh();
      }}
      className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
    >
      Delete
    </button>
  );
}
