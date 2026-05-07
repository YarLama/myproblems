import { EditControls } from "@ui";
import clsx from "clsx";
import { useEffect, useId, useState } from "react";

interface EditableTextProps {
  value: string;
  isMultiline?: boolean;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  disabled?: boolean;
  onTextChange?: (value: string) => void;
  onSave?: (value: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  defaultEditingState = false,
  isHaveEditControls = true,
  onTextChange,
  onSave,
  isMultiline = false,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(
    defaultEditingState,
  );
  const [newValue, setNewValue] = useState(value);
  const inputId = useId();
  const inputClasses = clsx([
    "border rounded-sm",
    "p-1",
    "text-[var(--color-text)]",
    "bg-[var(--color-primary)]",
    "w-full",
    isMultiline ? "h-full" : "h-auto",
  ]);

  const spanClasses = clsx([
    "border-transparent border",
    !isMultiline && "truncate",
    "max-w-sm",
    "p-1",
    "text-[var(--color-text)]",
  ]);
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

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  return (
    <div className="flex items-start min-w-0 w-full h-full">
      {isEditing ? (
        isMultiline ? (
          <textarea
            id={inputId}
            className={inputClasses}
            value={newValue}
            onChange={handleValueChange}
            autoFocus={isHaveEditControls}
            disabled={disabled}
          />
        ) : (
          <input
            id={inputId}
            className={inputClasses}
            value={newValue}
            onChange={handleValueChange}
            autoFocus={isHaveEditControls}
            disabled={disabled}
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
