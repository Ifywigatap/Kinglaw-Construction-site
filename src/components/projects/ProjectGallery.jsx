import { projects } from "../../data/projects";

export default function ProjectGallery() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-16 transition-colors">
          Project Gallery
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">

          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors shadow-sm"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover hover:scale-110 transition duration-500 dark:brightness-90 dark:hover:brightness-100"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}