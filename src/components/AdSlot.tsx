"use client";

import { useEffect } from "react";

type AdSlotProps = {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
};

export default function AdSlot({
  slotId,
  format = "auto",
  responsive = true,
  className = "",
}: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Only run AdSense pushes in production when client ID and slot ID are available
    if (typeof window !== "undefined" && clientId && slotId) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense load error", err);
      }
    }
  }, [clientId, slotId]);

  // If no AdSense Client ID is configured, show a placeholder for design preview
  if (!clientId) {
    return (
      <div
        className={`my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center ${className}`}
        style={{ minHeight: "100px" }}
      >
        <span className="text-xxs font-bold uppercase tracking-wider text-stone-400">
          Advertisement Slot
        </span>
        <p className="mt-1 text-xs text-stone-400">
          Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID to activate
        </p>
      </div>
    );
  }

  return (
    <div className={`my-6 overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slotId || "default"}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
