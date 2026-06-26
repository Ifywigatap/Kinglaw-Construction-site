import SectionHeading from "../common/SectionHeading";
import FAQItem from "../common/FAQItem";
import { faqs } from "../../data/faqs"; // Assuming you have a faqs data file

export default function ServiceFAQ() {
  // Filter FAQs specific to services if needed, or use all
  const serviceFaqs = faqs.filter(faq => faq.category === "services" || faq.category === "general");

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading
          subtitle="Questions & Answers"
          title="Service FAQs"
          description="Find answers to common questions about our construction and real estate services."
        />

        <div className="space-y-4">
          {serviceFaqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}