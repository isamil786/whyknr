import { getYouTubeEmbedUrl, isYouTubeUrl } from "@/lib/utils";

type MediaPlayerProps = {
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string | null;
  title: string;
  className?: string;
  preview?: boolean;
};

export default function MediaPlayer({
  mediaType,
  mediaUrl,
  title,
  className = "",
  preview = false,
}: MediaPlayerProps) {
  if (!mediaUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 ${className}`}
      >
        <span className="text-4xl font-black text-orange-300">W</span>
      </div>
    );
  }

  if (mediaType === "IMAGE") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaUrl} alt={title} className={className} loading="lazy" />
    );
  }

  if (preview) {
    if (isYouTubeUrl(mediaUrl)) {
      const embed = getYouTubeEmbedUrl(mediaUrl);
      if (embed) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://img.youtube.com/vi/${embed.split("/").pop()}/hqdefault.jpg`}
            alt={title}
            className={className}
            loading="lazy"
          />
        );
      }
    }
    return (
      <div
        className={`flex items-center justify-center bg-stone-800 ${className}`}
      >
        <svg className="h-12 w-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }

  if (isYouTubeUrl(mediaUrl)) {
    const embed = getYouTubeEmbedUrl(mediaUrl);
    if (embed) {
      return (
        <div className={`aspect-video w-full overflow-hidden rounded-xl ${className}`}>
          <iframe
            src={embed}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    }
  }

  if (mediaUrl.startsWith("/uploads/") || mediaUrl.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <video
        src={mediaUrl}
        controls
        className={`aspect-video w-full rounded-xl bg-black ${className}`}
      >
        Your browser does not support video playback.
      </video>
    );
  }

  return (
    <div className={`aspect-video w-full overflow-hidden rounded-xl bg-stone-900 ${className}`}>
      <video src={mediaUrl} controls className="h-full w-full">
        Your browser does not support video playback.
      </video>
    </div>
  );
}
