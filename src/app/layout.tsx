import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { Providers } from "./providers";
import { Footer, Header } from "#/design/shared";
import { fetchAllPrograms, fetchFooterData } from "#/sanity/lib";

const juraSans = localFont({
  variable: "--font-jura-sans",
  src: [
    {
      path: "../../public/fonts/jura/Jura-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/jura/Jura-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/jura/Jura-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/jura/Jura-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/jura/Jura-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const manropeSans = localFont({
  variable: "--font-manrope-sans",
  src: [
    {
      path: "../../public/fonts/manrope/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
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
