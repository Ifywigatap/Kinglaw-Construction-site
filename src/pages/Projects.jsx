import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";
import ProjectCard from "../components/projects/ProjectCard";

export default function Projects() {
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Get unique locations for filter buttons
  const locations = useMemo(() => {
    const uniqueLocations = new Set(projects.map(p => p.location));
    return ["All", ...Array.from(uniqueLocations)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedLocation === "All") {
      return projects;
    }
    return projects.filter(p => p.location === selectedLocation);
  }, [selectedLocation]);

  return (
    <main>
      <SEO
        title={`Our Projects | ${companyName}`}
        description={`Explore our portfolio of completed and ongoing projects in Benin City, Edo State, and across Nigeria.`}
        keywords={`construction projects, real estate portfolio, Kinglaw builders projects, ${companyName}`}
      />

      <section className="py-24 bg-background text-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary uppercase tracking-[0.3em] mb-4">Our Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold">Completed & Ongoing Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              A showcase of our commitment to quality, innovation, and excellence in construction.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`rounded-full px-5 py-2 font-medium transition ${
                  selectedLocation === location
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border border-border bg-card text-muted-foreground hover:border-primary"
                }`}
              >
                {location}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>No projects found for this location.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}