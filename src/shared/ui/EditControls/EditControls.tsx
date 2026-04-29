import clsx from "clsx";
import { IconButton } from "../IconButton/IconButton";

interface EditControlsProps {
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onToggle: (editing: boolean) => void;
  vertical?: boolean;
  isEditing: boolean;
}

export const EditControls: React.FC<EditControlsProps> = ({
  isEditing,
  vertical = false,
  onToggle,
  onSave,
  onEdit,
  onCancel,
}) => {
  const editingClasses = clsx([
    "flex gap-1",
    vertical && "flex-col",
  ]);

  const handleSave = () => {
    onSave?.();
    onToggle(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onToggle(false);
  };

  const handleEdit = () => {
    onEdit?.();
    onToggle(true);
  };

  return isEditing ? (
    <div className={editingClasses}>
      <IconButton
        icon="ok"
        onClick={handleSave}
        size="sm"
      />
      <IconButton
        icon="cancel"
        onClick={handleCancel}
        size="sm"
      />
    </div>
  ) : (
    <div className="flex">
      <IconButton
        icon="edit"
        onClick={handleEdit}
        size="sm"
      />
    </div>
  );
};
