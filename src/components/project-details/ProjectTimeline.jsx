export default function ProjectTimeline() {
  const timeline = [
    {
      phase: "Planning",
      date: "Jan 2024",
    },
    {
      phase: "Design",
      date: "Mar 2024",
    },
    {
      phase: "Construction",
      date: "Jun 2024",
    },
    {
      phase: "Completion",
      date: "Dec 2024",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-24 transition-colors duration-300">

      <div className="max-w-5xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center transition-colors">
          Project Timeline
        </h2>

        <div className="space-y-8">

          {timeline.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-amber-500 pl-6"
            >
              <h3 className="text-amber-500 font-bold transition-colors">
                {item.phase}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 transition-colors">{item.date}</p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}