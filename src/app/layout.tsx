import type { Metadata } from "next";
import { Jura, Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "#/design/shared/language";

const juraSans = Jura({
  variable: "--font-jura-sans",
  subsets: ["latin"],
});

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healthy Life Dish",
  description: "Next.JS App | HLD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${juraSans.variable} ${manropeSans.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
