import Button from "../common/Button";

export default function GalleryCTA() {
  return (
    <section className="bg-amber-500 py-24">

      <div className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-5xl font-bold text-white mb-6">
          Ready To Start Your Project?
        </h2>

        <p className="text-white/90 mb-8">
          Let us bring your vision to life with
          quality construction and expert execution.
        </p>

        <Button variant="secondary">
          Contact Our Team
        </Button>

      </div>

    </section>
  );
}