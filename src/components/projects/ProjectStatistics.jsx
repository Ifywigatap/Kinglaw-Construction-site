import CountUp from "react-countup";

export default function ProjectStatistics() {
  const stats = [
    {
      value: 150,
      label: "Completed Projects",
    },
    {
      value: 120,
      label: "Happy Clients",
    },
    {
      value: 15,
      label: "Years Experience",
    },
    {
      value: 98,
      label: "Success Rate",
      suffix: "%",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-24 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center"
            >
              <h2 className="text-5xl font-bold text-amber-500 dark:text-amber-400 transition-colors">
                <CountUp
                  end={item.value}
                  duration={3}
                />
                {item.suffix || "+"}
              </h2>

              <p className="mt-3 text-slate-600 dark:text-slate-400 transition-colors">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}