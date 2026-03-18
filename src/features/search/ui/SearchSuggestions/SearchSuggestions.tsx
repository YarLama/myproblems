import { problemCategoriesStore } from "@root/src/entities/problem/model/problemCategories.store";

interface SearchSuggestionsProps {
  value: string;
  onSelect: (value: string) => void;
  visible: boolean;
}

export const SearchSuggestions: React.FC<
  SearchSuggestionsProps
> = ({ value, onSelect, visible = false }) => {
  if (!visible || !value) return null;

  console.log(
    problemCategoriesStore.categories.get("hash"),
  );

  const getFilteredCategories = (keyName: string) => {
    const categories = problemCategoriesStore.categories;
    if (!categories) return [];
    const searchKey = keyName.trim().toLowerCase();
    const filteredCategories = Array.from(
      categories.keys(),
    ).filter((key) => {
      return key.trim().toLowerCase().includes(searchKey);
    });

    return filteredCategories;
  };

  return (
    <div
      className="-mt-2 rounded-b-lg shadow-lg bg-gray-300 z-10 absolute w-full"
      role="listbox"
      aria-label="Search suggestions"
    >
      <div>
        {`Title: ${value}`}
        <br />
        {getFilteredCategories(value).length
          ? `Category: ${getFilteredCategories(value).join(" ")}`
          : ""}
      </div>
    </div>
  );
};
