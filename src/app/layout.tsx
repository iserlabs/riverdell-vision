import type { Metadata } from "next";
import { Fraunces, Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL, practice } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
    title: "Riverdell Vision | Eye Doctor in Oradell, NJ",
    description: practice.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${schibsted.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
