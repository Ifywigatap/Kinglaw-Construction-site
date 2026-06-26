export function buildPageTitle(title, siteName = "Kinglaw Paradise Builders Ltd.") {
  if (!title) return siteName;
  return `${title} | ${siteName}`;
}

export function buildMetaDescription(description, fallback = "Building dreams into reality through expert construction and engineering services.") {
  return description || fallback;
}

export function buildMetaTags({ title, description, url, image }) {
  return {
    title: buildPageTitle(title),
    description: buildMetaDescription(description),
    openGraph: {
      title: buildPageTitle(title),
      description: buildMetaDescription(description),
      url,
      image,
    },
  };
}
