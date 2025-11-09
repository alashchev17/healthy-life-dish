import type { Metadata } from "next";
import { Jura, Manrope } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";
import { Footer, Header } from "#/design/shared";
import { fetchAllPrograms, fetchFooterData } from "#/sanity/lib";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await fetchFooterData();
  console.log("Footer Data", footerData);
  const programsData = await fetchAllPrograms();
  return (
    <html lang="en">
      <body
        className={`${juraSans.variable} ${manropeSans.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer data={footerData} programsData={programsData} />
        </Providers>
      </body>
    </html>
  );
}
