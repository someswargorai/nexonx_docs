import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE = "https://res.cloudinary.com/dpacclyw4/image/upload/v1781975840/banner_in7wjs.png";
const SITE_URL = "https://nexonx.dev";
const TITLE    = "Nexonx — Component Library Docs";
const DESC     = "Source-first React component CLI. Copy, own, and customize your UI from inside your project. No hidden APIs, no lock-in.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s · Nexonx",
  },
  description: DESC,
  metadataBase: new URL(SITE_URL),

  openGraph: {
    type:        "website",
    url:         SITE_URL,
    title:       TITLE,
    description: DESC,
    siteName:    "Nexonx",
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    "Nexonx Component Library",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: DESC,
    images:      [OG_IMAGE],
    creator:     "@nexonxui",
  },

  icons: {
    icon: [
      { url: "/favicon.ico",                sizes: "any" },
      { url: "/icon-16.png",  type: "image/png", sizes: "16x16"  },
      { url: "/icon-32.png",  type: "image/png", sizes: "32x32"  },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest:   "/site.webmanifest",
  robots: {
    index:  true,
    follow: true,
  },
  authors: [{ name: "Nexonx" }],
  keywords: ["nexonx", "react", "component library", "tailwind", "ui kit", "typescript", "cli"],
};

const themeScript = `(function(){try{var s=localStorage.getItem('nx-theme');if(!s)s=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <Analytics/>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
