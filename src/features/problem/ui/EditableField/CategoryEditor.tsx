import { IconButton } from "@ui";

interface CategoryEditorProps {
  categories: string[];
  onDelete: (name: string) => void;
  onAdd: (name: string) => void;
  isAdding: boolean;
  setIsAdding: (val: boolean) => void;
  newName: string;
  setNewName: (val: string) => void;
}

export const CategoryEditor: React.FC<
  CategoryEditorProps
> = ({
  categories,
  onDelete,
  onAdd,
  isAdding,
  setIsAdding,
  newName,
  setNewName,
}) => {
    return (
      <div className="space-y-3">
        <div>
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between m-2 p-2 bg-gray-800 rounded-md border"
            >
              <span className="text-sm text-gray-300">
                {category}
              </span>
              <IconButton
                icon="delete"
                size="sm"
                onClick={() => onDelete(category)}
              />
            </div>
          ))}
        </div>

        {isAdding ? (
          <div className="flex items-center space-x-2 p-2 rounded-md">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Введите название категории"
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onKeyDown={(e) =>
                e.key === "Enter" && onAdd(newName)
              }
            />
            <IconButton
              icon="ok"
              size="sm"
              onClick={() => onAdd(newName)}
              disabled={newName.trim() === ""}
            />
            <IconButton
              icon="delete"
              size="sm"
              onClick={() => setIsAdding(false)}
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
    );
  };
