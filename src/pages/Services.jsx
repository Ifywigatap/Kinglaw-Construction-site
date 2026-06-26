import SEO from "../components/common/SEO";
import ServicesHero from "../components/services/ServicesHero";
import ServicesOverview from "../components/services/ServicesOverview";
import ServiceGrid from "../components/services/ServiceGrid";
import ServiceProcess from "../components/services/ServiceProcess";
import WhyChooseServices from "../components/services/WhyChooseServices";
import ServiceFAQ from "../components/services/ServiceFAQ";
import ServicesCTA from "../components/services/ServicesCTA";
import { services } from "../data/services";
import { companyName, defaultPhoneNumber, defaultEmail, defaultLogoPath } from "../config/constants";


export default function Services() {
  // Ensure absolute URL for structured data logo, which is crucial for SEO crawlers.
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const absoluteLogoUrl = defaultLogoPath.startsWith('http') 
    ? defaultLogoPath 
    : `${origin}${defaultLogoPath.startsWith('/') ? '' : '/'}${defaultLogoPath}`;

  return (
    <main>
      <SEO 
        title="Our Services | Kinglaw Paradise Builders Ltd. | Construction & Real Estate Solutions"
        description="Explore our comprehensive construction and real estate services including residential development, commercial projects, architectural design, and property management in Nigeria."
        keywords="construction services, real estate, architectural design, property development, residential construction, commercial projects, Nigeria"
        ogTitle="Our Services | Kinglaw Paradise Builders Ltd."
        ogDescription="Comprehensive construction and real estate services tailored to your needs. Residential, commercial, and design solutions."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization", // Changed to Organization for consistency with Home.jsx
          "name": companyName,
          "description": "Professional construction and real estate services provider",
          "url": typeof window !== "undefined" ? window.location.href : "",
          "logo": absoluteLogoUrl,
          "areaServed": "Nigeria",
          "serviceType": [ // Consider moving these to a separate config if they grow
            "Residential Construction",
            "Commercial Construction",
            "Architectural Design",
            "Property Management",
            "Real Estate Development",
          ],
          "priceRange": "Contact for quote",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "telephone": defaultPhoneNumber,
            "email": defaultEmail,
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Construction & Real Estate Services",
            "itemListElement": services.map(service => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "serviceType": service.title,
                "name": service.title,
                "description": service.description,
                "url": `${origin}/services/${service.id}`,
                "provider": { "@type": "Organization", "name": companyName }
              }
            })),
          },
        }}
      />
      {/* Services Hero Section */}
      <ServicesHero />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Service Grid - Main Services */}
      <ServiceGrid />

      {/* Service Process/Workflow */}
      <ServiceProcess />

      {/* Why Choose Our Services */}
      <WhyChooseServices />

      {/* FAQs about Services */}
      <ServiceFAQ />

      {/* Services CTA Section */}
      <ServicesCTA />
    </main>
  );
}