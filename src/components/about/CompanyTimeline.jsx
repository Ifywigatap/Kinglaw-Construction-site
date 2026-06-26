export default function CompanyTimeline() {
  const timeline = [
    {
      year: "2015",
      event: "Company Founded",
    },
    {
      year: "2018",
      event: "Completed 50+ Projects",
    },
    {
      year: "2022",
      event: "Expanded Nationwide",
    },
    {
      year: "2025",
      event: "Industry Recognition",
    },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">

        <h2 className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-16 transition-colors">
          Our Journey
        </h2>

        <div className="space-y-8">

          {timeline.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-amber-500 pl-6"
            >
              <h3 className="text-amber-500 font-bold transition-colors">
                {item.year}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 transition-colors">{item.event}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}