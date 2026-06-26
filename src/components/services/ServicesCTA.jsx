import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function ServicesCTA() {
  return (
    <section className="bg-amber-500 dark:bg-amber-600 py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-white dark:text-slate-950 mb-6 transition-colors duration-300">
          Ready to Build Your Vision?
        </h2>

        <p className="text-white/90 dark:text-slate-900 text-lg mb-8 transition-colors duration-300">
          Let's discuss your next project and how our expert services can bring it to life.
        </p>

        <Link to="/contact">
          <Button variant="secondary" className="!bg-white dark:!bg-slate-950 !text-slate-900 dark:!text-white hover:!bg-slate-100 dark:hover:!bg-slate-800">
            Get a Free Consultation
          </Button>
        </Link>
      </div>
    </section>
  );
}