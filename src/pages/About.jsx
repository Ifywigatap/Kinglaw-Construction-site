import SEO from "../components/common/SEO";
import AboutHero from "../components/about/AboutHero";
import CompanyOverview from "../components/about/CompanyOverview";
import MissionVision from "../components/about/MissionVision";
import CoreValues from "../components/about/CoreValues";
import CompanyTimeline from "../components/about/CompanyTimeline";
import TeamSection from "../components/about/TeamSection";
import Achievements from "../components/about/Achievements";
import { companyName, defaultPhoneNumber, defaultEmail, defaultLogoPath } from "../config/constants";

export default function About() {
  return (
    <main>
      <SEO 
        title="About Us | Kinglaw Paradise Builders Ltd. | Construction & Real Estate"
        description="Learn about Kinglaw Paradise Builders Ltd., our mission, values, team, and commitment to excellence in construction and real estate development in Nigeria."
        keywords="construction company Nigeria, real estate developers, building contractors, Kinglaw Paradise Builders, construction team, engineering excellence"
        ogTitle="About Us | Kinglaw Paradise Builders Ltd."
        ogDescription="Discover our story, mission, values, and the team behind Kinglaw Paradise Builders Ltd."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Kinglaw Paradise Builders Ltd.",
          "description": "Learn about Kinglaw Paradise Builders Ltd., our mission, values, team, and commitment to excellence in construction and real estate development.",
          "url": typeof window !== "undefined" ? window.location.href : "",
          "publisher": {
            "@type": "Organization",
            "name": companyName,
            "logo": {
              "@type": "ImageObject",
              "url": typeof window !== "undefined" && defaultLogoPath.startsWith('/') ? `${window.location.origin}${defaultLogoPath}` : defaultLogoPath,
            },
            "contact": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": defaultPhoneNumber,
              "email": defaultEmail,
            },
          },
        }}
      />
      {/* About Page Hero Section */}
      <AboutHero />

      {/* Company Overview */}
      <CompanyOverview />

      {/* Mission and Vision */}
      <MissionVision />

      {/* Core Values */}
      <CoreValues />

      {/* Company Timeline */}
      <CompanyTimeline />

      {/* Team Section */}
      <TeamSection />

      {/* Achievements and Recognition */}
      <Achievements />
    </main>
  );
}