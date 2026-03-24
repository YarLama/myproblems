import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchSuggestions } from "../SearchSuggestions/SearchSuggestions";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSuggestionSelect = (value: string) => {
    console.log(value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current?.contains(
          e.target as Node,
        )
      ) {
        setInputValue("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  return (
    <div
      className="relative w-full max-w-md"
      ref={searchContainerRef}
    >
      <SearchInput
        value={inputValue}
        onInputChange={handleInputChange}
        placeholder="Test search..."
      />
      <SearchSuggestions
        value={inputValue}
        onTitleTagClick={handleSuggestionSelect}
        onDifficultyTagClick={handleSuggestionSelect}
        onCategoryTagClick={handleSuggestionSelect}
      />
    </div>
  );
};
