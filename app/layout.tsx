import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The CMO Test — Aditya Bayu",
  description: "Standar assessment Aditya Bayu untuk hiring Head, VP, dan C-level Marketing.",
  openGraph: { title: "The CMO Test — Aditya Bayu", description: "Hanya 0,7% kandidat yang lolos.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The CMO Test — Aditya Bayu", images: ["/og.png"] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body className={jakarta.variable}>{children}</body></html>; }
