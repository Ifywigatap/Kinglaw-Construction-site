import { motion } from "framer-motion";
import ServiceCard from "../common/ServiceCard";
import SectionHeading from "../common/SectionHeading";
import { services } from "../../data/services.js";

export default function ServicesPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="py-24 bg-secondary transition-colors duration-300">
      <motion.div 
        className="max-w-7xl mx-auto px-4 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={itemVariants}>
          <SectionHeading
            subtitle="Services"
            title="What We Offer"
            description="Comprehensive construction services tailored to your needs."
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                galleryLink={service.galleryLink}
              />
            </motion.div>
          ))}

        </motion.div>

      </motion.div>

    </section>
  );
}