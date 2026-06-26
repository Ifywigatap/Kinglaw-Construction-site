import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../../data/projects"; // Assuming this data file exists
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import OptimizedImage from "../common/OptimizedImage";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Displays a grid of featured projects.
 * @param {{limit?: number}} props - The limit prop can be used to display a specific number of projects.
 */
export default function FeaturedProjects({ limit = 3 }) {
  const displayedProjects = projects.slice(0, limit);

  return (
    <section className="py-24 bg-secondary text-secondary-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          subtitle="Our Portfolio"
          title="Featured Projects"
          description="A glimpse into our commitment to quality, innovation, and client satisfaction across various sectors."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="group relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Link to={`/projects/${project.id}`} className="block">
                <div className="h-96">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="text-sm font-semibold text-primary mb-1">{project.category}</p>
                  <h3 className="text-2xl font-bold leading-tight line-clamp-2">{project.title}</h3>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-semibold text-sm inline-flex items-center">
                      View Project <ArrowRight size={16} className="ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button as={Link} to="/projects" variant="primary" size="lg">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}