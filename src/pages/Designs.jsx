import { motion } from "framer-motion";
import { companyName } from "../config/constants";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import SEO from "../components/common/SEO"; // Import SEO component
import OptimizedImage from "../components/common/OptimizedImage";
import { designs } from "../data/catalog";

export default function Designs() {
  return (
    <main>
      <SEO
        title={`Architectural & Interior Design | ${companyName}`}
        description="Professional architectural and interior design services. We combine aesthetics, function, and cost efficiency for beautiful, practical builds."
        keywords={`architectural design, interior design, building plans, Nigeria architects, home design, commercial design, ${companyName}`}
        ogTitle={`Bespoke Design Services | ${companyName}`}
        ogDescription="Thoughtful design combining aesthetics and function for every construction project."
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Architectural and Interior Design",
          "provider": {
            "@type": "LocalBusiness",
            "name": companyName
          },
          "description": "Custom design offerings that combine aesthetics, function, and cost efficiency.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Design Services",
            "itemListElement": designs.map(item => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": item.title,
                "description": item.description
              }
            }))
          }
        }}
      />
      <section className="py-24 bg-background text-foreground transition-colors duration-300 overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary uppercase tracking-[0.3em] mb-4">
            Design Services
          </p>
          <h1 className="font-bold transition-colors">
            Thoughtful Design for Every Project
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
            Our design offerings combine aesthetics, function, and cost efficiency so your build is beautiful and practical.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid-responsive gap-8"
        >
          {designs.map((item, index) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}              className="group bg-card border border-border hover:border-primary/40 transition-all duration-300 p-8 flex flex-col h-full rounded-[2rem] shadow-sm"
            >
              {item.image && (
                <div className="h-52 overflow-hidden rounded-2xl bg-secondary mb-6">
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt || item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-3 text-foreground transition-colors">
                {item.title}
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                {item.type}
              </div>
              <p className="text-foreground font-medium mb-4 transition-colors">
                Delivery in <span className="text-primary">{item.delivery}</span>
              </p>
              <p className="text-muted-foreground leading-relaxed flex-grow transition-colors">
                {item.description}
              </p>
              <div className="mt-8 flex gap-3">
                <Button as={Link} to="/contact" variant="outline" className="flex-grow">
                  Request Information
                </Button>
                <ShareButton title={item.title} text={item.description} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
    </main>
  );
}
