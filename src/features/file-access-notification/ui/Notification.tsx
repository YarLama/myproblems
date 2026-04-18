import { fileStore } from "@entities";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

const containerClasses = clsx([
  "fixed bottom-4 right-4 p-4 z-50 m:bottom-0 m:inset-x-0",
  "bg-[var(--color-secondary)]",
  "border border-[var(--color-primary)] rounded-lg shadow-lg m:border-none m:rounded-none",
  "flex items-center gap-4 m:flex-col",
]);

const buttonClasses = clsx([
  "px-4 py-2",
  "bg-[var(--color-text)] hover:bg-[var(--color-secondary)]",
  "text-[var(--color-secondary)] hover:text-[var(--color-text)] text-sm font-semibold",
  "rounded-md border hover:border-[var(--color-text)]",
  "transition-colors",
]);

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
    <div className={containerClasses}>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[var(--color-text)]">
          File access is lost.
        </span>
        <span className="text-xs text-[var(--color-text)]">
          Browser reset permission for security.
        </span>
      </div>

      <div className="flex flex-row gap-2">
        <button
          onClick={handleCancel}
          className={buttonClasses}
        >
          Cancel
        </button>
        <button
          onClick={handleRestore}
          className={buttonClasses}
        >
          Restore
        </button>
      </div>
    </div>
  );
});
