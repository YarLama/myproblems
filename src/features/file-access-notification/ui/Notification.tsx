import { fileStore } from "@entities";
import { observer } from "mobx-react-lite";

export const Notification = observer(() => {
  if (fileStore.hasPermission || !fileStore.fileHandler) {
    return null;
  }

  if (fileStore.isLoading) {
    return null;
  }

  const handleRestore = async () => {
    await fileStore.requestPermission();
  };

  const handleCancel = async () => {
    await fileStore.clear();
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-lg flex items-center gap-4 z-50">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-amber-900">
          File access is lost.
        </span>
        <span className="text-xs text-amber-700">
          Browser reset permission for security.
        </span>
      </div>

      <button
        onClick={handleCancel}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-md transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleRestore}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-md transition-colors"
      >
        Restore
      </button>
    </div>
  );
});
