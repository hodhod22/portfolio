interface ProjectFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const categoryLabels: Record<string, string> = {
  all: "Alla",
  webapp: "Webbappar",
  mobile: "Mobil",
  api: "API:er",
  fullstack: "Fullstack",
};

export default function ProjectFilter({
  categories,
  selected,
  onSelect,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selected === "all"
            ? "bg-primary-600 text-white shadow-md"
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        Alla
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === category
              ? "bg-primary-600 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {categoryLabels[category] || category}
        </button>
      ))}
    </div>
  );
}
