import { EditControls } from "@ui";
import { useId, useState } from "react";

interface EditableTextProps {
  label?: string;
  value: string;
  isMultiline?: boolean;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  onTextChange?: (value: string) => void;
  onSave?: (value: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
  label,
  value,
  defaultEditingState = false,
  isHaveEditControls = true,
  onTextChange,
  onSave,
  isMultiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(
    defaultEditingState,
  );
  const [newValue, setNewValue] = useState(value);
  const inputId = useId();

  const handleSaveClick = () => {
    onSave?.(newValue);
  };
  const handleCancelClick = () => {
    setNewValue(value);
  };
  const handleValueChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >,
  ) => {
    setNewValue(e.target.value);
    onTextChange?.(e.target.value);
  };

  return (
    <div className="flex items-center min-w-0">
      {label ? (
        <label
          className="block text-gray-700"
          htmlFor={isEditing ? inputId : undefined}
        >
          {label}
        </label>
      ) : null}
      {isEditing ? (
        <div className="flex gap-2 min-w-0 text-[var(--color-text)]">
          {isMultiline ? (
            <textarea
              id={inputId}
              className="border p-1 flex-1 min-w-0 bg-[var(--color-primary)]" 
              value={newValue}
              onChange={handleValueChange}
              autoFocus={isHaveEditControls}
            />
          ) : (
            <input
              id={inputId}
              className="border p-1 flex-1 min-w-0 bg-[var(--color-primary)]"
              value={newValue}
              onChange={handleValueChange}
              autoFocus={isHaveEditControls}
            />
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center min-w-0 max-w-sm">
          <span className="p-1 text-[var(--color-text)] border-transparent border truncate max-w-full">
            {value}
          </span>
        </div>
      )}
      {isHaveEditControls && (
        <EditControls
          isEditing={isEditing}
          onToggle={setIsEditing}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      )}
    </div>
  );
};
