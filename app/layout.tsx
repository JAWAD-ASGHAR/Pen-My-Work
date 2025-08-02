import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PEN MY WORK",
  description: "PEN MY WORK",
  icons: {
    icon: [
<<<<<<< HEAD
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
=======
      { url: "/Logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/Logo.png",
    apple: "/Logo.png",
>>>>>>> 4f99ec357cd0ca3026e0f13bbbe34758f2acd97e
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
