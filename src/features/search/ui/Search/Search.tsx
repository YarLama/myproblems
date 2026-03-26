import { useRef, useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchSuggestions } from "../SearchSuggestions/SearchSuggestions";
import { ProblemDifficulty } from "@types";
import { problemFilterStore } from "@entities";
import { observer } from "mobx-react-lite";

export const Search = observer(() => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const {
    setTitle,
    toogleCategory,
    toogleDifficulty,
    isFilterEmpty,
    filterCount,
  } = problemFilterStore;

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const reset = () => {
    setIsSuggestionVisible(false);
    setInputValue("");
  };

  const handleTitleSuggestionSelect = (title: string) => {
    setTitle(title);
    reset();
  };

  const handleCategorySuggestionSelect = (
    category: string,
  ) => {
    toogleCategory(category);
    reset();
  };
  const handleDifficultySuggestionSelect = (
    difficulty: ProblemDifficulty,
  ) => {
    toogleDifficulty(difficulty);
    reset();
  };

  const handleSearchBlur = (e: React.FocusEvent) => {
    if (
      e.relatedTarget &&
      e.currentTarget.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    reset();
  };
  const handleSearchFocus = () => {
    setIsSuggestionVisible(true);
  };

  return (
    <div
      className="relative w-full max-w-md"
      ref={searchContainerRef}
      onBlur={handleSearchBlur}
    >
      <SearchInput
        value={inputValue}
        onInputChange={handleInputChange}
        placeholder={
          isFilterEmpty
            ? "Test search..."
            : `Apply (${filterCount}) filters. Click for show or continue search`
        }
        onFocus={handleSearchFocus}
      />
      <SearchSuggestions
        value={inputValue}
        visible={isSuggestionVisible}
        onTitleTagClick={handleTitleSuggestionSelect}
        onDifficultyTagClick={
          handleDifficultySuggestionSelect
        }
        onCategoryTagClick={handleCategorySuggestionSelect}
      />
    </div>
  );
});
