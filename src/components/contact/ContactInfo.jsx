import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { companyAddress, defaultEmail, defaultPhoneNumber } from "../../config/constants";

export default function ContactInfo() {
  const contactInfo = [
    {
      icon: <Phone size={28} />,
      title: "Call Us",
      value: defaultPhoneNumber,
    },
    {
      icon: <Mail size={28} />,
      title: "Email Us",
      value: defaultEmail,
    },
    {
      icon: <MapPin size={28} />,
      title: "Visit Us",
      value: companyAddress,
    },
    {
      icon: <Clock size={28} />,
      title: "Working Hours",
      value: "Mon - Sat | 8:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm font-semibold mb-4">
            CONTACT INFORMATION
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch With Us
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            We're ready to discuss your construction, engineering,
            architectural, and property development projects.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                rounded-3xl
                p-8
                text-center
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-400
                    to-orange-500
                    text-white
                    shadow-lg
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  "
                >
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>

              {/* Content */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}