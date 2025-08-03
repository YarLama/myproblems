import { useState } from "react";

interface EditableTextProps {
  label?: string;
  value: string;
  isMultiline?: boolean;
  onChange: (value: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
  label,
  value,
  onChange,
  isMultiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    onChange(newValue);
    setIsEditing(false);
  };
  const handleCancelClick = () => {
    setNewValue(value);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      {label ? (
        <label className="block text-gray-700">
          {label}
        </label>
      ) : null}
      {isEditing ? (
        <div className="flex gap-2">
          {isMultiline ? (
            <textarea
              className="border p-1 flex-1"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              autoFocus
            />
          ) : (
            <input
              className="border p-1 flex-1"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              autoFocus
            />
          )}
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
            {value}
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
