import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import SEO from "../components/common/SEO";
import OptimizedImage from "../components/common/OptimizedImage";
import { companyName } from "../config/constants";
import { rentals } from "../data/catalog";

export default function Rentals() {
  return (
    <main>
      <SEO 
        title={`Premium Rentals | ${companyName} | Commercial & Site Facilities`}
        description={`Premium office, warehouse, and event rentals designed for business continuity. Flexible occupancy solutions by ${companyName}.`}
        keywords={`commercial rentals, office space Nigeria, warehouse rental, event space, Kinglaw Paradise rentals, ${companyName}`}
        ogTitle={`Premium Rentals | ${companyName}`}
        ogDescription="Reliable spaces and site facilities designed for business excellence."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Commercial and Facility Rentals",
          "description": "Professional spaces including offices, warehouses, and event venues.",
          "numberOfItems": rentals.length,
          "itemListElement": rentals.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Accommodation",
              "name": item.title,
              "description": item.description,
              "address": item.location
            }
          }))
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
            Premium Rentals
          </p>
          <h1 className="font-bold transition-colors">
            Reliable Spaces & Site Facilities
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
            Choose from a curated collection of office, warehouse, and event rentals designed for business continuity and flexible occupancy.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid-responsive gap-8"
        >
          {rentals.map((item, index) => (
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
              <h2 className="text-2xl font-semibold mb-3 text-foreground transition-colors">{item.title}</h2>
              <p className="text-primary font-bold text-lg mb-1">{item.price}</p>
              <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-grow transition-colors">
                {item.description}
              </p>
              <ul className="mb-6 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-card-foreground text-sm transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-border transition-colors">
                <p className="text-muted-foreground/80 text-xs italic">
                  Flexible leasing terms and first-rate property support available.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <Button 
                  as={Link} 
                  to={`/catalog/rentals/${item.id}`} 
                  variant="outline"                   className="flex-grow"
                >
                  View Details
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
