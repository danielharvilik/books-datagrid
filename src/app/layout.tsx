import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ReactNode } from "react";

export const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "books datagrid",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
