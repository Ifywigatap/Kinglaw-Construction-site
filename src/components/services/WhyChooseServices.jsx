import { ShieldCheck, Users, Clock, Award } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function WhyChooseServices() {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Uncompromising Quality",
      description: "Adhering to the highest standards in every project, ensuring durability and excellence.",
    },
    {
      icon: <Users size={40} />,
      title: "Experienced Professionals",
      description: "Our team comprises seasoned experts dedicated to delivering superior results.",
    },
    {
      icon: <Clock size={40} />,
      title: "Timely Project Delivery",
      description: "Efficient project management guarantees your project is completed on schedule.",
    },
    {
      icon: <Award size={40} />,
      title: "Client-Centric Approach",
      description: "Your satisfaction is our priority, with tailored solutions and transparent communication.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SectionHeading
          subtitle="Our Advantages"
          title="Why Partner With Us"
          description="Experience the difference of working with a team committed to your success."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm transition-colors duration-300">
              <div className="text-amber-500 flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-2 transition-colors">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 transition-colors">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}