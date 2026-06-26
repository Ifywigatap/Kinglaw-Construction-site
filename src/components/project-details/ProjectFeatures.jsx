import {
  CheckCircle,
  Building,
  Hammer,
  ShieldCheck,
} from "lucide-react";

export default function ProjectFeatures() {
  const features = [
    {
      icon: <Building size={32} />,
      title: "Modern Design",
    },
    {
      icon: <Hammer size={32} />,
      title: "Premium Materials",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Quality Assurance",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Delivered Successfully",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 transition-colors">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 shadow-lg rounded-2xl p-8 text-center transition-all duration-300"
            >
              <div className="text-amber-500 flex justify-center mb-4">
                {feature.icon}
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white transition-colors">
                {feature.title}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}