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

  const handleShare = (platform: "facebook" | "twitter" | "whatsapp" | "instagram") => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + "\n\n" + url)}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/why.karimnagar/`;
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

  const buttons = [
    {
      platform: "whatsapp" as const,
      bg: "bg-[#25D366] hover:bg-[#20bd5a]",
      label: "Share on WhatsApp",
      icon: (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.25 8.477 3.517 2.266 2.268 3.51 5.28 3.51 8.482-.003 6.66-5.338 11.999-11.95 11.999-2.005-.002-3.975-.502-5.734-1.455L0 24zm6.59-4.846c1.66.986 3.294 1.48 4.922 1.48 5.434 0 9.85-4.417 9.85-9.86 0-2.636-1.026-5.112-2.89-6.979C16.657 1.928 14.18 .9 11.547.9c-5.44 0-9.858 4.418-9.858 9.863 0 1.93.51 3.524 1.478 5.166l-.999 3.647 3.882-.972zm10.966-7.447c-.302-.152-1.793-.884-2.071-.986-.279-.101-.482-.152-.684.152-.202.304-.785.986-.962 1.189-.177.202-.355.228-.658.076-.303-.152-1.277-.47-2.433-1.502-.9-.803-1.507-1.795-1.684-2.099-.177-.302-.018-.465.133-.616.137-.135.303-.354.455-.53.152-.177.202-.304.303-.506.102-.203.05-.38-.025-.531-.076-.152-.684-1.647-.937-2.254-.247-.595-.497-.514-.684-.523-.177-.009-.38-.01-.582-.01-.202 0-.531.076-.81.38-.278.304-1.062 1.039-1.062 2.532 0 1.493 1.088 2.937 1.239 3.14.152.203 2.14 3.267 5.187 4.58.723.313 1.288.5 1.73.642.727.23 1.39.197 1.912.12.583-.087 1.794-.734 2.047-1.442.253-.709.253-1.317.177-1.443-.076-.126-.279-.202-.582-.354z"/>
        </svg>
      ),
    },
    {
      platform: "facebook" as const,
      bg: "bg-[#1877F2] hover:bg-[#1467d8]",
      label: "Share on Facebook",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      platform: "twitter" as const,
      bg: "bg-[#1DA1F2] hover:bg-[#1a91da]",
      label: "Share on Twitter",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      platform: "instagram" as const,
      bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-95",
      label: "Instagram Page",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
      {buttons.map(({ platform, bg, label, icon }) => (
        <button
          key={platform}
          onClick={() => handleShare(platform)}
          aria-label={label}
          title={label}
          className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl`}
        >
          {icon}
        </button>
      ))}

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        aria-label={copied ? t("copied") : t("copyLink")}
        title={copied ? t("copied") : t("copyLink")}
        className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          copied ? "bg-emerald-500" : "bg-stone-500 hover:bg-stone-600"
        }`}
      >
        <svg
          className="h-5 w-5"
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
      </button>
    </div>
  );
}
