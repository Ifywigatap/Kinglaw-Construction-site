export default function MissionVision() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-transparent dark:border-slate-800 shadow transition-colors duration-300">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
              Our Mission
            </h3>

            <p className="text-slate-600 dark:text-slate-400 transition-colors">
              To provide exceptional construction
              solutions that exceed client
              expectations through quality,
              innovation, and professionalism.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-transparent dark:border-slate-800 shadow transition-colors duration-300">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
              Our Vision
            </h3>

            <p className="text-slate-600 dark:text-slate-400 transition-colors">
              To become one of Nigeria's most
              respected and innovative construction
              companies.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}