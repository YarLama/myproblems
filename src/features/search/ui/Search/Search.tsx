import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchSuggestions } from "../SearchSuggestions/SearchSuggestions";
import { ProblemDifficulty } from "@types";
import { problemFilterStore } from "@entities";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { setTitle, toogleCategory, toogleDifficulty } =
    problemFilterStore;

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleTitleSuggestionSelect = (title: string) => {
    setTitle(title);
    setInputValue("");
  };

  const handleCategorySuggestionSelect = (
    category: string,
  ) => {
    toogleCategory(category);
    setInputValue("");
  };
  const handleDifficultySuggestionSelect = (
    difficulty: ProblemDifficulty,
  ) => {
    toogleDifficulty(difficulty);
    setInputValue("");
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
        onTitleTagClick={handleTitleSuggestionSelect}
        onDifficultyTagClick={handleDifficultySuggestionSelect}
        onCategoryTagClick={handleCategorySuggestionSelect}
      />
    </div>
  );
};
