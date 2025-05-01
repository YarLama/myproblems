import { useEffect, useRef, useState } from "react";
import { SearchInput } from "./ui/SearchInput/SearchInput";
import { SearchSuggestions } from "./ui/SearchSuggestions/SearchSuggestions";

export const SearchFeature = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(
    [],
  );
  const [isSuggestionsVisible, setIsSuggestionsVisible] =
    useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    //call API mb and suggestions
    const testSug = [
      "test1",
      "test2",
      "test3",
      "test4",
      "test5",
      "test6",
    ];
    setSuggestions(testSug);
    setIsSuggestionsVisible(true);
  };

  const handleSuggestionSelect = (value: string) => {
    //Do something at click on suggestion
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
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
      />
    </div>
  );
};
