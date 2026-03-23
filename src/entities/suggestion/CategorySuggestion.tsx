import { problemCategoriesStore } from "@entities";
import { SuggestionCategory, SuggestionTag } from "@ui";

interface CategorySuggestionProps {
  value: string;
  visible?: boolean;
}

export const CategorySuggestion: React.FC<
  CategorySuggestionProps
> = ({ value, visible = true }) => {
  const getFilteredCategories = (keyName: string) => {
    const categories = problemCategoriesStore.categories;
    const searchKey = keyName.trim().toLowerCase();

    if (!categories) return [];

    const filteredCategories = Array.from(
      categories.keys(),
    ).filter((key) =>
      key.trim().toLowerCase().includes(searchKey),
    );

    return filteredCategories;
  };

  return (
    visible &&
    value &&
    getFilteredCategories(value).length > 0 && (
      <SuggestionCategory title="Category">
        {getFilteredCategories(value).map((cat) => {
          return <SuggestionTag key={cat} tagText={cat} />;
        })}
      </SuggestionCategory>
    )
  );
};
