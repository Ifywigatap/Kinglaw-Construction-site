import { useParams } from "react-router-dom";
import { projects } from "../../data/projects";

export default function ProjectHero() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) return null;

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${project.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 text-center text-white">
        <p className="text-amber-500 mb-4">
          {project.category}
        </p>

        <h1 className="text-5xl md:text-7xl font-bold">
          {project.title}
        </h1>
      </div>
    </section>
  );
}