import { SuggestionCategory, SuggestionTag } from "@ui";

interface ProblemSuggestionProps {
  tags: Array<string> | string;
  title?: string;
  visible?: boolean;
  onTagClick?: (value: string) => void;
}

export const ProblemSuggestion: React.FC<
  ProblemSuggestionProps
> = ({ tags, title, visible = true, onTagClick }) => {
  const isHidden = !visible || tags.length === 0;

  if (isHidden) return null;

  return (
    <SuggestionCategory title={title}>
      {Array.isArray(tags) ? (
        tags.map((tag) => {
          return (
            <SuggestionTag
              key={tag}
              tagText={tag}
              onClick={() => onTagClick?.(tag)}
            />
          );
        })
      ) : (
        <SuggestionTag
          tagText={tags}
          onClick={() => onTagClick?.(tags)}
        />
      )}
    </SuggestionCategory>
  );
};
