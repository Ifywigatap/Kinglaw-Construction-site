import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQItem({
  question,
  answer,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold">
          {question}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 transition-colors">
          {answer}
        </div>
      )}
    </div>
  );
}