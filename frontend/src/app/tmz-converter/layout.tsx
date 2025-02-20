import React from "react";
import type { Metadata } from "next";
import { toolLinks } from "@/constants";

export const metadata: Metadata = {
  title: toolLinks[1].title,
  description: "Converter for timezones!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
