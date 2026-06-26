import { useState, useEffect } from "react";

export default function useScrollPosition(throttleMs = 100) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let last = 0;
    function handleScroll() {
      const now = Date.now();
      if (now - last < throttleMs) return;
      last = now;
      setPos({ x: window.scrollX, y: window.scrollY });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttleMs]);

  return pos;
}
