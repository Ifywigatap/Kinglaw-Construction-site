import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { defaultPhoneNumber } from "../config/constants";
import Button from "../components/common/Button";
import { services } from "../data/services.js";
import ContactForm from "../components/contact/ContactForm";
import OptimizedImage from "../components/common/OptimizedImage";
import { CheckCircle, Phone, Info } from "lucide-react";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const foundService = services.find(s => s.id === Number(id));
    setService(foundService);
    window.scrollTo(0, 0); // Scroll to top on page load
  }, [id]);

  if (!service) {
    return (
      <div className="py-24 text-center bg-background text-foreground transition-colors duration-300">
        Loading service details...
      </div>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen pt-24 pb-16 transition-colors duration-300">
      <SEO
        title={`${service.title} | Kinglaw Paradise Builders`}
        description={service.description}
        ogTitle={service.title}
      />

      <div className="container">
        <Breadcrumbs dynamicTitle={service.title} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Service Content */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground transition-colors">
              {service.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed transition-colors">
              {service.longDescription || service.description}
            </p>

            {service.details && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground transition-colors">
                  What We Offer
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground transition-colors">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.image && (
              <div className="rounded-3xl overflow-hidden shadow-lg border border-border transition-colors">
                <OptimizedImage
                  src={service.image}
                  alt={service.alt || service.title}
                  className="w-full h-auto object-cover dark:brightness-90"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  loading="eager"
                />
              </div>
            )}
          </div>

          {/* Sidebar / Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-card p-8 rounded-[2rem] border border-border shadow-xl transition-colors duration-300 sticky top-28">
              <h3 className="text-2xl font-bold text-foreground mb-6 transition-colors">
                Inquire About This Service
              </h3>

            <div className="flex flex-col gap-3 mb-8">
              <Button variant="primary" className="w-full">
                <Info size={18} />
                Request Information
              </Button>
              
              <a href={`tel:${defaultPhoneNumber}`} className="block w-full">
                <Button variant="outline" className="w-full">
                  <Phone size={18} />
                  Call for Consultation
                </Button>
              </a>
            </div>

            <div className="pt-8 border-t border-border transition-colors">
              <p className="text-sm font-bold text-foreground mb-4 transition-colors">
                Or send us a message
              </p>
              <ContactForm defaultSubject={`Inquiry about: ${service.title}`} />
            </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Optional: Related Services Section */}
      {/* You could add a section here to display other services */}

    </main>
  );
}