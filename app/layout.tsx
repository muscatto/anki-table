import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "暗記テーブル",
  description: "表を効率的に暗記できるアプリ「暗記テーブル」は、作成したすべての表のセルを簡単に隠したり表示したりすることができるアプリです。表はゼロから簡単に作成できるため、さまざまな用途に使用することができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} flex flex-col min-h-screen items-center justify-start gap-4`}>
        <header className="pt-10 pb-5">
          <h1 className="text-4xl font-semibold">暗記テーブル</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
