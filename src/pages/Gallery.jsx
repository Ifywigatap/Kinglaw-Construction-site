import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SEO from "../components/common/SEO";
import { companyName } from "../config/constants";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryGrid from "../components/gallery/GalleryGrid";
import BeforeAfterSection from "../components/gallery/BeforeAfterSection";
import VideoShowcase from "../components/gallery/VideoShowcase";
import GalleryCTA from "../components/gallery/GalleryCTA";
import Lightbox from "../components/common/Lightbox";
import useLocalStorage from "../hooks/useLocalStorage";
import { adminGalleryKey, initialAdminGalleryImages } from "../data/adminGallery";

export default function Gallery() {
  const [adminImages] = useLocalStorage(adminGalleryKey, initialAdminGalleryImages);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAdminLightbox, setShowAdminLightbox] = useState(false);
  const [adminActiveIndex, setAdminActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Brief delay to simulate retrieval and prevent layout pop-in
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenAdminLightbox = (index) => {
    setAdminActiveIndex(index);
    setShowAdminLightbox(true);
  };

  const handleCloseAdminLightbox = useCallback(() => {
    setShowAdminLightbox(false);
  }, []);

  const categories = useMemo(() => [
    { id: "all", label: "All Images" },
    { id: "construction", label: "Construction" },
    { id: "design", label: "Design" },
    { id: "completed", label: "Completed Projects" },
  ], []);

  const filteredImages = useMemo(() => 
    selectedCategory === "all" ? adminImages : adminImages.filter((img) => img.category === selectedCategory),
    [adminImages, selectedCategory]
  );

  const adminLightboxImages = useMemo(() => 
    filteredImages.map((img) => img.src), 
  [filteredImages]);

  const adminLightboxAlts = useMemo(() => 
    filteredImages.map((img) => img.alt || img.title), 
  [filteredImages]);

  return (
    <main>
      <SEO 
        title={`Project Gallery | ${companyName} | Construction Showcase`}
        description={`View our project gallery featuring construction milestones, architectural designs, and completed builds. Experience the quality of ${companyName}.`}
        keywords={`construction gallery, building photos, architectural showcase, interior design photos, Kinglaw builders gallery, ${companyName}`}
        ogTitle={`Construction & Design Gallery | ${companyName}`}
        ogDescription={`Visualize our commitment to quality through our extensive gallery of projects and designs by ${companyName}.`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": `${companyName} Project Gallery`,
          "description": `Visual showcase of construction and design work by ${companyName}.`,
          "url": typeof window !== "undefined" ? window.location.href : ""
        }}
      />

      <GalleryHero />
      
      {/* Local Admin Images Section */}
      <section className="py-24 bg-background text-foreground transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-primary uppercase tracking-[0.3em] mb-4">Local Gallery</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 transition-colors">Admin-Managed Showcase</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto transition-colors">
              Images managed through the admin dashboard. Filter and explore locally stored project galleries.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2 font-medium transition ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border border-border bg-card text-muted-foreground hover:border-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
                  <div className="h-64 bg-secondary" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-secondary rounded-lg w-3/4" />
                    <div className="h-4 bg-secondary rounded-lg w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
              <p className="mb-4">No images in this category yet.</p>
              <Link
                to="/admin"
                className="inline-flex items-center rounded-2xl border border-primary bg-primary/10 px-5 py-3 text-primary transition hover:bg-primary/20"
              >
                Add Images from Admin Dashboard
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((image, index) => (
                <article
                  key={image.id}
                  onClick={() => handleOpenAdminLightbox(index)}
                  className="group rounded-3xl border border-border bg-card shadow-xl overflow-hidden transition hover:border-primary cursor-pointer"
                >
                  <div className="h-64 overflow-hidden bg-secondary">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{image.title}</h3>
                    <p className="text-muted-foreground text-sm">{image.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Manage Link */}
          <div className="mt-12 text-center">
            <Link
              to="/admin/gallery"
              className="inline-flex items-center rounded-2xl border border-primary bg-primary/10 px-5 py-3 text-primary transition hover:bg-primary/20"
            >
              View Full Admin Gallery Preview
            </Link>
          </div>
        </div>
      </section>

      <GalleryGrid />
      <BeforeAfterSection />
      <VideoShowcase />
      <GalleryCTA />

      <AnimatePresence>
        {showAdminLightbox && (
          <Lightbox
            images={adminLightboxImages}
            imageAlts={adminLightboxAlts}
            initialIndex={adminActiveIndex}
            onClose={handleCloseAdminLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
