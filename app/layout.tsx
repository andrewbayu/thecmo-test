import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The CMO Test — Aditya Bayu",
  description: "Case-based marketing assessment by Aditya Bayu.",
  openGraph: { title: "The CMO Test — Aditya Bayu", description: "Baca situasinya. Pilih buktinya. Ambil keputusan." },
  twitter: { card: "summary_large_image", title: "The CMO Test — Aditya Bayu" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body className={jakarta.variable}>{children}</body></html>; }
