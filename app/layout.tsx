import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics";
import StructuredData from "@/components/structured-data";

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RedClaw - 基于OpenClaw自建设及自维护的知识型网站",
  description: "RedClaw 是一个基于 OpenClaw 自建设及自维护的知识型网站，分享 AI 助手搭建、配置和使用的实战经验与深度教程",
  keywords: "RedClaw, OpenClaw, AI, 自托管, 知识库, 教程, Agent, Skill",
  authors: [{ name: "RedClaw" }],
  openGraph: {
    title: "RedClaw - 基于OpenClaw自建设及自维护的知识型网站",
    description: "分享 AI 助手搭建、配置和使用的实战经验与深度教程",
    type: "website",
    locale: "zh_CN",
    siteName: "RedClaw",
  },
  twitter: {
    card: "summary_large_image",
    title: "RedClaw - 基于OpenClaw自建设及自维护的知识型网站",
    description: "分享 AI 助手搭建、配置和使用的实战经验与深度教程",
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
        <link rel="preload" href="/pagefind/pagefind-ui.css" as="style" />
        <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
