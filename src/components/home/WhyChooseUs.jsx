import {
  ShieldCheck,
  Users,
  Clock,
  Award,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Quality Work",
    },
    {
      icon: <Users size={40} />,
      title: "Expert Team",
    },
    {
      icon: <Clock size={40} />,
      title: "On-Time Delivery",
    },
    {
      icon: <Award size={40} />,
      title: "Trusted Brand",
    },
  ];

  return (
    <section className="bg-background text-foreground py-24 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-center text-5xl font-bold mb-16 transition-colors">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="text-primary flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-xl transition-colors">
                {item.title}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}