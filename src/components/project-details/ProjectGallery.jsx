import { useParams } from "react-router-dom";
import { projects } from "../../data/projects";

export default function ProjectGallery() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) return null;

  const gallery =
    project.gallery || [
      project.image,
      project.image,
      project.image,
      project.image,
    ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 transition-colors">
          Project Gallery
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">

          {gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Project"
              className="rounded-2xl h-64 w-full object-cover border border-transparent dark:border-slate-800 transition-all duration-300 dark:brightness-90 hover:brightness-100 shadow-sm"
            />
          ))}

        </div>

      </div>

    </section>
  );
}