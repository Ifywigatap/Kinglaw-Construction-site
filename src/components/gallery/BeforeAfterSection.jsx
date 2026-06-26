export default function BeforeAfterSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-16 transition-colors">
          Before & After Transformations
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">

          <div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
              alt="Before"
              className="rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 dark:brightness-90 transition-colors duration-300"
            />

            <h3 className="mt-4 text-center font-bold text-xl text-slate-900 dark:text-white transition-colors">
              Before Renovation
            </h3>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="After"
              className="rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 dark:brightness-90 transition-colors duration-300"
            />

            <h3 className="mt-4 text-center font-bold text-xl text-slate-900 dark:text-white transition-colors">
              After Renovation
            </h3>
          </div>

        </div>

      </div>

    </section>
  );
}