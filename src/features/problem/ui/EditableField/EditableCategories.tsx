import { EditControls } from "@ui";
import { useState } from "react";
import { CategoryViewList } from "./CategoryViewList";
import { CategoryEditor } from "./CategoryEditor";

interface EditableCategoriesProps {
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export const EditableCategories: React.FC<
  EditableCategoriesProps
> = ({ categories, onCategoriesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editCategories, setEditCategories] =
    useState<string[]>(categories);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] =
    useState("");

  const handleEdit = () => {
    setEditCategories([...categories]);
  };

  const handleCancel = () => {
    setEditCategories([...categories]);
    setIsAdding(false);
    setNewCategoryName("");
  };

  const handleSave = () => {
    onCategoriesChange(editCategories);
    setIsAdding(false);
    setNewCategoryName("");
  };

  const handleDelete = (categoryName: string) => {
    setEditCategories(
      editCategories.filter((cat) => cat !== categoryName),
    );
  };

  const handleAdd = (name: string) => {
    const newName = name.trim();
    if (newName) {
      if (!editCategories.includes(newName)) {
        setEditCategories((prev) => [...prev, newName]);
      }
      setNewCategoryName("");
      setIsAdding(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <EditControls
          isEditing={isEditing}
          onToggle={setIsEditing}
          onSave={handleSave}
          onCancel={handleCancel}
          onEdit={handleEdit}
        />
      </div>

      {isEditing ? (
        <CategoryEditor
          categories={editCategories}
          onDelete={handleDelete}
          onAdd={handleAdd}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          newName={newCategoryName}
          setNewName={setNewCategoryName}
        />
      ) : (
        <CategoryViewList categories={categories} />
      )}
    </div>
  );
};
