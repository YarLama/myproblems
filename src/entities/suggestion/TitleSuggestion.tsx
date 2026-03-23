import {
  SuggestionCategory,
  SuggestionTag,
} from "@ui";

interface TitleSuggestionProps {
  value: string;
  visible?: boolean;
}

export const TitleSuggestion: React.FC<
  TitleSuggestionProps
> = ({ value, visible = true }) => {
  return (
    visible &&
    value && (
      <SuggestionCategory title="Title">
        <SuggestionTag tagText={value} />
      </SuggestionCategory>
    )
  );
};
