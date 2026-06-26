import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";
import { catalogCategories } from "../data/catalog";
import OptimizedImage from "../components/common/OptimizedImage";

export default function Catalog() {
  return (
    <main>
      <SEO 
        title={`Product & Service Catalog | ${companyName}`}
        description="Explore our catalog for rentals, land sales, architectural design services, artifacts, materials, and professional building plans in Nigeria."
        keywords="construction catalog, property rentals, land for sale, architectural design, building materials, construction plans Nigeria"
        ogTitle={`Explore Our Catalog | ${companyName}`}
        ogDescription="Discover dedicated pages for rentals, land sales, design services, artifacts, materials, and building plans."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${companyName} Catalog`,
          "description": `Comprehensive catalog of real estate and construction solutions provided by ${companyName}`,
          "url": typeof window !== "undefined" ? window.location.href : ""
        }}
      />
      <section className="py-24 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] mb-4">
            Explore More
          </p>
          <h1 className="text-4xl md:text-5xl font-bold transition-colors">
            Rental, Land, Design & Material Solutions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 transition-colors">
            Discover dedicated pages for rentals, land sales, design services, artifacts, materials, and building plans.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogCategories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="group block overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary hover:bg-secondary shadow-sm"
            >
              <div className="h-48 overflow-hidden rounded-2xl bg-secondary mb-5 transition-colors">
                <OptimizedImage
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-foreground transition-colors">{category.title}</h2>
              <p className="text-muted-foreground transition-colors">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </main>
  );
}
