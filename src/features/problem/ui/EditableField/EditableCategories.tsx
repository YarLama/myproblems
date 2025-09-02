import { EditControls, IconButton } from "@ui";
import { useState } from "react";

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

  const handleAdd = () => {
    if (newCategoryName.trim()) {
      setEditCategories([
        ...editCategories,
        newCategoryName.trim(),
      ]);
      setNewCategoryName("");
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewCategoryName("");
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

      {!isEditing && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
          {categories.length === 0 && (
            <p className="text-gray-500 text-sm">
              Без категорий
            </p>
          )}
        </div>
      )}

      {isEditing && (
        <div className="space-y-3">
          <div>
            {editCategories.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between m-2 p-2 bg-gray-800 rounded-md border"
              >
                <span className="text-sm text-gray-300">
                  {category}
                </span>
                <IconButton icon="delete" size="sm" onClick={() => handleDelete(category)}/>
              </div>
            ))}
          </div>

          {isAdding ? (
            <div className="flex items-center space-x-2 p-2 rounded-md">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) =>
                  setNewCategoryName(e.target.value)
                }
                placeholder="Введите название категории"
                className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <IconButton 
                icon="ok"
                size="sm"
                onClick={handleAdd}
                disabled={newCategoryName.trim() === ""}
              />
              <IconButton 
                icon="delete"
                size="sm"
                onClick={handleCancelAdd}
              />
            </div>
          ) : (
            <IconButton 
              icon="add"
              size="sm"
              onClick={() => setIsAdding(true)}
            />
          )}
        </div>
      )}
    </div>
  );
};
