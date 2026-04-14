import { clsx } from "clsx";
import { routePath } from "@constants/routePaths";
import { useImportProblems } from "@entities";
import { menuStore } from "@features";
import { Loader } from "@ui";
import { useNavigate } from "react-router";

const containerClasses = clsx(
  "flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center",
  "p-6 text-center",
);

const titleClasses = clsx(
  "mb-8 text-4xl font-extrabold tracking-tight",
  "sm:text-5xl",
);

const errorClasses = clsx(
  "mb-6 max-w-md rounded-lg border border-red-200 bg-red-50",
  "p-4 text-sm text-red-600",
);

const actionsContainerClasses = clsx(
  "flex w-full max-w-sm flex-col gap-3",
);

const buttonClasses = clsx(
  "rounded-xl px-6 py-3 font-semibold transition-all active:scale-95",
  "bg-gray-600 text-white hover:bg-gray-700",
);

export const ProblemsOnboarding = () => {
  const { mutate, isPending, error } = useImportProblems();
  const { openFile } = menuStore;
  const navigate = useNavigate();

  const handleImport = () => {
    mutate();
  };

  const handleStartNew = () => {
    navigate(routePath.problems.add);
  };

  const handleOpenList = () => {
    openFile();
  };

  return (
    <div className={containerClasses}>
      <h1 className={titleClasses}>Welcome!</h1>
      {error && (
        <div className={errorClasses}>
          Ошибка: {error.message}
        </div>
      )}
      <div className={actionsContainerClasses}>
        <button
          onClick={handleStartNew}
          className={buttonClasses}
        >
          Create new Problem
        </button>
        <button
          onClick={handleOpenList}
          className={buttonClasses}
        >
          Open file with Problem List
        </button>
        <button
          onClick={handleImport}
          className={buttonClasses}
        >
          {isPending ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            "Use author Problem List"
          )}
        </button>
      </div>
    </div>
  );
};
