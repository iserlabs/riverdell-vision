import type { Metadata, Viewport } from "next";
import { Newsreader, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import ReviewGate from "@/components/review/ReviewGate";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL, practice } from "@/lib/site";

/* Pinned rather than variable. The codebase uses 400, 500 and 600 and nothing else:
   zero uses of 200, 300, 700, 800 or 900, so the variable axes were paying for weights
   that never render. Newsreader is the display face and all 91 weighted display usages are 500,
   so a single static instance covers every one of them. Measured together with the mono
   below, this takes about 97KB off a page whose LCP element is text. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

/* Kept, not dropped: the mono eyebrows and figures are part of the direction Dr. Han
   chose, so this is pinned rather than removed. Already unpreloaded. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Riverdell Vision | Optometrist & Eye Doctor in Oradell, NJ",
    template: "%s | Riverdell Vision",
  },
  description: practice.description,
  applicationName: practice.name,
  authors: [{ name: practice.name }],
  keywords: [
    "optometrist Oradell NJ",
    "eye doctor Oradell NJ",
    "myopia management Bergen County",
    "dry eye treatment Bergen County",
    "scleral lenses Bergen County",
    "pediatric eye doctor Oradell",
  ],
  openGraph: {
    type: "website",
    siteName: practice.name,
    locale: "en_US",
    url: SITE_URL,
    title: "Riverdell Vision | Optometrist & Eye Doctor in Oradell, NJ",
    description: practice.description,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /* Next only neutralises `scroll-behavior: smooth` during a route change when this
         attribute is present. Without it every navigation animates a full-page scroll,
         measured at roughly a second from deep in a long page. */
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${hanken.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        {children}
        <Toaster position="top-center" />
        <Analytics />
        <SpeedInsights />
              <ReviewGate />
      </body>
    </html>
  );
}
