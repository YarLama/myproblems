import { EditControls } from "@ui";
import { useState } from "react";
import { CategoryViewList } from "./CategoryViewList";
import { CategoryEditor } from "./CategoryEditor";

interface EditableCategoriesProps {
  categories: string[];
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  isHaveAutoFocus?: boolean;
  onCategoriesChange: (categories: string[]) => void;
}

export const EditableCategories: React.FC<
  EditableCategoriesProps
> = ({
  categories,
  defaultEditingState = false,
  isHaveEditControls = true,
  isHaveAutoFocus = true,
  onCategoriesChange,
}) => {
    const [isEditing, setIsEditing] = useState(
      defaultEditingState,
    );
    const [editCategories, setEditCategories] =
      useState<string[]>(categories);
    const [isAdding, setIsAdding] = useState(
      defaultEditingState,
    );
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
      <div className="grid grid-cols-[1fr_auto] gap-4">
        {isEditing ? (
          <CategoryEditor
            categories={editCategories}
            onDelete={handleDelete}
            onAdd={handleAdd}
            isAdding={isAdding}
            autoFocus={isHaveAutoFocus}
            setIsAdding={setIsAdding}
            newName={newCategoryName}
            setNewName={setNewCategoryName}
          />
        ) : (
          <CategoryViewList categories={categories} />
        )}

        {isHaveEditControls && (
          <div className="flex items-start ">
            <EditControls
              vertical
              isEditing={isEditing}
              onToggle={setIsEditing}
              onSave={handleSave}
              onCancel={handleCancel}
              onEdit={handleEdit}
            />
          </div>
        )}
      </div>
    );
  };
