export default function StructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RedClaw",
    "url": "https://redclaw.cc",
    "description": "基于 OpenClaw 自建设及自维护的知识型网站，分享 AI 助手搭建、配置和使用的实战经验",
    "inLanguage": "zh-CN",
    "author": {
      "@type": "Organization",
      "name": "RedClaw"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RedClaw",
    "url": "https://redclaw.cc",
    "logo": "https://redclaw.cc/icon-192x192.png",
    "sameAs": [
      "https://github.com/openclaw/openclaw",
      "https://discord.com/invite/clawd"
    ],
    "description": "基于 OpenClaw 自建设及自维护的知识型网站"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}
