import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colton Wirgau - Product-Minded Full-Stack Engineer",
  description: "Senior Full-Stack Engineer building intuitive systems with Next.js, React, and TypeScript. 8+ years transforming complexity into elegant solutions.",
  keywords: [
    "full-stack engineer",
    "next.js developer",
    "react developer",
    "typescript",
    "product engineer",
    "ui/ux engineer",
    "software engineer michigan",
    "colton wirgau"
  ],
  authors: [{ name: "Colton Wirgau" }],
  creator: "Colton Wirgau",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://coltonwirgau.me",
    siteName: "Colton Wirgau",
    title: "Colton Wirgau - Product-Minded Full-Stack Engineer",
    description: "Senior Full-Stack Engineer building intuitive systems with Next.js, React, and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colton Wirgau - Product-Minded Full-Stack Engineer",
    description: "Senior Full-Stack Engineer building intuitive systems with Next.js, React, and TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
