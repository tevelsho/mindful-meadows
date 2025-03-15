import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressBar } from "@/components/layout/Progressbar";
import { Volume } from "@/components/Volume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindful Meadows",
  description: "Your Mental Health Stop Solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${dmSans.variable} 
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          flex 
          flex-col 
          h-screen
          bg-[#ecdbcb] 
          bg-grid 
          bg-cover
        `}
      >
        <Header />
        <Sidebar />
        <ProgressBar />
        {children}
        <Volume />
      </body>
    </html>
  );
}
