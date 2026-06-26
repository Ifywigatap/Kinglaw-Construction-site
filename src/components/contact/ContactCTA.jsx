import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function ContactCTA() {
  return (
    <section className="bg-amber-500 dark:bg-amber-600 py-24 transition-colors duration-300">

      <div className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-5xl font-bold text-white dark:text-slate-950 mb-6 transition-colors">
          Ready To Start Your Project?
        </h2>

        <p className="text-white/90 dark:text-slate-900 mb-8 transition-colors">
          Contact us today for consultations,
          quotations, and project discussions.
        </p>

        <Button as={Link} to="/request-quote" variant="secondary">
          Request A Quote
        </Button>

      </div>

    </section>
  );
}