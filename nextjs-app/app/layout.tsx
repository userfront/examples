import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Userfront from "@userfront/react";

Userfront.init("demo1234");

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Userfront Next.js Example`,
  description: `TypeScript starter for Next.js that includes a basic implementation of Userfront.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
