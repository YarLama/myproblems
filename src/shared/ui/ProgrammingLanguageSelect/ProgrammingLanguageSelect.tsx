import {
  AvailableProgrammingLanguages,
  ProgrammingLanguages,
} from "@constants/languages";
import { useId } from "react";

interface ProgrammingLanguageSelectProps {
  onChange: (value: AvailableProgrammingLanguages) => void;
  language?: AvailableProgrammingLanguages;
}

export const ProgrammingLanguageSelect: React.FC<
  ProgrammingLanguageSelectProps
> = ({ language = "javascript", onChange }) => {
  const inputId = useId();
  return (
    <select
      value={language}
      id={inputId}
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
