import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics";
import StructuredData from "@/components/structured-data";

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "OpenClaw 中文教程 - 自托管 AI 网关",
  description: "OpenClaw 中文教程网站 - 学习如何部署和配置 OpenClaw，将 AI 助手接入 WhatsApp、Telegram、Discord 等聊天应用",
  keywords: "OpenClaw, AI, 自托管, WhatsApp, Telegram, Discord, 教程",
  authors: [{ name: "OpenClaw 中文社区" }],
  openGraph: {
    title: "OpenClaw 中文教程",
    description: "自托管 AI 网关，连接你的所有聊天应用",
    type: "website",
    locale: "zh_CN",
    siteName: "OpenClaw 中文教程",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw 中文教程",
    description: "自托管 AI 网关，连接你的所有聊天应用",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  alternates: {
    canonical: "https://redclaw.cc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <GoogleAnalytics />
        <StructuredData />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
