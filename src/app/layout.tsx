import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Dreamland Associates | Discover Your Extraordinary Home",
  description: "Dreamland Associates is a premier luxury real estate agency helping you discover your extraordinary home. Browse our curated listings of exclusive villas, penthouses, and mansions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full scroll-smooth", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-white text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
