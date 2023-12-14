import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Tasktree",
  description: "Break down your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
