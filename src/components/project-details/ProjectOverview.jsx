import { useParams } from "react-router-dom";
import { projects } from "../../data/projects";

export default function ProjectOverview() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) return null;

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 transition-colors">
          Project Overview
        </h2>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
          {project.description}
        </p>

      </div>
    </section>
  );
}