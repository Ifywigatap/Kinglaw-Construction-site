import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import SEO from "../components/common/SEO";
import OptimizedImage from "../components/common/OptimizedImage";
import { companyName } from "../config/constants";
import { buildingPlans } from "../data/catalog";

export default function BuildingPlans() {
  return (
    <main>
      <SEO 
        title={`Ready-to-Use & Custom Building Plans | ${companyName}`}
        description="Select from expertly crafted building plans to speed project delivery and support better construction outcomes. Custom architectural blueprints for every need."
        keywords={`building plans, architectural blueprints, house designs, construction plans, floor plans Nigeria, Kinglaw builders, ${companyName}`}
        ogTitle={`Building Plans | ${companyName}`}
        ogDescription="Ready-to-use and custom architectural blueprints designed for excellence."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Building Plans Catalog",
          "description": "Collection of professionally designed building plans and floor plans.",
          "numberOfItems": buildingPlans.length,
          "itemListElement": buildingPlans.map((plan, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "CreativeWork",
              "name": plan.title,
              "description": plan.description
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
            Building Plans
          </p>
          <h1 className="font-bold transition-colors">
            Ready-to-Use & Custom Building Plans
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
            Select from expertly crafted building plans to speed project delivery and support better construction outcomes.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid-responsive gap-8"
        >
          {buildingPlans.map((plan, index) => (
            <motion.article 
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}              className="group bg-card border border-border hover:border-primary/40 transition-all duration-300 p-8 flex flex-col h-full rounded-[2rem] shadow-sm"
            >
              {plan.image && (
                <div className="h-52 overflow-hidden rounded-2xl bg-secondary mb-6">
                  <OptimizedImage
                    src={plan.image}
                    alt={plan.alt || plan.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-3 text-foreground transition-colors">
                {plan.title}
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                {plan.area}
              </div>
              <p className="text-foreground font-medium text-lg mb-4 transition-colors">
                {plan.price}
              </p>
              <p className="text-muted-foreground leading-relaxed flex-grow transition-colors">
                {plan.description}
              </p>
                <div className="mt-8 flex gap-3">
                  <Button 
                    as={Link}
                    to={`/catalog/building-plans/${plan.id}`}
                    variant="outline"                     className="flex-grow"
                  >
                    View Details
                  </Button>
                  <ShareButton title={plan.title} text={plan.description} />
                </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
    </main>
  );
}
