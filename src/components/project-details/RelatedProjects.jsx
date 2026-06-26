import { projects } from "../../data/projects";
import ProjectCard from "../common/ProjectCard";

export default function RelatedProjects() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 transition-colors">
          Related Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}

        </div>

      </div>

    </section>
  );
}