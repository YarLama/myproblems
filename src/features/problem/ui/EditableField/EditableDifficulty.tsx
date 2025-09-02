import { DifficultyValues } from "@constants/difficulty";
import { ProblemDifficulty } from "@entities";
import { EditControls } from "@ui";
import { useState } from "react";

interface EditableDifficultyProps {
  value: ProblemDifficulty;
  onDifficultyChange?: (v: ProblemDifficulty) => void;
  onSave?: (v: ProblemDifficulty) => void;
}

export const EditableDifficulty: React.FC<
  EditableDifficultyProps
> = ({ value, onDifficultyChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSaveClick = () => {
    onSave?.(currentValue);
  };

  const handleCancelClick = () => {
    setCurrentValue(value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = e.target.value as ProblemDifficulty;
    setCurrentValue(newValue);
    if (onDifficultyChange) onDifficultyChange(newValue);
  };

  return (
    <div className="mb-4">
      <div>
        {!isEditing ? (
          <span className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full text-sm font-medium">
            {currentValue}
          </span>
        ) : (
          <select
            value={currentValue}
            onChange={(e) => handleChange(e)}
          >
            {DifficultyValues.map((dif) => (
              <option key={dif} value={dif}>
                {dif}
              </option>
            ))}
          </select>
        )}
      </div>
      <EditControls 
        isEditing={isEditing}
        onToggle={setIsEditing}
        onSave={handleSaveClick}
        onCancel={handleCancelClick}
      />
    </div>
  );
};
