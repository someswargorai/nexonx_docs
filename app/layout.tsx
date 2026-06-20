import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexonx — Component Library Docs",
  description:
    "Source-first React component CLI. Copy, own, and customize your UI from inside your project.",
};

// Inline script runs SYNCHRONOUSLY before React hydrates — no theme flash.
const themeScript = `
(function(){
  try{
    var s=localStorage.getItem('nx-theme');
    if(!s) s=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
    document.documentElement.setAttribute('data-theme',s);
  }catch(e){}
})();
`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
