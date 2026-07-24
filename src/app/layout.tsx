import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ThemeProvider } from "@/components/layout/theme-provider";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aatravelgroup.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AA Group Travels | Umrah Hotels & Travel Services",
    template: "%s | AA Group Travels",
  },
  description:
    "AA Group Travels provides hotel stays and transport services in Makkah & Madinah for pilgrims, families and groups.",
  openGraph: {
    type: "website",
    siteName: "AA Group Travels",
    title: "AA Group Travels | Umrah Hotels & Travel Services",
    description: "Hotels and transport in Makkah & Madinah for Umrah journeys.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "AA Group Travels",
    description: "Hotels and transport in Makkah & Madinah.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${inter.variable} font-body antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
