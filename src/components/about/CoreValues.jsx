import {
  ShieldCheck,
  HeartHandshake,
  Award,
  Lightbulb,
} from "lucide-react";

export default function CoreValues() {
  const values = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Integrity",
    },
    {
      icon: <Award size={40} />,
      title: "Quality",
    },
    {
      icon: <Lightbulb size={40} />,
      title: "Innovation",
    },
    {
      icon: <HeartHandshake size={40} />,
      title: "Commitment",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-16 transition-colors">
          Core Values
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {values.map((value, index) => (
            <div
              key={index}
              className="text-center bg-white dark:bg-slate-900 p-8 rounded-2xl border border-transparent dark:border-slate-800 shadow transition-colors duration-300"
            >
              <div className="text-amber-500 flex justify-center mb-4">
                {value.icon}
              </div>

              <h3 className="font-semibold text-xl text-slate-900 dark:text-white transition-colors">
                {value.title}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}