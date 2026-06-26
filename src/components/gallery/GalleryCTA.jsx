import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function GalleryCTA() {
  return (
    <section className="bg-primary py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-primary-foreground mb-6">
          Ready To Start Your Project?
        </h2>

        <p className="text-primary-foreground/90 mb-8">
          Let us bring your vision to life with
          quality construction and expert execution.
        </p>

        <Button
          as={Link}
          to="/contact"
          variant="secondary"
        >
          Contact Our Team
        </Button>
      </div>
    </section>
  );
}