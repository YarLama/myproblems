import {
  ProblemDifficulty,
  problemStore,
  ProblemSuggestion,
} from "@entities";
import { SuggestionGroup } from "@ui";

interface SearchSuggestionsProps {
  value: string;
  onTitleTagClick?: (value: string) => void;
  onDifficultyTagClick?: (value: ProblemDifficulty) => void;
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
    const filteredCategory =
      problemStore.getFilteredCategories(value);
    const filteredDifficulty =
      problemStore.getFilteredDifficulty(value);

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
          onTagClick={
            onDifficultyTagClick as (v: string) => void
          }
        />
        <ProblemSuggestion
          title="Categories"
          tags={filteredCategory}
          onTagClick={onCategoryTagClick}
        />
      </SuggestionGroup>
    );
  };
