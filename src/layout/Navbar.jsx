import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useTheme } from "./ThemeContext";
import Button from "../components/common/Button";
import { catalogCategories, rentals, lands, designs, artifacts, materials, buildingPlans } from "../data/catalog";
import OptimizedImage from "../components/common/OptimizedImage";
import { socialMedia } from "../config/socialMedia";
import { defaultPhoneNumber, defaultEmail, companyName, defaultLogoPath } from "../config/constants";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Company",
    path: "/about",
    isMega: true,
    dropdown: [
      { name: "About Us", path: "/about", description: "Our mission, vision, and values", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339203/kinglaw/services/property4.jpg" },
      { name: "Our Projects", path: "/projects", description: "Portfolio of completed works", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339206/kinglaw/services/rent2.jpg" },
      { name: "Testimonials", path: "/testimonials", description: "What our clients are saying", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339201/kinglaw/services/property2.jpg" },
      { name: "Image Gallery", path: "/gallery", description: "Visuals of our craftsmanship", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782321359/kinglaw/services/designn.jpg" },
      { name: "Contact Us", path: "/contact", description: "How to get in touch with our team", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782321352/kinglaw/services/design1.jpg" },
    ]
  },
  {
    name: "Services",
    path: "/services",
    isMega: true,
    dropdown: [
      { name: "All Services", path: "/services", description: "Comprehensive construction and real estate overview", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782321349/kinglaw/services/desiggn.jpg" },
      // Placeholder for more specific service categories if they exist
      // For now, these link to the general services page to avoid 404s.
      { name: "Residential Development", path: "/services", description: "Custom homes and residential estates", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782321356/kinglaw/services/design4.jpg" },
      { name: "Commercial Construction", path: "/services", description: "Office complexes and retail centers", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782321363/kinglaw/services/DrawingP2.jpg" },
      { name: "Architectural Design", path: "/services", description: "Modern blueprints and interior planning", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782321364/kinglaw/services/DrawingP3.jpg" },
      { name: "Property Management", path: "/services", description: "Expert facility and asset handling", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339149/kinglaw/services/land2.jpg" },
    ]
  },
  { name: "Catalog", path: "/catalog", isMega: true },
  { name: "Admin", path: "/admin" },
];

const TopBar = () => (
  <div className="hidden lg:block bg-secondary text-muted-foreground transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 flex items-center justify-between text-sm">
      <div className="flex items-center gap-6">
        <a href={`tel:${defaultPhoneNumber}`} className="flex items-center gap-2 hover:text-primary transition-colors">
          <Phone size={14} />
          <span>{defaultPhoneNumber}</span>
        </a>
        <a href={`mailto:${defaultEmail}`} className="flex items-center gap-2 hover:text-primary transition-colors">
          <Mail size={14} />
          <span>{defaultEmail}</span>
        </a>
      </div>
      <div className="flex items-center gap-4">
        <span>Follow Us:</span>
        <div className="flex items-center gap-4 text-foreground">
          <a href="https://www.facebook.com/share/1Azkcv81sm/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaFacebook size={16} /></a>
          <a href="https://x.com/KinglawLtd?s=09" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaTwitter size={16} /></a>
          <a href="https://www.tiktok.com/@kinglaw.paradise.b" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaTiktok size={16} /></a>
          <a href="https://wa.me/2348092382323" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaWhatsapp size={16} /></a>
        </div>
      </div>
    </div>
  </div>
);

const Logo = () => (
  <Link to="/" className="flex items-center">
    <img src={defaultLogoPath} alt={`${companyName} Logo`} className="h-12 w-auto" />
  </Link>
);

const MegaMenuContent = ({ link, featuredDeal }) => {
  const dropdownItems = useMemo(() => {
    if (link.name === "Catalog") {
      return catalogCategories.map(cat => ({ name: cat.title, path: cat.path, description: cat.description, image: cat.image }));
    }
    return link.dropdown || [];
  }, [link]);

  if (link.name === "Catalog") {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {dropdownItems.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={({ isActive }) =>
                            `group/item flex items-center gap-4 p-3 rounded-2xl transition ${
                              isActive ? "bg-primary/10" : "hover:bg-secondary/50"
                            }`
                          }
                        >
                          {sub.image && (
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-border group-hover/item:border-primary/50 transition-colors bg-secondary">
                              <OptimizedImage
                                src={sub.image}
                                alt={sub.name}
                                className="w-full h-full object-cover"
                                sizes="48px"
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <p className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">
                              {sub.name}
                            </p>
                            {sub.description && (
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {sub.description}
                              </p>
                            )}
                          </div>
                        </NavLink>
            ))}
          </div>
          <div className="col-span-1">
            <div className="bg-secondary/50 rounded-2xl p-4 h-full flex flex-col">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Featured Deal</p>
              {featuredDeal ? (
                <>
                  <div className="h-32 rounded-xl overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                    <OptimizedImage
                      src={featuredDeal.image}
                      alt={featuredDeal.title}
                      className="w-full h-full object-cover"
                      sizes="300px"
                    />
                  </div>
                  <h4 className="font-bold text-foreground leading-tight">{featuredDeal.title}</h4>
                  <p className="text-sm text-primary font-semibold mt-1 mb-2">{featuredDeal.price || featuredDeal.size}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 flex-grow">{featuredDeal.description}</p>
                  <Button as={Link} to={`/catalog/${featuredDeal.catPath}/${featuredDeal.id}`} size="sm" className="w-full mt-4">
                    View Details
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>No featured deals available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {dropdownItems.map((sub) => (
        <NavLink
          key={sub.path}
          to={sub.path}
          className={({ isActive }) =>
            `group/item flex items-center gap-4 p-3 rounded-2xl transition ${isActive ? "bg-primary/10" : "hover:bg-secondary/50"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {sub.image && (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-border group-hover/item:border-primary/50 transition-colors bg-secondary">
                  <OptimizedImage
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-full object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <div>
                <p className={`text-sm font-semibold transition ${isActive ? "text-primary" : "text-foreground group-hover/item:text-primary"
                  }`}>
                  {sub.name}
                </p>
                {sub.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {sub.description}
                  </p>
                )}
              </div>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleCloseSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allCatalogItems = useMemo(() => {
    const allItems = [
      ...rentals.map(i => ({ ...i, catPath: 'rentals' })),
      ...lands.map(i => ({ ...i, catPath: 'lands' })),
      ...designs.map(i => ({ ...i, catPath: 'designs' })),
      ...artifacts.map(i => ({ ...i, catPath: 'artifacts' })),
      ...materials.map(i => ({ ...i, catPath: 'materials' })),
      ...buildingPlans.map(i => ({ ...i, catPath: 'building-plans' })),
    ];
    return allItems;
  }, []);

  const featuredDeal = useMemo(() => {
    if (allCatalogItems.length === 0) return null;
    return allCatalogItems[Math.floor(Math.random() * allCatalogItems.length)];
  }, [allCatalogItems]);

  const getDropdownItems = (link) => {
    if (link.name === "Catalog") {
      return catalogCategories.map(cat => ({ name: cat.title, path: cat.path, description: cat.description, image: cat.image }));
    }
    return link.dropdown || [];
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 transition py-2 ${
                        isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                      }`
                    }
                  >
                    {link.name}
                    {(link.dropdown || link.isMega) && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                  </NavLink>

                  {(link.dropdown || link.isMega) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50 ${link.isMega ? 'left-1/2 -translate-x-1/2 w-[720px]' : 'left-0 w-56'}`}
                    >
                      <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden p-4">
                        <MegaMenuContent link={link} featuredDeal={featuredDeal} />
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                aria-label="Open search (Ctrl+K)"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Button as={Link} to="/request-quote" variant="primary">
                Request A Quote
              </Button>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="text-foreground z-50"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}                  className="absolute top-0 left-0 right-0 bg-background shadow-2xl pt-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="pb-6 mb-6 border-b border-border" onClick={() => setIsOpen(false)}>
                      <Logo />
                    </div>
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <div key={link.path}>
                          {(link.dropdown || link.isMega) ? (
                            <div className="space-y-2">
                              <button
                                onClick={() => setMobileDropdown(mobileDropdown === link.name ? null : link.name)}                                className="flex items-center justify-between w-full text-foreground hover:text-primary font-medium text-lg"
                              >
                                {link.name}
                                <ChevronDown size={18} className={`transition-transform duration-300 ${mobileDropdown === link.name ? 'rotate-180' : ''}`} />
                              </button>
                              <AnimatePresence>
                                {mobileDropdown === link.name && (
                                  <motion.div
                                    variants={menuVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="pl-4 flex flex-col gap-2 border-l-2 border-border ml-1 overflow-hidden"
                                  >
                                    {getDropdownItems(link).map((sub) => (
                                      <NavLink
                                        key={sub.path}
                                        to={sub.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) => `block p-2 rounded-md transition ${isActive ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground"}`}
                                      >
                                        {sub.name}
                                      </NavLink>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <NavLink
                              to={link.path}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive }) => `block transition text-lg ${isActive ? "text-primary font-bold" : "text-foreground hover:text-primary"}`}
                            >
                              {link.name}
                            </NavLink>
                          )}
                        </div>
                      ))}
                      <div className="mt-6 pt-6 border-t border-border">
                        <Button as={Link} to="/request-quote" variant="primary" className="w-full" onClick={() => setIsOpen(false)}>
                          Request A Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={handleCloseSearch} allItems={allCatalogItems} />
    </>
  );
}

const SearchModal = ({ isOpen, onClose, allItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    const lowerCaseTerm = searchTerm.toLowerCase();
    return allItems.filter(item =>
      (item.title && item.title.toLowerCase().includes(lowerCaseTerm)) ||
      (item.description && item.description.toLowerCase().includes(lowerCaseTerm)) ||
      (item.location && item.location.toLowerCase().includes(lowerCaseTerm)) ||
      (item.type && item.type.toLowerCase().includes(lowerCaseTerm))
    ).slice(0, 10); // Limit results to top 10
  }, [searchTerm, allItems]);

  const handleResultClick = (item) => {
    navigate(`/catalog/${item.catPath}/${item.id}`);
    onClose();
  };

  // Effect to handle keyboard shortcuts (e.g., Escape key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center p-4 pt-[10vh] lg:pt-[20vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl h-fit rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center">
              <Search size={22} className="text-slate-400 mr-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for properties, materials, plans..."
                className="w-full bg-transparent text-lg placeholder:text-slate-400 focus:outline-none text-slate-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ml-4">
                <X size={20} />
              </button>
            </div>
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {searchTerm.length > 1 && searchResults.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  <p>No results found for "{searchTerm}"</p>
                </div>
              )}
              {searchResults.length > 0 && (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {searchResults.map(item => (
                    <li key={`${item.catPath}-${item.id}`}>
                      <button
                        onClick={() => handleResultClick(item)}
                        className="w-full text-left flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image ? item.image.replace('/upload/', '/upload/w_100,h_100,c_fill,q_auto,f_auto/') : `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_100,h_100,c_fill,q_auto,f_auto/v1718580000/placeholder`}
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white">{item.title}</p>
                          <p className="text-sm text-amber-500">{item.price || item.size}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{item.catPath.replace('-', ' ')}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};