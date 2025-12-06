import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- THIS IS WHERE YOU CHANGE THE TITLE ---
export const metadata: Metadata = {
  title: "The Daily Lexicon | Expand Your Vocabulary Daily",
  description: "Discover a new word every day. The Daily Lexicon helps you build your vocabulary.",
  icons: {
    icon: '/favicon.ico', // This looks for the icon in your 'app' or 'public' folder
  },
};
// ------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}