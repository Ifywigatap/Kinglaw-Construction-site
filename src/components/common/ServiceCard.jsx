import { Link } from "react-router-dom";
import { ArrowRight, Home, Building, LayoutDashboard, Wrench, Handshake, Lightbulb } from "lucide-react";
import Button from "./Button";

// Map string identifiers to actual icon components
const iconMap = {
  Home,
  Building,
  LayoutDashboard,
  Wrench,
  Handshake,
  Lightbulb,
};

export default function ServiceCard({ title, description, icon, link, galleryLink }) {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-card border border-border rounded-3xl p-8 flex flex-col h-full shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="flex-grow">
        {IconComponent && (
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
            <IconComponent size={32} />
          </div>
        )}
        <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button as={Link} to={link} variant="outline" className="group">
          Learn More
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
        {galleryLink && (
          <Button as={Link} to={galleryLink} variant="ghost">
            View Gallery
          </Button>
        )}
      </div>
    </div>
  );
}