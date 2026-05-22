import { AvailableLanguages } from "@constants/languages";
import { ProblemDescription } from "@entities";
import { EditControls, LanguageSelect } from "@ui";
import { useEffect, useId, useRef, useState } from "react";

interface EditableDescriptionProps {
  value: ProblemDescription;
  defaultLanguage?: AvailableLanguages;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  onChange: (value: ProblemDescription) => void;
}

export const EditableDescription: React.FC<
  EditableDescriptionProps
> = ({
  value,
  defaultLanguage = "ru",
  defaultEditingState = false,
  isHaveEditControls = true,
  onChange,
}) => {
    const getInitialLanguage = (): AvailableLanguages => {
      if (value[defaultLanguage]) return defaultLanguage;
      const filledLanguage = Object.keys(value).find(
        (key) => value[key as AvailableLanguages],
      );
      return (
        (filledLanguage as AvailableLanguages) ||
        defaultLanguage
      );
    };
    const [isEditing, setIsEditing] = useState(
      defaultEditingState,
    );
    const [newValue, setNewValue] = useState<string>(
      value[defaultLanguage],
    );
    const [currentLanguage, setCurrentLanguage] =
      useState<AvailableLanguages>(getInitialLanguage);
    const inputId = useId();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
    const handleSaveClick = () => {
      onChange({
        ...value,
        [currentLanguage]: newValue,
      });
      setCurrentLanguage(currentLanguage);
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

    const handleChangeLanguage = (
      value: AvailableLanguages,
    ) => {
      setCurrentLanguage(value);
    };

    useEffect(() => {
      setNewValue(value[currentLanguage]);
    }, [currentLanguage, value]);

    useEffect(() => {
      if (isEditing) adjustHeight();
    }, [newValue, isEditing]);

    return (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <LanguageSelect
            language={currentLanguage}
            onChange={handleChangeLanguage}
          />
          {isHaveEditControls && (
            <EditControls
              isEditing={isEditing}
              onToggle={setIsEditing}
              onSave={handleSaveClick}
              onCancel={handleCancelClick}
            />
          )}
        </div>
        {isEditing ? (
          <textarea
            id={inputId}
            ref={textareaRef}
            className="border rounded-sm p-1 w-full max-h-[300px]"
            value={newValue}
            onChange={(e) => handleChange(e)}
            autoFocus={isHaveEditControls}
          />
        ) : (
          <span className="p-1 border-transparent border">
            {value[currentLanguage]}
          </span>
        )}
      </div>
    );
  };
