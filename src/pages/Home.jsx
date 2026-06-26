import SEO from "../components/common/SEO";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import ServiceGrid from "../components/services/ServiceGrid";
import FeaturedProperties from "../components/home/FeaturedProperties";
import FeaturedProjects from "../components/home/FeaturedProjects";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import { companyName, defaultPhoneNumber, defaultLogoPath } from "../config/constants";
import { socialMedia } from "../config/socialMedia";

export default function Home() {
  return (
    <main>
      <SEO 
        title="Kinglaw Paradise Builders Ltd. | Premier Construction & Real Estate in Nigeria"
        description="Kinglaw Paradise Builders Ltd. delivers excellence in residential development, commercial construction, and architectural design. Building your dreams with integrity."
        keywords={`construction company Nigeria, real estate developer, architectural design, property development, building contractors, ${companyName}`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": companyName,
          "url": typeof window !== "undefined" ? window.location.origin : "",
          "logo": typeof window !== "undefined" && defaultLogoPath.startsWith('/') ? `${window.location.origin}${defaultLogoPath}` : defaultLogoPath,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": defaultPhoneNumber,
            "contactType": "customer service"
          },
          "sameAs": [
            socialMedia.facebookUrl,
            socialMedia.instagramUrl,
            socialMedia.linkedinUrl
          ]
        }}
      />
      
      <Hero />
      <FeaturedProperties />
      <AboutPreview />
      <ServiceGrid limit={3} showViewAll={true} />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
}