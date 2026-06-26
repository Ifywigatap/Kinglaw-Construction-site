import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../../data/services";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Displays a grid of services.
 * @param {{limit?: number}} props - The limit prop can be used to display a specific number of services.
 * @param {{showViewAll?: boolean}} props - If true, shows a "View All" button when a limit is set.
 */
export default function ServiceGrid({ limit, showViewAll = false }) {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-24 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          subtitle="What We Offer"
          title="Our Core Services"
          description="From initial design to final construction, we provide a complete range of services to bring your vision to life."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedServices.map((service) => (
            <motion.article key={service.id} variants={itemVariants}>
              <Link to={service.link} className="group block h-full">
                <div className="bg-card border border-border rounded-3xl p-8 h-full flex flex-col items-start shadow-lg hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-5 p-4 rounded-2xl bg-primary/10 text-primary">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-5">
                    {service.description}
                  </p>
                  <span className="font-semibold text-primary text-sm">Learn More →</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {limit && showViewAll && (
          <div className="mt-16 text-center">
            <Button as={Link} to="/services" variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}