import { useImportProblems } from "@entities";

export const ProblemsOnboarding = () => {
  const { mutate, isPending, error } = useImportProblems();

  const handleImport = () => {
    mutate();
  };

  return (
    <div>
      <h1>Welcome!</h1>
      {isPending && <p>Loading Problems...</p>}
      {error && <p>Ошибка: {error.message}</p>}
      <div onClick={handleImport}>
        Use author Problem List
      </div>
    </div>
  );
};
