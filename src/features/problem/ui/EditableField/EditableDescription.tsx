import {
  AvailableLanguages,
  Languages,
} from "@constants/languages";
import { ProblemDescription } from "@entities";
import { LanguageSelect } from "@ui";
import { useEffect, useState } from "react";

interface EditableDescriptionProps {
  label?: string;
  value: ProblemDescription;
  defaultLanguage?: AvailableLanguages;
  onChange: (value: ProblemDescription) => void;
}

export const EditableDescription: React.FC<
  EditableDescriptionProps
> = ({
  label,
  value,
  defaultLanguage = "ru",
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState<string>(
    value[defaultLanguage],
  );
  const [currentLanguage, setCurrentLanguage] =
    useState<AvailableLanguages>(defaultLanguage);

  const handleSaveClick = () => {
    onChange({
      ...value,
      [currentLanguage]: newValue,
    });
    setCurrentLanguage(defaultLanguage)
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    setNewValue(value[currentLanguage]);
  }, [currentLanguage, value]);

  return (
    <div className="mb-4">
      {label ? (
        <label className="block text-gray-700">
          {label}
        </label>
      ) : null}
      {isEditing ? (
        <div className="flex gap-2">
          <LanguageSelect language={currentLanguage} onChange={(l) => setCurrentLanguage(l)}/>
          <textarea
            className="border p-1 flex-1"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            autoFocus
          />
          <button onClick={handleSaveClick}>
            {"save"}
          </button>
          <button onClick={handleCancelClick}>
            {"cancel"}
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <span className="p-1 border-transparent border">
            {value[defaultLanguage]}
          </span>
          <button
            onClick={handleEditClick}
            className="text-gray-700 hover:text-black"
          >
            {"edit"}
          </button>
        </div>
      )}
    </div>
  );
};
