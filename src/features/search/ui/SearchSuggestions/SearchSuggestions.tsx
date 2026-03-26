import {
  ProblemDifficulty,
  problemFilterStore,
  problemStore,
  ProblemSuggestion,
} from "@entities";
import { SuggestionGroup } from "@ui";
import { ActiveFilterSuggestions } from "./ActiveFilterSuggestion";
import { observer } from "mobx-react-lite";

interface SearchSuggestionsProps {
  value: string;
  visible?: boolean;
  onTitleTagClick?: (value: string) => void;
  onDifficultyTagClick?: (value: ProblemDifficulty) => void;
  onCategoryTagClick?: (value: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> =
  observer(
    ({
      value,
      visible = false,
      onTitleTagClick,
      onCategoryTagClick,
      onDifficultyTagClick,
    }) => {
      const { isFilterEmpty } = problemFilterStore;
      const filteredCategory =
        problemStore.getFilteredCategories(value);
      const filteredDifficulty =
        problemStore.getFilteredDifficulty(value);

      if ((value === "" && isFilterEmpty) || !visible)
        return null;

      return (
        <SuggestionGroup>
          {!isFilterEmpty && <ActiveFilterSuggestions />}
          <ProblemSuggestion
            visible={value !== ""}
            title="Title"
            tags={value}
            onTagClick={onTitleTagClick}
          />
          <ProblemSuggestion
            visible={value !== ""}
            title="Difficulty"
            tags={filteredDifficulty}
            onTagClick={
              onDifficultyTagClick as (v: string) => void
            }
          />
          <ProblemSuggestion
            visible={value !== ""}
            title="Categories"
            tags={filteredCategory}
            onTagClick={onCategoryTagClick}
          />
        </SuggestionGroup>
      );
    },
  );
