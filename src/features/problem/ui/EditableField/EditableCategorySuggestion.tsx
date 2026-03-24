import { problemStore, ProblemSuggestion } from "@entities";
import { SuggestionGroup } from "@ui";

interface EditableCategorySuggestionsProps {
  value: string;
  onCategoryTagClick?: (value: string) => void;
}

export const EditableCategorySuggestions: React.FC<
  EditableCategorySuggestionsProps
> = ({ value, onCategoryTagClick }) => {
  const filteredCategory =
    problemStore.getFilteredCategories(value);

  if (filteredCategory.length === 0 || value === "")
    return null;

  return (
    <SuggestionGroup>
      <ProblemSuggestion
        title="Categories"
        tags={filteredCategory}
        onTagClick={onCategoryTagClick}
      />
    </SuggestionGroup>
  );
};
