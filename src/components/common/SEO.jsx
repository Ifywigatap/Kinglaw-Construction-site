import { Helmet } from "react-helmet-async";
import { socialMedia } from "../../config/socialMedia";
import { companyName, defaultLogoPath } from "../../config/constants";


export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage,
  ogType = "website", 
  ogUrl,
  twitterCard = "summary_large_image",
  twitterSite = socialMedia.twitterHandle,
  structuredData 
}) {
  const siteName = companyName;
  const currentUrl = ogUrl || (typeof window !== "undefined" ? window.location.href : "");
  const seoTitle = title || siteName;
  const seoDescription = description || "Expert construction and real estate services in Nigeria.";

  // Ensure images have absolute URLs for social crawlers
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const defaultImage = `${origin}${defaultLogoPath}`;
  const absoluteOgImage = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${origin}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`) 
    : defaultImage;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle || seoTitle} />
      <meta property="og:description" content={ogDescription || seoDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={absoluteOgImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={ogTitle || seoTitle} />
      <meta name="twitter:description" content={ogDescription || seoDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={ogTitle || seoTitle} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}