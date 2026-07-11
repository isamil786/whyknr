import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Why.Karimnagar | Karimnagar News & Updates",
    template: "%s | Why.Karimnagar",
  },
  description:
    "Why.Karimnagar — Your trusted source for Karimnagar news, local updates, events, and stories. Follow us on Instagram @why.karimnagar",
  keywords: [
    "Karimnagar",
    "Karimnagar news",
    "Telangana news",
    "Why Karimnagar",
    "local news",
  ],
  openGraph: {
    title: "Why.Karimnagar",
    description: "Karimnagar's Voice — Facts, Fearless, Faithful",
    siteName: "Why.Karimnagar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
