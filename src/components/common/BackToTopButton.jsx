import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Adjust scroll threshold as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      } hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 z-50`}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}