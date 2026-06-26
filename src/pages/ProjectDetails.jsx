import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { companyName } from "../config/constants";
import { projects } from "../data/projects";
import SEO from "../components/common/SEO";
import ProjectHero from "../components/project-details/ProjectHero";
import ProjectOverview from "../components/project-details/ProjectOverview";
import ProjectGallery from "../components/project-details/ProjectGallery";
import ProjectFeatures from "../components/project-details/ProjectFeatures";
import RelatedProjects from "../components/project-details/RelatedProjects";
import ProjectCTA from "../components/project-details/ProjectCTA";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    // If no project is found for the given ID, redirect to the 404 page.
    if (!project) {
      navigate('/404', { replace: true });
    }
  }, [project, navigate]);

  // Render nothing or a loading spinner while redirecting
  if (!project) {
    return null;
  }

  return (
    <main>
      <SEO 
        title={`${project.title} | ${companyName}`}
        description={project.description}
        keywords={`${project.title}, ${project.category}, ${project.location}, construction project, ${companyName}`}
        ogType="article"
        ogImage={project.image}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": project.title,
          "description": project.description,
          "image": project.image,
          "datePublished": project.year,
          "author": {
            "@type": "Organization",
            "name": companyName
          },
          "publisher": {
            "@type": "Organization",
            "name": companyName,
            "logo": { "@type": "ImageObject", "url": "https://www.kinglawparadisebuilders.com/logo.png" } // Replace with your absolute logo URL
          },
        }}
      />
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectFeatures project={project} />
      <RelatedProjects currentProjectId={project.id} />
      <ProjectCTA />
    </main>
  );
}