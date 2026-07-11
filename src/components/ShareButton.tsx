"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

type ShareButtonProps = {
  title: string;
  url: string;
};

export default function ShareButton({ title, url }: ShareButtonProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: "facebook" | "twitter" | "whatsapp" | "linkedin") => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + "\n\n" + url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-500">
        {t("shareThisPost")}
      </h3>
      <div className="flex flex-wrap gap-3">
        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 shadow-sm"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare("twitter")}
          className="flex items-center gap-2 rounded-xl bg-[#1DA1F2] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 shadow-sm"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          Twitter
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleShare("whatsapp")}
          className="flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 shadow-sm"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.004 0C5.372 0 0 5.372 0 12c0 2.115.55 4.102 1.517 5.845L0 24l6.335-1.662C8.01 23.36 10.05 24 12.004 24 18.636 24 24 18.636 24 12c0-6.628-5.364-12-11.996-12zm6.75 17.228c-.26.732-1.503 1.3-2.072 1.385-.563.08-1.294.137-2.062-.112-.76-.245-1.745-.724-2.92-1.233-5.01-2.17-8.253-7.27-8.503-7.603-.25-.333-2.03-2.7-2.03-5.156 0-2.456 1.285-3.666 1.745-4.168.46-.5.998-.625 1.332-.625.333 0 .667.006.958.019.3.012.7.043 1.096.994.4.957 1.36 3.32 1.482 3.568.12.247.2.537.037.866-.16.33-.243.532-.486.816-.244.285-.512.637-.73.856-.24.24-.492.5-.21.99.28.49 1.25 2.06 2.68 3.33 1.84 1.64 3.4 2.14 3.88 2.386.48.246.76.21 1.04-.112.28-.32 1.21-1.413 1.533-1.897.323-.483.647-.402 1.088-.236.44.166 2.8 1.32 3.284 1.56.484.24.806.36.924.563.12.203.12 1.173-.14 1.905z" />
          </svg>
          WhatsApp
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 shadow-sm"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition shadow-sm ${
            copied ? "bg-emerald-600 hover:bg-emerald-700" : "bg-stone-500 hover:bg-stone-600"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            {copied ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            )}
          </svg>
          {copied ? t("copied") : t("copyLink")}
        </button>
      </div>
    </div>
  );
}
