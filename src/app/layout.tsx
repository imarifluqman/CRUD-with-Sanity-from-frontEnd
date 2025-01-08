import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next & Sanity App",
  description: "My Next.js and Sanity.io app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-between bg-slate-500 p-4 text-white z-10">
          <h1>Contact Form</h1>
          <ul className="flex gap-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/data-create">Create</Link></li>
            <li><Link href="/data-fetch">Fetch</Link></li>
            <li><Link href="/produts">Products</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
