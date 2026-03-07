import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_US",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
