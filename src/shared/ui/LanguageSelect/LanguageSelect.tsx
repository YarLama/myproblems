import {
  AvailableLanguages,
  Languages,
} from "@constants/languages";
import { useId } from "react";

interface LanguageSelectProps {
  onChange: (value: AvailableLanguages) => void;
  language?: AvailableLanguages;
}

export const LanguageSelect: React.FC<
  LanguageSelectProps
> = ({ onChange, language = "ru" }) => {
  const inputId = useId();
  return (
    <select
      value={language}
      id={inputId}
      onChange={(e) => onChange(e.target.value as AvailableLanguages)}
    >
      {Languages.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
