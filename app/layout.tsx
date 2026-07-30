import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "The CMO Test — Aditya Bayu",
  description: "Standar assessment Aditya Bayu untuk hiring Head, VP, dan C-level Marketing.",
  openGraph: { title: "The CMO Test — Aditya Bayu", description: "Hanya 0,7% kandidat yang lolos.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The CMO Test — Aditya Bayu", images: ["/og.png"] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${montserrat.variable} ${mono.variable}`}>{children}</body></html>; }
