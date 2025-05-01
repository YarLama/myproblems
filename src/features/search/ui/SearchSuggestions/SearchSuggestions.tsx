interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  visible: boolean;
}

export const SearchSuggestions: React.FC<
  SearchSuggestionsProps
> = ({ suggestions, onSelect, visible = false }) => {
  if (!visible || !suggestions.length) return null;

  return (
    <div
      className="-mt-2 rounded-b-lg shadow-lg bg-gray-300 z-10 absolute w-full"
      role="listbox"
      aria-label="Search suggestions"
    >
      {suggestions.map((item) => (
        <div
          className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
          onClick={() => onSelect(item)}
          key={item}
          role="option"
        >
          {item}
        </div>
      ))}
    </div>
  );
};
