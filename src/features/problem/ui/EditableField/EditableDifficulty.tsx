import { DifficultyValues } from "@constants/difficulty";
import { ProblemDifficulty } from "@entities";
import { EditControls } from "@ui";
import { useState } from "react";

interface EditableDifficultyProps {
  value: ProblemDifficulty;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  onDifficultyChange?: (v: ProblemDifficulty) => void;
  onSave?: (v: ProblemDifficulty) => void;
}

export const EditableDifficulty: React.FC<
  EditableDifficultyProps
> = ({
  value,
  defaultEditingState = false,
  isHaveEditControls = true,
  onDifficultyChange,
  onSave,
}) => {
    const [isEditing, setIsEditing] = useState(
      defaultEditingState,
    );
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
      onDifficultyChange?.(newValue);
    };

    return (
      <div className="flex gap-2 justify-between">
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
