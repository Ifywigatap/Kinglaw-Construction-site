export default function CompanyOverview() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Company"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">
              Who We Are
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors">
              We specialize in residential,
              commercial, and infrastructure
              construction projects throughout
              Nigeria.
            </p>

            <p className="text-slate-600 dark:text-slate-400 transition-colors">
              Our commitment to quality,
              innovation, and client satisfaction
              has made us a trusted construction
              partner.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}