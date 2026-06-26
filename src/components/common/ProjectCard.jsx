import ListingCard from "./ListingCard";

export default function ProjectCard({
  id,
  image,
  title,
  category,
  location,
}) {
  return (
    <ListingCard
      image={image}
      title={title}
      category={category}
      location={location}
      path={`/projects/${id}`}
      price="Quote on Request"
    />
  );
}