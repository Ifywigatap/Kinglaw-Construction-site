import { useSearchParams } from "react-router-dom";
import { FolderX } from "lucide-react";
import { projects } from "../../data/projects";
import ProjectCard from "../common/ProjectCard";
import ProjectFilter, { categories } from "./ProjectFilter";

export default function ProjectsGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get the raw category from the URL
  const categoryParam = searchParams.get("category");
  
  // Validate against the whitelist (case-insensitive) or default to "All"
  const activeCategory = categories.find(
    (cat) => cat.toLowerCase() === categoryParam?.toLowerCase()
  ) || "All";

  const setActiveCategory = (category) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeCategory
        );

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <ProjectFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex justify-center mb-6 text-slate-300 dark:text-slate-700">
              <FolderX size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
              No Projects Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 transition-colors">
              We haven't listed any projects under the "{activeCategory}" category yet.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-6 text-amber-500 font-bold hover:text-amber-400 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}

      </div>

    </section>
  );
}