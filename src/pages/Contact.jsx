import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Calculator } from "lucide-react";
import SEO from "../components/common/SEO";
import Button from "../components/common/Button";
import SectionHeading from "../components/common/SectionHeading";
import { companyName, defaultEmail, defaultPhoneNumber, companyAddress } from "../config/constants";

function ContactForm() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setResult("");
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Your message has been sent successfully! We will get back to you shortly.");
        setStatus("success");
        event.target.reset();
      } else {
        console.error("Form Submission Error:", data);
        setResult(data.message || "An error occurred. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setResult("An error occurred. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-card-foreground">Full Name</label>
          <input type="text" name="name" id="name" required className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-card-foreground">Email Address</label>
          <input type="email" name="email" id="email" required className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-card-foreground">Subject</label>
        <input type="text" name="subject" id="subject" required className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-card-foreground">Message</label>
        <textarea name="message" id="message" required rows="6" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-y"></textarea>
      </div>
      <div>
        <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
      {result && (
        <p className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {result}
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(companyAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <main>
      <SEO
        title={`Contact Us | ${companyName}`}
        description={`Get in touch with ${companyName}. We're here to answer your questions about our construction services, projects, and material supplies.`}
        keywords={`contact ${companyName}, construction company Nigeria, get a quote, Kinglaw builders contact`}
      />
      <div className="bg-background text-foreground transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
          <SectionHeading
            subtitle="Get in Touch"
            title="Contact Us"
            description="We're here to help and answer any question you might have. We look forward to hearing from you."
          />

          <div className="mt-16 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-card p-8 rounded-3xl border border-border shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                <ContactForm />
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex gap-4 items-start"><Phone size={20} className="text-primary mt-1 flex-shrink-0" /><a href={`tel:${defaultPhoneNumber}`} className="hover:text-primary transition-colors">{defaultPhoneNumber}</a></div>
                  <div className="flex gap-4 items-start"><Mail size={20} className="text-primary mt-1 flex-shrink-0" /><a href={`mailto:${defaultEmail}`} className="hover:text-primary transition-colors">{defaultEmail}</a></div>
                  <div className="flex gap-4 items-start"><MapPin size={20} className="text-primary mt-1 flex-shrink-0" /><span>{companyAddress}</span></div>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}>
                <h3 className="text-xl font-bold mb-4">Need a Project Estimate?</h3>
                <p className="text-muted-foreground mb-5 text-sm">
                  For detailed project pricing and consultation, please use our quote request form.
                </p>
                <Button as={Link} to="/request-quote" variant="primary" className="w-full">
                  <Calculator size={18} className="mr-2" />
                  Request a Quote
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-24"
          >
            <SectionHeading
              subtitle="Our Location"
              title="Find Us On The Map"
              description="Visit our office for a face-to-face consultation. We are located in the heart of Benin City."
            />
            <div className="mt-12 aspect-video w-full rounded-3xl overflow-hidden border border-border shadow-lg">
              <iframe
                src={mapSrc}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${companyName} location`}
              ></iframe>
            </div>
          </motion.div>
          </div>
        </div>
    </main>
  );
}