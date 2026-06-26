import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import Button from "../common/Button";

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-card border border-border rounded-3xl p-8 flex flex-col h-full shadow-lg">
    <div className="flex-grow">
      <div className="flex text-yellow-400 mb-4">
        {[...Array(testimonial.rating || 5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">"{testimonial.title}"</h3>
      <p className="text-muted-foreground leading-relaxed">
        {testimonial.quote}
      </p>
    </div>
    <div className="mt-6 pt-6 border-t border-border flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-secondary overflow-hidden flex-shrink-0">
        {testimonial.image ? (
          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <User size={24} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold text-foreground">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  // Show first 3 testimonials on the home page
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <p className="text-primary uppercase tracking-[0.3em] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our commitment to quality and client satisfaction speaks for itself through their words.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button as={Link} to="/testimonials" variant="outline" size="lg">
            View All Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
}