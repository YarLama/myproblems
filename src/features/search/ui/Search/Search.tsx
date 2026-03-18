import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchSuggestions } from "../SearchSuggestions/SearchSuggestions";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isSuggestionsVisible, setIsSuggestionsVisible] =
    useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    console.log(value)
    setIsSuggestionsVisible(true);
  };

  const handleSuggestionSelect = (value: string) => {
    //Do something at click on suggestion
    console.log(value);
    setIsSuggestionsVisible(false);
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
        setIsSuggestionsVisible(false);
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
        visible={isSuggestionsVisible}
        value={inputValue}
        onSelect={handleSuggestionSelect}
      />
    </div>
  );
};
