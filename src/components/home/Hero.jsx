import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Phone } from "lucide-react";
import Button from "../common/Button";

export default function Hero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{          backgroundImage: "url('https://res.cloudinary.com/dufcon4jl/image/upload/w_1920,c_fill,q_auto,f_auto/v1782339143/kinglaw/services/IMG-20250813-WA0004.jpg')",
          y: backgroundY,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/80 transition-colors duration-300" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent transition-colors duration-300" />

      {/* Decorative Blur */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24"
      >

    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="text-center lg:text-left">

          {/* Heading */}
      <motion.h1 variants={itemVariants} className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 transition-colors">
        FIND LAND, RENT HOMES, BUILD MODERN DESIGNS — <span className="text-primary">ALL IN ONE PLACE</span>
          </motion.h1>

          {/* Description */}
      <motion.p variants={itemVariants} className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto lg:mx-0 mb-8 leading-relaxed transition-colors">
        BUY PLOTS, RENT HOUSES, HIRE TRUSTED AGENT, AND ORDER QUALITY BUILDING MATERIALS. FROM DRAWINGS TO CONSTRUCTION, WE'VE GOT YOU.
          </motion.p>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mt-8 max-w-lg mx-auto lg:mx-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-lg">
          <Search className="text-slate-400 mx-3 hidden sm:block" />
          <input
            type="text"
            placeholder="Search properties, lands, rentals..."
            className="w-full bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-center sm:text-left py-2 sm:py-0"
          />
          <Button as={Link} to="/catalog" className="w-full sm:w-auto">Search</Button>
        </div>
      </motion.div>

          {/* CTA Buttons */}
      <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4">
        <Button as={Link} to="/catalog" className="group">
          Browse Properties
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>

        <Button as={Link} to="/services" variant="outline">
          Our Services
            </Button>
          </motion.div>
        </div>
        
        {/* Material Cards */}
        <div className="hidden lg:flex flex-col gap-4">
          {[
            { title: "Cement", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339178/kinglaw/services/material-cement.jpg" },
            { title: "BRC Rods (Wire)", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339177/kinglaw/services/material-BRC%20Rods%28wire%29.jpg" },
            { title: "Hollow Blocks", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339175/kinglaw/services/material-blocksm.jpg" },
            { title: "Granite", image: "https://res.cloudinary.com/dufcon4jl/image/upload/v1782339181/kinglaw/services/material-granite.jpg" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="bg-card/80 dark:bg-white/10 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 w-72"
            >
              <img src={item.image.replace('/upload/', '/upload/w_100,h_100,c_fill,q_auto,f_auto/')} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <h4 className="text-foreground font-semibold">{item.title}</h4>
                <p className="text-muted-foreground text-xs">Quality materials • Fast delivery</p>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
    </motion.div>
  </section>
  );
}