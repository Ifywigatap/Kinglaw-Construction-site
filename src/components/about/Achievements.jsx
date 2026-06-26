import { stats } from "../../data/stats";

export default function Achievements() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 border-y border-slate-100 dark:border-slate-800">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.id}
              className="text-center"
            >
              <h2 className="text-5xl font-bold text-amber-500 transition-colors">
                {item.value}
                {item.suffix}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mt-2 transition-colors font-medium">{item.title}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}