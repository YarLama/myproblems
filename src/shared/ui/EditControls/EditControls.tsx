import { IconButton } from "../IconButton/IconButton";

interface EditControlsProps {
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onToggle: (editing: boolean) => void;
  isEditing: boolean;
}

export const EditControls: React.FC<EditControlsProps> = ({
  isEditing,
  onToggle,
  onSave,
  onEdit,
  onCancel,
}) => {
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
    <div className="flex">
      <IconButton icon="ok" onClick={handleSave} size="sm"/>
      <IconButton icon="cancel" onClick={handleCancel} size="sm"/>
    </div>
  ) : (
    <div className="flex">
      <IconButton icon="edit" onClick={handleEdit} size="sm"/>
    </div>
  );
};
