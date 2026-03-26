interface SuggestionTagProps {
  tagText: string;
  onClick?: () => void;
  className?: string;
  color?: "default" | "indigo" | "emerald" | "amber";
}

const bgColor = {
  default:
    "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200",
  indigo:
    "bg-indigo-100 hover:bg-indigo-200 text-indigo-600 border-indigo-200",
  emerald:
    "bg-emerald-100 hover:bg-emerald-200 text-emerald-600 border-emerald-200",
  amber:
    "bg-amber-100 hover:bg-amber-200 text-amber-600 border-amber-200",
};

export const SuggestionTag = ({
  tagText,
  onClick,
  className = "",
  color = "default",
}: SuggestionTagProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-2 py-1 text-sm rounded-md 
        transition-colors
        focus-visible:outline-2 focus-visible:outline-blue-500
        border
        ${bgColor[color]}
        ${className}
      `}
    >
      {tagText}
    </button>
  );
};
