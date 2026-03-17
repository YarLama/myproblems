import { fileStore } from "@entities";
import { observer } from "mobx-react-lite";

export const Notification = observer(() => {
  if (fileStore.hasPermission) {
    return null;
  }

  if (fileStore.isLoading) {
    return null;
  }

  const handleRestore = async () => {
    await fileStore.requestPermission();
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-lg flex items-center gap-4 z-50">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-amber-900">
          Доступ к файлу потерян
        </span>
        <span className="text-xs text-amber-700">
          Браузер сбросил разрешения для безопасности.
        </span>
      </div>

      <button
        onClick={handleRestore}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-md transition-colors"
      >
        Восстановить
      </button>
    </div>
  );
});
