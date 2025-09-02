import { AvailableLanguages } from "@constants/languages";
import { ProblemDescription } from "@entities";
import { EditControls, LanguageSelect } from "@ui";
import { useEffect, useState } from "react";

interface EditableDescriptionProps {
  label?: string;
  value: ProblemDescription;
  defaultLanguage?: AvailableLanguages;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  onChange: (value: ProblemDescription) => void;
}

export const EditableDescription: React.FC<
  EditableDescriptionProps
> = ({
  label,
  value,
  defaultLanguage = "ru",
  defaultEditingState = false,
  isHaveEditControls = true,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(
    defaultEditingState,
  );
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
    setCurrentLanguage(defaultLanguage);
  };

  const handleCancelClick = () => {
    setNewValue(value[currentLanguage]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewValue(e.target.value);
    if (!isHaveEditControls && isEditing) {
      onChange({
        ...value,
        [currentLanguage]: e.target.value,
      });
    }
  };

  useEffect(() => {
    setNewValue(value[currentLanguage]);
  }, [currentLanguage, value]);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700">
          {label}
        </label>
      )}
      <div className="flex justify-between">
        <LanguageSelect
          language={currentLanguage}
          onChange={(l) => setCurrentLanguage(l)}
        />
        {isHaveEditControls && (
          <div className="">
            <EditControls
              isEditing={isEditing}
              onToggle={setIsEditing}
              onSave={handleSaveClick}
              onCancel={handleCancelClick}
            />
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="flex gap-2">
          <textarea
            className="border p-1 flex-1"
            value={newValue}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <span className="p-1 border-transparent border">
            {value[currentLanguage]}
          </span>
        </div>
      )}
    </div>
  );
};
