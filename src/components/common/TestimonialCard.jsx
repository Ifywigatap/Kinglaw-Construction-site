import { Star } from "lucide-react";

export default function TestimonialCard({
  name,
  company,
  review,
  rating,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-md p-6 transition-all duration-300">
      <div className="flex gap-1 mb-4 text-amber-500">
        {[...Array(rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            fill="currentColor"
          />
        ))}
      </div>

      <p className="text-slate-600 dark:text-slate-400 italic mb-6 transition-colors">
        "{review}"
      </p>

      <h4 className="font-bold text-slate-900 dark:text-white transition-colors">
        {name}
      </h4>

      <span className="text-slate-500 dark:text-slate-500 text-sm transition-colors">
        {company}
      </span>
    </div>
  );
}