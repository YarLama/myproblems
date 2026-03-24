import {
  problemStore,
  ProblemSuggestion,
} from "@entities";
import { SuggestionGroup } from "@ui";

interface SearchSuggestionsProps {
  value: string;
  onTitleTagClick?: (value: string) => void;
  onDifficultyTagClick?: (value: string) => void;
  onCategoryTagClick?: (value: string) => void;
}

export const SearchSuggestions: React.FC<
  SearchSuggestionsProps
> = ({
  value,
  onTitleTagClick,
  onCategoryTagClick,
  onDifficultyTagClick,
}) => {

    const filteredCategory = problemStore.getFilteredCategories(value);
    const filteredDifficulty = problemStore.getFilteredDifficulty(value);

    if (value === "") return null;

    return (
      <SuggestionGroup>
        <ProblemSuggestion 
          title="Title"
          tags={value}
          onTagClick={onTitleTagClick}
        />
        <ProblemSuggestion
          title="Difficulty"
          tags={filteredDifficulty}
          onTagClick={onDifficultyTagClick}
        />
        <ProblemSuggestion
          title="Categories"
          tags={filteredCategory}
          onTagClick={onCategoryTagClick}
        />
      </SuggestionGroup>
    );
  };
