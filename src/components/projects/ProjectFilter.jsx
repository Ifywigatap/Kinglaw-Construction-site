export const categories = [
  "All",
  "Residential",
  "Commercial",
  "Infrastructure",
];

export default function ProjectFilter({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
            activeCategory === category
              ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-lg shadow-amber-500/20 dark:shadow-none"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}