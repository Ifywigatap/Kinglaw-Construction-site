import Button from "../common/Button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-primary py-24">

      <div className="max-w-5xl mx-auto px-4 text-center">

        <h2 className="text-5xl font-bold text-primary-foreground mb-6">
          Ready To Start Your Project?
        </h2>

        <p className="text-primary-foreground/90 text-lg mb-8">
          Let's discuss your next residential,
          commercial, or infrastructure project.
        </p>

        <Button
          variant="secondary"
          as={Link}
          to="/request-quote"
        >
          Get Free Consultation
        </Button>

      </div>

    </section>
  );
}