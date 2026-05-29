import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://coltonwirgau.me"),
  title: "Colton Wirgau - Full-Stack Developer",
  description:
    "Full-stack developer specializing in UI/UX, making complex systems intuitive and beautiful.",
  keywords: [
    "full-stack developer",
    "ui/ux",
    "next.js",
    "react",
    "typescript",
    "colton wirgau",
  ],
  authors: [{ name: "Colton Wirgau" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coltonwirgau.me",
    siteName: "Colton Wirgau",
    title: "Colton Wirgau - Full-Stack Developer",
    description:
      "Full-stack developer specializing in UI/UX, making complex systems intuitive and beautiful.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colton Wirgau - Full-Stack Developer",
    description:
      "Full-stack developer specializing in UI/UX, making complex systems intuitive and beautiful.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        {children}
        <div className="paper-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
