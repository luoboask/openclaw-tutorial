export default function StructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OpenClaw 中文教程",
    "url": "https://redclaw.cc",
    "description": "OpenClaw 中文教程网站 - 学习如何部署和配置 OpenClaw",
    "inLanguage": "zh-CN",
    "author": {
      "@type": "Organization",
      "name": "OpenClaw 中文社区"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OpenClaw 中文社区",
    "url": "https://redclaw.cc",
    "logo": "https://redclaw.cc/icon-192x192.png",
    "sameAs": [
      "https://github.com/openclaw/openclaw",
      "https://discord.com/invite/clawd"
    ]
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
