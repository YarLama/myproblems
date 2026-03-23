interface SuggestionTagProps {
  tagText: string;
  onClick?: () => void;
  className?: string;
}

export const SuggestionTag = ({ tagText, onClick, className = '' }: SuggestionTagProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-2 py-1 text-sm rounded-md 
        bg-slate-100 hover:bg-slate-200 
        text-slate-700 transition-colors
        focus-visible:outline-2 focus-visible:outline-blue-500
        ${className}
      `}
    >
      {tagText}
    </button>
  );
};
