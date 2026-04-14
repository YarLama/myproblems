import { useImportProblems } from "@entities";
import { Loader } from "@ui";

export const ProblemsOnboarding = () => {
  const { mutate, isPending, error } = useImportProblems();

  const handleImport = () => {
    mutate();
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <Loader />
      {isPending && <Loader />}
      {error && <p>Ошибка: {error.message}</p>}
      <div onClick={handleImport}>
        Use author Problem List
      </div>
    </div>
  );
};
