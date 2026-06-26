import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLocalStorage from "../hooks/useLocalStorage";
import { adminGalleryKey, initialAdminGalleryImages } from "../data/adminGallery";
import Button from "../components/common/Button";

export default function AdminGallery() {
  const [images] = useLocalStorage(adminGalleryKey, initialAdminGalleryImages);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-12 rounded-3xl border border-border bg-card p-10 shadow-xl transition-colors duration-300">
          <p className="text-primary uppercase tracking-[0.3em] mb-4">Image Preview</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 transition-colors">Local Admin Gallery Preview</h1>
          <p className="text-muted-foreground max-w-3xl transition-colors">
            View the locally stored images created through the admin dashboard. Use this page to verify the current gallery state before publishing.
          </p>
          <div className="mt-8">
            <Link to="/admin">
              <Button variant="secondary">
                Back to Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground transition-colors duration-300">
            No images saved yet. Add images first from the admin dashboard.
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {images.map((image) => (
              <motion.article key={image.id} variants={itemVariants} className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden transition-colors duration-300">
                <div className="h-72 overflow-hidden bg-secondary transition-colors">
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-foreground transition-colors">{image.title}</h2>
                  <p className="text-muted-foreground mb-4 transition-colors">{image.description}</p>
                  <p className="text-muted-foreground/80 text-sm transition-colors">Alt: {image.alt}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
