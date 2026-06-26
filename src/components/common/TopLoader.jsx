import { useNavigation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A top-loading bar that appears during page navigations.
 * It uses react-router's navigation state to automatically show and hide itself.
 */
export default function TopLoader() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="h-full bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.9, transition: { duration: 8, ease: "linear" } }}
            exit={{ scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}