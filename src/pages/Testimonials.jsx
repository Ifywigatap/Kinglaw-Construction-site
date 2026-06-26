import SEO from "../components/common/SEO";
import { companyName, defaultWebsiteUrl } from "../config/constants";
import { testimonials } from "../data/testimonials";
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card border border-border rounded-3xl p-8 flex flex-col h-full shadow-lg"
  >
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
  </motion.div>
);

export default function TestimonialsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": `Client Testimonials | ${companyName}`,
    "url": typeof window !== "undefined" ? window.location.href : "",
    "mainEntity": testimonials.map(testimonial => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating || 5,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.quote,
      "itemReviewed": {
        "@type": "Organization",
        "name": companyName,
        "url": defaultWebsiteUrl
      }
    }))
  };

  return (
    <main>
      <SEO
        title={`Testimonials | ${companyName}`}
        description={`Read what our clients have to say about their experience with ${companyName}. Real stories from satisfied customers across Nigeria.`}
        keywords={`client testimonials, customer reviews, construction company reviews, ${companyName}, Nigeria`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative bg-secondary py-24 text-secondary-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] mb-4">Client Feedback</p>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Stories From Our Valued Clients
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              We are proud of the relationships we build and the successful projects we deliver. Here’s what our clients have to say about their experience with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}