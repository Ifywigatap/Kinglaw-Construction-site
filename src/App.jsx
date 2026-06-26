import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ScrollToTop from "./layout/ScrollToTop";
import BackToTopButton from "./components/common/BackToTopButton";
import TopLoader from "./components/common/TopLoader";

const PageLoader = () => (
  <div className="flex h-[calc(100vh-80px)] items-center justify-center">
    <motion.div
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <TopLoader />
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default App;