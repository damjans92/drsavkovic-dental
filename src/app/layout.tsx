import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingOverlay from "./components/LoadingOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr Savković | Moderna Stomatološka Ordinacija",
  description:
    "Vrhunska stomatološka nega u ordinaciji Dr Savković. Specijalizovani za estetsku stomatologiju, implante i oralno zdravlje. Zakakažite pregled u modernom ambijentu.",
  keywords: [
    "stomatolog",
    "zubari",
    "beograd",
    "dr savkovic",
    "dentalna klinika",
    "izbeljivanje zuba",
  ],
  authors: [{ name: "Tvoje Ime/Brend" }],
  openGraph: {
    title: "Dr Savković | Moderna Stomatološka Ordinacija",
    description:
      "Vaš osmeh je naša briga. Posetite nas i uverite se u kvalitet.",
    images: [
      {
        url: "/stomatolog-beograd-open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Savković Ordinacija",
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <LoadingOverlay /> */}
        {children}
      </body>
    </html>
  );
}
