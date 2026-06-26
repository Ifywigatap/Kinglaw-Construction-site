import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../common/Button";
import { ArrowRight } from "lucide-react";

export default function ServicesCTA() {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-card rounded-3xl p-10 lg:p-16 text-center shadow-2xl border border-border"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team of experts is ready to listen to your ideas and turn them into a concrete plan. Let's discuss how we can bring your vision to life.
          </p>
          <Button as={Link} to="/contact" variant="primary" size="lg">
            Contact Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}