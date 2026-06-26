import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "../../data/projects";
import GalleryFilter from "./GalleryFilter";
import Lightbox from "../common/Lightbox";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeCategory
        );

  const [showLightbox, setShowLightbox] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenLightbox = (index) => {
    setActiveIndex(index);
    setShowLightbox(true);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <GalleryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">

          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleOpenLightbox(index)}
              className="cursor-pointer overflow-hidden rounded-2xl group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500 dark:brightness-90 dark:hover:brightness-100"
              />

              <div className="p-4 bg-white dark:bg-slate-900 transition-colors duration-300">
                <h3 className="font-semibold text-slate-900 dark:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
                  {project.category}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

      <AnimatePresence>
        {showLightbox && (
          <Lightbox
            images={filteredProjects.map((p) => p.image)}
            initialIndex={activeIndex}
            onClose={() => setShowLightbox(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}