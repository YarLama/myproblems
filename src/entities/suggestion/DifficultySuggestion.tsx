import { DifficultyValues } from "@constants/difficulty";
import { problemCategoriesStore } from "@entities";
import { SuggestionCategory, SuggestionTag } from "@ui";

interface DifficultySuggestionProps {
  value: string;
  visible?: boolean;
}

export const DifficultySuggestion: React.FC<
  DifficultySuggestionProps
> = ({ value, visible = true }) => {
  const getFilteredDifficulty = (keyName: string) => {
    const difficulty = DifficultyValues;
    const searchKey = keyName.trim().toLowerCase();

    if (!difficulty) return [];

    const filteredDifficulty = difficulty.filter((diff) =>
      diff.includes(searchKey),
    );

    return filteredDifficulty;
  };

  return (
    visible &&
    value &&
    getFilteredDifficulty(value).length > 0 && (
      <SuggestionCategory title="Difficulty">
        {getFilteredDifficulty(value).map((diff) => {
          return (
            <SuggestionTag key={diff} tagText={diff} />
          );
        })}
      </SuggestionCategory>
    )
  );
};
