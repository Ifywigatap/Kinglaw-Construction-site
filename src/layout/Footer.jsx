import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SocialLinks from "../components/common/SocialLinks";
import NewsletterForm from "../components/common/NewsletterForm";
import { companyName, defaultEmail, defaultPhoneNumber, companyAddress, defaultLogoPath } from "../config/constants";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Our Projects", path: "/projects" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact Us", path: "/contact" },
];

const serviceLinks = [
  { name: "Residential Development", path: "/services/1" },
  { name: "Commercial Construction", path: "/services/2" },
  { name: "Architectural Design", path: "/services/3" },
  { name: "Property Management", path: "/services/4" },
];

export default function Footer() {
  return (
    <footer className="bg-card dark:bg-background text-foreground border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Company */}
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center mb-4">
              <img src={defaultLogoPath} alt={`${companyName} Logo`} className="h-12 w-auto" />
            </Link>

            <p className="text-muted-foreground">
              Building dreams into reality through quality
              construction and innovative engineering.
            </p>

            <SocialLinks className="mt-6" />
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-muted-foreground">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">
              Services
            </h4>

            <ul className="space-y-2 text-muted-foreground">
              {serviceLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <div className="space-y-4 text-muted-foreground">

              <div className="flex gap-3">
                <Phone size={18} className="text-primary mt-1" />
                <a href={`tel:${defaultPhoneNumber}`} className="hover:text-primary transition-colors">{defaultPhoneNumber}</a>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="text-primary mt-1" />
                <a href={`mailto:${defaultEmail}`} className="hover:text-primary transition-colors">{defaultEmail}</a>
              </div>

              <div className="flex gap-3">
                <FaWhatsapp size={18} className="text-primary mt-1" />
                <a href={`https://wa.me/2348092382323`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              </div>

              <div className="flex gap-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span>{companyAddress}</span>
              </div>

            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-3">
            <NewsletterForm />
          </div>

        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}