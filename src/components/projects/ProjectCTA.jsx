import Button from "../common/Button";

export default function ProjectCTA() {
  return (
    <section className="bg-amber-500 py-24">

      <div className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-5xl font-bold text-white mb-6">
          Ready To Build Your Dream Project?
        </h2>

        <p className="text-white/90 mb-8">
          Partner with a trusted construction
          company dedicated to quality and
          excellence.
        </p>

        <Button variant="secondary">
          Request Consultation
        </Button>

      </div>

    </section>
  );
}