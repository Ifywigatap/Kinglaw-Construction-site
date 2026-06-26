import Button from "../common/Button";
import { Link } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-primary font-semibold mb-4">
              ABOUT US
            </p>

            <h2 className="text-5xl font-bold text-foreground mb-6 transition-colors">
              Building With Passion &
              Integrity
            </h2>

            <p className="text-muted-foreground mb-8 transition-colors">
              We are committed to delivering
              innovative construction solutions
              that exceed client expectations.
            </p>

            <Button as={Link} to="/about">
              Learn More
            </Button>
          </div>

          <div className="rounded-2xl shadow-lg overflow-hidden">
            <OptimizedImage
              src="https://res.cloudinary.com/dufcon4jl/image/upload/v1782339230/kinglaw/services/upstair1.jpg"
              alt="Modern residential building by Kinglaw Paradise Builders"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}