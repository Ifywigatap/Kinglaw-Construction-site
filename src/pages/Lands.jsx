import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import OptimizedImage from "../components/common/OptimizedImage";
import { lands } from "../data/catalog";

export default function Lands() {
  return (
    <main>
      <SEO
        title={`Prime Lands for Sale | ${companyName} | Development Land Nigeria`}
        description="Strategic land parcels for development. Invest in prime locations in Nigeria selected for accessibility and high growth potential."
        keywords={`land for sale, real estate Nigeria, property investment, development land, Kinglaw Paradise Builders, ${companyName}`}
        ogTitle={`Prime Lands for Sale | ${companyName}`}
        ogDescription="Discover strategic land parcels selected for development, visibility, and growth."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Prime Development Land Catalog",
          "description": "Collection of strategic land parcels for residential and commercial development.",
          "numberOfItems": lands.length,
          "itemListElement": lands.map((lot, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Place",
              "name": lot.title,
              "address": lot.location,
              "description": lot.description
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
              Lands for Sale
            </p>
            <h1 className="font-bold transition-colors">
              Strategic Land Parcels for Development
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
              Invest in prime land locations selected for accessibility, visibility, and strong growth potential.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid-responsive gap-8"
          >
            {lands.map((lot, index) => (
              <motion.article 
                key={lot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}              className="group bg-card border border-border hover:border-primary/40 transition-all duration-300 p-8 flex flex-col h-full rounded-[2rem] shadow-sm"
              >
              {lot.image && (
                <div className="h-52 overflow-hidden rounded-2xl bg-secondary mb-6">
                  <OptimizedImage
                    src={lot.image}
                    alt={lot.alt || lot.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
                <h2 className="text-2xl font-semibold mb-3 text-foreground transition-colors">
                  {lot.title}
                </h2>
                <div className="text-primary font-bold text-lg mb-2">
                  {lot.price}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4 transition-colors">
                  <span className="px-2 py-0.5 rounded bg-secondary text-card-foreground font-medium transition-colors">
                    {lot.size}
                  </span>
                  <span>•</span>
                  <span>{lot.location}</span>
                </div>
              <p className="text-muted-foreground leading-relaxed flex-grow transition-colors">
                  {lot.description}
                </p>
              <div className="mt-8 flex gap-3">
                <Button 
                  as={Link}
                  to={`/catalog/lands/${lot.id}`}
                  variant="outline"                   className="flex-grow"
                >
                  View Details
                </Button>
                <ShareButton title={lot.title} text={lot.description} />
              </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
