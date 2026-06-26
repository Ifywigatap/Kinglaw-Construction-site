import Button from "../common/Button";
import { ExternalLink } from "lucide-react";
import { companyAddress } from "../../config/constants";

export default function OfficeLocations() {
  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyAddress)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-16 transition-colors">
          Our Office Location
        </h2>

        <div className="rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 transition-colors duration-300">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.14571991829!2d5.548074900593466!3d6.353347910246235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d3a516084f93%3A0x8e8334f5951800!2sBenin%20City!5e0!3m2!1sen!2sng!4v1718580000000!5m2!1sen!2sng"
            className="w-full h-125 border-0 grayscale contrast-125 dark:invert-[.9] dark:hue-rotate-180 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
          />

        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="primary" 
            onClick={handleGetDirections}
            className="group"
          >
            Get Directions
            <ExternalLink size={18} className="transition-transform group-hover:scale-110" />
          </Button>
        </div>

      </div>

    </section>
  );
}