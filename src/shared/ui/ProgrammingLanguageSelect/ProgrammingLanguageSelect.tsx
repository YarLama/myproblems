import {
  AvailableProgrammingLanguages,
  ProgrammingLanguages,
} from "@constants/languages";

interface ProgrammingLanguageSelectProps {
  onChange: (value: AvailableProgrammingLanguages) => void;
  language?: AvailableProgrammingLanguages;
}

export const ProgrammingLanguageSelect: React.FC<
  ProgrammingLanguageSelectProps
> = ({ language = "javascript", onChange }) => {
  return (
    <select
      value={language}
      onChange={(e) =>
        onChange(
          e.target.value as AvailableProgrammingLanguages,
        )
      }
    >
      {ProgrammingLanguages.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
};
