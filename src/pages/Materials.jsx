import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { companyName } from "../config/constants";
import SEO from "../components/common/SEO";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import OptimizedImage from "../components/common/OptimizedImage";
import { materials as staticMaterials } from "../data/catalog";
import useManagedData from "../hooks/useManagedData";

export default function Materials() {
  const { data: materials } = useManagedData('materials', staticMaterials);

  return (
    <main>
      <SEO
        title={`Building Materials | ${companyName} | Quality Construction Supplies`} // Already good
        description={`Explore premium building materials at ${companyName}. High-quality supplies for durable residential and commercial construction in Nigeria.`}
        keywords={`building materials, construction supplies, Nigeria, Kinglaw builders, quality building, real estate materials, ${companyName}`}
        ogTitle={`Building Materials | ${companyName}`}
        ogDescription="Reliable materials for strong builds. Selected for durability and performance."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `${companyName} Materials Catalog`,
          "description": "Collection of premium building materials for professional construction projects.",
          "numberOfItems": materials.length,
          "itemListElement": materials.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": item.title,
              "description": item.description,
              "brand": {
                "@type": "Brand",
                "name": companyName
              }
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
              Building Materials
            </p>
            <h1 className="font-bold transition-colors">
              Reliable Materials for Strong Builds
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
              Browse our collection of premium materials, selected for durability, performance, and value.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid-responsive gap-8"
          >
            {materials.map((item, index) => (
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
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 w-fit">
                  {item.type}
                </div>
                <p className="text-foreground font-medium text-lg mb-4 transition-colors">
                  {item.price}
                </p>
                <p className="text-muted-foreground leading-relaxed flex-grow transition-colors">
                  {item.description}
                </p>
                <div className="mt-8 flex gap-3">
                  <Button 
                    as={Link}
                    to={`/catalog/materials/${item.id}`}
                    variant="outline"                     className="flex-grow"
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
