"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ArticleFormData = {
  id?: string;
  title: string;
  titleTe: string;
  titleHi: string;
  excerpt: string;
  excerptTe: string;
  excerptHi: string;
  content: string;
  contentTe: string;
  contentHi: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  categoryId: string;
  featured: boolean;
  published: boolean;
  author: string;
};

type ArticleFormProps = {
  categories: Category[];
  initialData?: ArticleFormData;
};

export default function ArticleForm({ categories, initialData }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<ArticleFormData>(
    initialData || {
      title: "",
      titleTe: "",
      titleHi: "",
      excerpt: "",
      excerptTe: "",
      excerptHi: "",
      content: "",
      contentTe: "",
      contentHi: "",
      mediaType: "IMAGE",
      mediaUrl: "",
      categoryId: categories[0]?.id || "",
      featured: false,
      published: true,
      author: "Why.Karimnagar Desk",
    }
  );

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setForm((prev) => ({
        ...prev,
        mediaUrl: data.url,
        mediaType: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = initialData?.id
      ? `/api/articles/${initialData.id}`
      : "/api/articles";
    const method = initialData?.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Title *
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter news headline in English..."
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-lg font-medium outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Title (Telugu) *
        </label>
        <input
          type="text"
          required
          value={form.titleTe}
          onChange={(e) => setForm({ ...form, titleTe: e.target.value })}
          placeholder="సంవాదాన్ని తెలుగులో నమోదు చేయండి..."
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-lg font-medium outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Title (Hindi) *
        </label>
        <input
          type="text"
          required
          value={form.titleHi}
          onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
          placeholder="समाचार की मुख्य सुर्खियां हिंदी में दर्ज करें..."
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-lg font-medium outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Short Excerpt (English)
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Brief summary for cards and previews..."
          rows={2}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Short Excerpt (Telugu)
        </label>
        <textarea
          value={form.excerptTe}
          onChange={(e) => setForm({ ...form, excerptTe: e.target.value })}
          placeholder="సంక్షిప్త సారాంశం తెలుగులో..."
          rows={2}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Short Excerpt (Hindi)
        </label>
        <textarea
          value={form.excerptHi}
          onChange={(e) => setForm({ ...form, excerptHi: e.target.value })}
          placeholder="संक्षिप्त विवरण हिंदी में..."
          rows={2}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Media Type *
        </label>
        <div className="flex gap-3">
          {(["IMAGE", "VIDEO"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, mediaType: type })}
              className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                form.mediaType === type
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              {type === "IMAGE" ? "📷 Photo" : "🎬 Video"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Upload {form.mediaType === "IMAGE" ? "Photo" : "Video"}
          </label>
          <input
            type="file"
            accept={form.mediaType === "IMAGE" ? "image/*" : "video/*,image/*"}
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full rounded-xl border border-dashed border-stone-300 px-4 py-6 text-sm text-stone-500 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700"
          />
          {uploading && (
            <p className="mt-2 text-sm text-orange-600">Uploading...</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Or paste URL
          </label>
          <input
            type="url"
            value={form.mediaUrl}
            onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
            placeholder={
              form.mediaType === "VIDEO"
                ? "YouTube URL or direct video link..."
                : "Image URL..."
            }
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      {form.mediaUrl && (
        <div className="overflow-hidden rounded-xl border border-stone-200">
          {form.mediaType === "IMAGE" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.mediaUrl}
              alt="Preview"
              className="max-h-64 w-full object-cover"
            />
          ) : (
            <video src={form.mediaUrl} controls className="max-h-64 w-full" />
          )}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Content (English) *
        </label>
        <textarea
          required
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write your full news article here in English. You can use HTML tags like <p>, <strong>, <em> for formatting."
          rows={12}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
        <p className="mt-1 text-xs text-stone-400">
          Tip: Wrap paragraphs in &lt;p&gt; tags for proper formatting.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Content (Telugu) *
        </label>
        <textarea
          required
          value={form.contentTe}
          onChange={(e) => setForm({ ...form, contentTe: e.target.value })}
          placeholder="తెలుగులో మీ పూర్తి సమాచార కథను ఇక్కడ రాయండి. మీరు <p>, <strong>, <em> వంటి HTML ట్యాగ్‌లను ఉపయోగించవచ్చు."
          rows={12}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
        <p className="mt-1 text-xs text-stone-400">
          చిట్కా: సరైన ఫార్మాట్ కోసం పేరాగ్రాఫ్‌లను &lt;p&gt; ట్యాగ్‌లలో చేర్చండి.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-stone-700">
          Content (Hindi) *
        </label>
        <textarea
          required
          value={form.contentHi}
          onChange={(e) => setForm({ ...form, contentHi: e.target.value })}
          placeholder="हिंदी में अपना पूरा समाचार लेख यहाँ लिखें। आप फॉर्मेटिंग के लिए <p>, <strong>, <em> जैसे HTML टैग का उपयोग कर सकते हैं।"
          rows={12}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
        <p className="mt-1 text-xs text-stone-400">
          टिप: सही फॉर्मेटिंग के लिए अनुच्छेदों को &lt;p&gt; टैग में लपेटें।
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Category *
          </label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Author
          </label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex flex-col justify-end gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 rounded accent-orange-600"
            />
            Featured story
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="h-4 w-4 rounded accent-orange-600"
            />
            Publish immediately
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData?.id ? "Update Article" : "Publish Article"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-xl border border-stone-300 px-6 py-3 font-semibold text-stone-600 transition hover:bg-stone-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
