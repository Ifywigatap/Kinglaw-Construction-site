import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMediaQuery from "./useMediaQuery";

export default function useTheme() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useLocalStorage("theme", prefersDark ? "dark" : "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
}