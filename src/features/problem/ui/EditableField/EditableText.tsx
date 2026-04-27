import { EditControls } from "@ui";
import clsx from "clsx";
import { useId, useState } from "react";

interface EditableTextProps {
  value: string;
  isMultiline?: boolean;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  onTextChange?: (value: string) => void;
  onSave?: (value: string) => void;
}

const inputClasses = clsx([
  "border",
  "p-1",
  "text-[var(--color-text)]",
  "bg-[var(--color-primary)]",
]);

const spanClasses = clsx([
  "border-transparent border",
  "truncate",
  "p-1",
  "text-[var(--color-text)]",
]);

export const EditableText: React.FC<EditableTextProps> = ({
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
    <div className="flex items-center min-w-0 max-w-sm">
      {isEditing ? (
        isMultiline ? (
          <textarea
            id={inputId}
            className={inputClasses}
            value={newValue}
            onChange={handleValueChange}
            autoFocus={isHaveEditControls}
          />
        ) : (
          <input
            id={inputId}
            className={inputClasses}
            value={newValue}
            onChange={handleValueChange}
            autoFocus={isHaveEditControls}
          />
        )
      ) : (
        <span className={spanClasses}>{value}</span>
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
