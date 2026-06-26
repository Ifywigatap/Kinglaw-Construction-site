import OptimizedImage from "../common/OptimizedImage";

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
            <OptimizedImage
              src="https://res.cloudinary.com/dufcon4jl/image/upload/v1782339228/kinglaw/services/sitework4.jpg"
              alt="An impressive modern commercial building representing our construction expertise"
              className="w-full h-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
              Your Vision, Our Expertise
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
              At Kinglaw Paradise Builders, we transform ideas into reality.
              Our integrated approach ensures seamless execution across all project phases,
              delivering excellence and value.
            </p>

            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
              We pride ourselves on meticulous planning, innovative solutions,
              and a commitment to quality that stands the test of time.
              Partner with us for a construction experience defined by trust and superior results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}