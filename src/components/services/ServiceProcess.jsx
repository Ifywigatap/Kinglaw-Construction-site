import { motion } from "framer-motion";
import { Lightbulb, PencilRuler, Hammer, Key } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function ServiceProcess() {
  const processSteps = [
    {
      icon: <Lightbulb size={28} />,
      title: "Concept & Planning",
      description: "Collaborative ideation and meticulous planning to define project scope and objectives.",
    },
    {
      icon: <PencilRuler size={28} />,
      title: "Design & Development",
      description: "Crafting innovative architectural designs and detailed blueprints for optimal functionality.",
    },
    {
      icon: <Hammer size={28} />,
      title: "Construction & Execution",
      description: "Expert construction management and skilled craftsmanship bring designs to life.",
    },
    {
      icon: <Key size={28} />,
      title: "Completion & Handover",
      description: "Delivering high-quality projects on time, followed by thorough inspection and client handover.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          subtitle="Our Process"
          title="How We Work"
          description="A streamlined approach ensuring transparency, efficiency, and exceptional results from start to finish."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative mb-6 flex justify-center">
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-lg z-10">
                  0{index + 1}
                </div>
                {/* Custom Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-2 transition-colors">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 transition-colors">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}