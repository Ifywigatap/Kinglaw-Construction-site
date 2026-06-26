export function scrollToSection(id, offset = 0, behavior = "smooth") {
  const element = document.getElementById(id);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top, behavior });
}
