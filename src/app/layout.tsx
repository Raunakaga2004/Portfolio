import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Qwigley } from "next/font/google";

import { Poppins } from "next/font/google";

export const qwigley = Qwigley({
  subsets: ["latin"],
  variable: "--font-qwigley",
  weight : ['400'],
  display :  "swap"
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight : ["400"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Raunak's Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-backgroundcolor overflow-x-hidden overflow-y-hidden box-border`}
      >
        {children}
      </body>
    </html>
  );
}
