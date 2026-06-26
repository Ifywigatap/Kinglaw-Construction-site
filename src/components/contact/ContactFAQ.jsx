import FAQItem from "../common/FAQItem";
import { faqs } from "../../data/faqs";

export default function ContactFAQ() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-4xl mx-auto px-4">

        <h2 className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-16 transition-colors">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          {faqs.map((faq) => (
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