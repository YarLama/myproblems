import {
  AvailableLanguages,
  Languages,
} from "@constants/languages";

interface LanguageSelectProps {
  onChange: (value: AvailableLanguages) => void;
  language?: AvailableLanguages;
}

export const LanguageSelect: React.FC<
  LanguageSelectProps
> = ({ onChange, language = "ru" }) => {
  return (
    <select
      value={language}
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
