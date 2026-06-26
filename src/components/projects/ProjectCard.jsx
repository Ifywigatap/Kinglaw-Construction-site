import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="group rounded-3xl border border-border bg-card shadow-xl overflow-hidden"
    >
      <div className="h-64 overflow-hidden bg-secondary relative">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground">
          {project.status}
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-primary mb-2">{project.category}</p>
        <h3 className="text-xl font-bold text-foreground mb-2 truncate">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{project.location} • {project.year}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{project.description}</p>
        <div className="mt-4">
          <Link to={`/projects/${project.id}`} className="text-sm font-bold text-primary hover:underline">
            View Details &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
}