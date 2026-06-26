import Button from "../common/Button";

export default function FeaturedCaseStudy() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Featured Project"
            className="rounded-2xl shadow-lg border border-transparent dark:border-slate-800 transition-colors dark:brightness-90"
          />

          <div>

            <p className="text-amber-500 font-semibold mb-3 transition-colors">
              FEATURED CASE STUDY
            </p>

            <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">
              Luxury Estate Development
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors">
              A modern estate project designed and
              constructed with premium materials,
              contemporary architecture, and
              sustainable engineering principles.
            </p>

            <Button>
              View Case Study
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}