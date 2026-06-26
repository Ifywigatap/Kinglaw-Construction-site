import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import OptimizedImage from "../components/common/OptimizedImage";
import { artifacts } from "../data/catalog";

export default function Artifacts() {
  return (
    <main>
      <SEO 
        title={`Curated Artifacts & Decor | ${companyName}`}
        description={`Discover handpicked artifacts and bespoke decorative pieces designed to elevate premium construction and interior spaces by ${companyName}.`}
        keywords={`decorative artifacts, luxury interior, bespoke decor, Kinglaw builders decor, artistic pieces Nigeria, ${companyName}`}
        ogTitle={`Curated Artifacts | ${companyName}`}
        ogDescription="Elevate your space with handpicked artifacts and bespoke decorative pieces."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Bespoke Decorative Artifacts Catalog",
          "description": "Collection of handpicked artifacts for premium interiors.",
          "numberOfItems": artifacts.length,
          "itemListElement": artifacts.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Thing",
              "name": item.title,
              "description": item.description
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
            Artifacts
          </p>
          <h1 className="font-bold transition-colors">
            Curated Decorative Artifacts
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
            Handpicked artifacts and bespoke pieces designed to elevate premium construction and interior spaces.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid-responsive gap-8"
        >
          {artifacts.map((item, index) => (
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
              <div className="text-primary text-sm font-medium mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/50" />
                {item.origin}
              </div>
              <p className="text-muted-foreground leading-relaxed flex-grow transition-colors">
                {item.description}
              </p>
              <div className="mt-8 flex gap-3">
                <Button 
                  as={Link}
                  to={`/catalog/artifacts/${item.id}`}
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
