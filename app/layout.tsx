import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Operating Altitude",
  description: "An adaptive decision-making assessment for strategic operators.",
  openGraph: { title: "Operating Altitude", description: "How high do you operate?", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Operating Altitude", images: ["/og.png"] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${montserrat.variable} ${mono.variable}`}>{children}</body></html>; }
