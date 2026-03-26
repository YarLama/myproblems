import {
  ProblemDifficulty,
  problemFilterStore,
} from "@entities";
import { SuggestionCategory, SuggestionTag } from "@ui";
import { observer } from "mobx-react-lite";

export const ActiveFilterSuggestions = observer(() => {
  const {
    filter,
    toogleCategory,
    toogleDifficulty,
    setTitle,
  } = problemFilterStore;
  const titleTag = filter.title;
  const categoryTags = filter.categories;
  const difficultyTags = filter.difficulty;

  const handleTitleTagClick = () => {
    setTitle("");
  };
  const handleCategoryTagClick = (v: string) => {
    toogleCategory(v);
  };
  const handleDifficultyTagClick = (
    v: ProblemDifficulty,
  ) => {
    toogleDifficulty(v);
  };

  return (
    <SuggestionCategory title="Active Filter">
      {titleTag && (
        <SuggestionTag
          tagText={titleTag}
          onClick={handleTitleTagClick}
          color="indigo"
        />
      )}
      {difficultyTags.map((diff) => {
        return (
          <SuggestionTag
            key={`diff-${diff}`}
            tagText={diff}
            onClick={() => handleDifficultyTagClick(diff)}
            color="amber"
          />
        );
      })}
      {categoryTags.map((cat) => {
        return (
          <SuggestionTag
            key={`cat-${cat}`}
            tagText={cat}
            onClick={() => handleCategoryTagClick(cat)}
            color="emerald"
          />
        );
      })}
    </SuggestionCategory>
  );
});
