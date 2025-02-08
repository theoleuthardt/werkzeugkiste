import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "file-to-pdf",
  description: "Converter for files to pdf format!",
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
