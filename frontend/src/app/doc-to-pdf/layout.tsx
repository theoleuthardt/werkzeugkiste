import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "doc-to-pdf",
  description: "Converter for documents to pdf format!",
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
