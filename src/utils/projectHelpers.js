export function filterProjects(projects, filterFn) {
  if (!Array.isArray(projects)) return [];
  return projects.filter(filterFn);
}

export function sortProjects(projects, compareFn) {
  if (!Array.isArray(projects)) return [];
  return [...projects].sort(compareFn);
}

export function findProjectBySlug(projects, slug) {
  if (!Array.isArray(projects) || !slug) return null;
  return projects.find((project) => project.slug === slug || project.id === slug) ?? null;
}
