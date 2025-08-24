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
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditCategories([...categories]);
    setIsEditing(false);
    setIsAdding(false);
    setNewCategoryName("");
  };

  const handleSave = () => {
    onCategoriesChange(editCategories);
    setIsEditing(false);
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
        {!isEditing ? (
          <button onClick={handleEdit}>{"edit"}</button>
        ) : (
          <div className="flex space-x-2">
            <button onClick={handleSave}>{"save"}</button>
            <button onClick={handleCancel}>
              {"cancel"}
            </button>
          </div>
        )}
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
                <button
                  onClick={() => handleDelete(category)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
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
              <button
                onClick={handleAdd}
                disabled={!newCategoryName.trim()}
                className="p-1 text-green-500 hover:text-green-700 disabled:text-gray-400"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                onClick={handleCancelAdd}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
