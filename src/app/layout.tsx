import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as standard safe choice
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mostafa Ali | Backend Developer",
  description: "Portfolio of Mostafa Ali, a Backend Developer specialized in PHP and Laravel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
