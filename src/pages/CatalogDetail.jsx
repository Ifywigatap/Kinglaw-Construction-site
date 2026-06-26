import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { rentals, lands, designs, artifacts, materials, buildingPlans, catalogCategories } from "../data/catalog";
import { companyName, defaultLogoPath } from "../config/constants";
import SEO from "../components/common/SEO";
import Button from "../components/common/Button";
import ShareButton from "../components/common/ShareButton";
import PropertyInquiryForm from "../components/common/PropertyInquiryForm";
import OptimizedImage from "../components/common/OptimizedImage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { ChevronLeft, ChevronRight, MapPin, Tag, Maximize2, Download, ArrowLeft } from "lucide-react";
import Lightbox from "../components/common/Lightbox";

export default function CatalogDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const category = pathSegments.length > 1 ? pathSegments[1] : undefined;

    let data;
    // Select the correct data array based on the URL category
    switch (category) {
      case 'rentals': data = rentals; break;
      case 'lands': data = lands; break;
      case 'designs': data = designs; break;
      case 'artifacts': data = artifacts; break;
      case 'materials': data = materials; break;
      case 'building-plans': data = buildingPlans; break;
      default: data = [];
    }
    
    if (data) {
      const foundItem = data.find(i => i.id === id);
      setItem(foundItem);

      // Get similar items from the same category, excluding current item
      const filtered = data.filter(i => i.id !== id).slice(0, 3);
      setSimilarItems(filtered);

      // Reset gallery state and scroll to top when item changes
      setActiveImageIndex(0);
      window.scrollTo(0, 0);
    }
  }, [location.pathname, id]);

  const imageSources = useMemo(() => {
    if (!item) return [];
    if (item.gallery && item.gallery.length > 0) return item.gallery;
    if (item.image) return [item.image];
    return [];
  }, [item]);

  const images = useMemo(() => 
    imageSources.map(url => url.startsWith('http') 
      ? url.replace('/upload/', '/upload/w_1200,h_675,c_fill,q_auto,f_auto/') 
      : `${cloudinaryUrl}/w_1200,h_675,c_fill,q_auto,f_auto/${url}`),
  [imageSources, cloudinaryUrl]);

  const thumbnailImages = useMemo(() => 
    imageSources.map(url => url.startsWith('http')
      ? url.replace('/upload/', '/upload/w_200,h_200,c_fill,q_auto,f_auto/')
      : `${cloudinaryUrl}/w_200,h_200,c_fill,q_auto,f_auto/${url}`),
  [imageSources, cloudinaryUrl]);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlayPaused || showLightbox || images.length <= 1) return;

    const timer = setTimeout(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Transitions every 5 seconds

    return () => clearTimeout(timer);
  }, [activeImageIndex, isAutoPlayPaused, showLightbox, images.length]);

  // Ensure images have absolute URLs for social crawlers and structured data
  const absoluteOgImage = useMemo(() => {
    if (!item) return defaultLogoPath;
    return item.image
      ? item.image.replace('/upload/', '/upload/w_1200,h_630,c_fill,q_auto,f_auto/')
      : defaultLogoPath;
  }, [item]);

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleCloseLightbox = useCallback(() => {
    setShowLightbox(false);
  }, []);

  const lightboxAlts = useMemo(() => 
    images.map((_, idx) => `${item?.title || 'Image'} - Full Image ${idx + 1}`), 
  [images, item]);

  const categoryFromUrl = location.pathname.split('/')[2];

  if (!item) return <div className="py-24 text-center text-foreground transition-colors duration-300">Loading item details...</div>;

  return (
    <main className="bg-background text-foreground min-h-screen pt-24 pb-16 transition-colors duration-300">
      <SEO 
        title={`${item.title} | ${companyName}`}
        description={item.description}
        ogTitle={`${item.title} | ${companyName}`}
        ogDescription={item.description}
        ogImage={absoluteOgImage}
        ogType="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": item.title,
          "description": item.description,
          "image": absoluteOgImage,
          "brand": {
            "@type": "Brand",
            "name": companyName
          },
          "offers": {
            "@type": "Offer",
            "price": item.price ? item.price.replace(/[^0-9.]/g, '') : undefined,
            "priceCurrency": "NGN",
            "availability": "https://schema.org/InStock",
            "url": typeof window !== "undefined" ? window.location.href : "",
            "seller": {
              "@type": "Organization",
              "name": companyName
            }
          }
        }}
      />

      <div className="container">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 -ml-4 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors no-print"
        >
          <ArrowLeft size={18} />
          <span className="capitalize">Back to {categoryFromUrl?.replace('-', ' ')}</span>
        </Button>
        <Breadcrumbs dynamicTitle={item.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Photo Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-video rounded-3xl overflow-hidden bg-secondary border border-border group transition-colors duration-300"
              onMouseEnter={() => setIsAutoPlayPaused(true)}
              onMouseLeave={() => setIsAutoPlayPaused(false)}
              onTouchStart={() => setIsAutoPlayPaused(true)}
              onTouchEnd={() => setIsAutoPlayPaused(false)}
            >
              <motion.div
                className="flex h-full cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) {
                    nextImage();
                  } else if (info.offset.x > threshold) {
                    prevImage();
                  }
                }}
                animate={{ x: `-${activeImageIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="w-full h-full flex-shrink-0 cursor-pointer relative"
                    onClick={() => setShowLightbox(true)}
                  >
                    <OptimizedImage
                      src={img}
                      alt={`${item.title} - ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={48} className="text-white" />
                      <span className="sr-only">View full image</span>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {thumbnailImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex ? "border-primary scale-95" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                <OptimizedImage src={img} className="w-full h-full object-cover" alt={`${item.title} thumbnail ${idx + 1}`} sizes="96px" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Tag size={14} />
                {item.type || categoryFromUrl.replace('-', ' ')}
              </div>
              <h1 className="text-4xl font-bold mb-2">{item.title}</h1>
              <p className="text-2xl text-primary font-bold">{item.price || item.size}</p>
            </div>

            <div className="space-y-6 flex-grow">
              {item.location && (
                <div className="flex items-center gap-2 text-muted-foreground transition-colors">
                  <MapPin size={18} className="text-primary" />
                  <span>{item.location}</span>
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>

              {item.features && (
                <div className="grid grid-cols-2 gap-4 pt-6">
                  {item.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-foreground transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 no-print transition-colors duration-300">
              <Button 
                variant="primary" 
                className="flex-grow justify-center py-4 text-lg"
                onClick={() => window.print()}
              >
                <Download size={20} className="mr-2" />
                Download PDF Brochure
              </Button>
              <ShareButton title={item.title} text={`Check out this ${item.title} on ${companyName}`} />
            </div>

            {/* Property Inquiry Form */}
            <div className="no-print">
              <PropertyInquiryForm itemTitle={item.title} itemCategory={categoryFromUrl.replace('-', ' ')} />
            </div>
          </div>
        </div>

        {showLightbox && (
          <Lightbox
            images={images}
            imageAlts={lightboxAlts}
            initialIndex={activeImageIndex}
            onClose={handleCloseLightbox}
          />
        )}

        {/* Similar Properties Section */}
        {similarItems.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border no-print transition-colors duration-300">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-primary uppercase tracking-widest mb-2 text-sm font-semibold">Discovery</p>
                <h2 className="text-3xl font-bold">Similar Properties</h2>
              </div>
              <Link to={`/catalog/${categoryFromUrl}`} className="text-primary hover:underline hidden sm:block capitalize">
                View All {categoryFromUrl.replace('-', ' ')}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarItems.map((similar) => (
                <Link key={similar.id} to={`/catalog/${categoryFromUrl}/${similar.id}`} className="group">
                  <article className="card border border-border hover:border-primary/40 transition-all duration-300 p-6 flex flex-col h-full bg-card">
                    <div className="h-48 overflow-hidden rounded-2xl bg-secondary mb-6">
                      <OptimizedImage
                        src={similar.image}
                        alt={similar.alt || similar.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {similar.title}
                    </h3>
                    <p className="text-primary font-bold mb-3 text-lg">
                      {similar.price || similar.size || similar.area}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed transition-colors">
                      {similar.description}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Browse Other Categories Section */}
        <div className="mt-24 pt-16 border-t border-border no-print transition-colors duration-300">
          <div className="mb-12">
            <p className="text-primary uppercase tracking-widest mb-2 text-sm font-semibold">Navigation</p>
            <h2 className="text-3xl font-bold">Explore Other Categories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogCategories
              .filter((cat) => cat.path !== `/catalog/${categoryFromUrl}`)
              .slice(0, 3)
              .map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <div className="h-40 overflow-hidden rounded-2xl bg-secondary mb-5">
                    <OptimizedImage
                      src={cat.image}
                      alt={cat.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 transition-colors">{cat.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}