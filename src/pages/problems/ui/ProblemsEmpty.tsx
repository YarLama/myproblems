import { clsx } from "clsx";

const containerClasses = clsx(
  "flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center",
  "p-6 text-center",
);

const titleClasses = clsx(
  "mb-8 text-4xl font-extrabold tracking-tight",
  "sm:text-5xl",
);

export const ProblemsEmpty = () => {

  return (
    <div className={containerClasses}>
      <h1 className={titleClasses}>No problems match</h1>
    </div>
  );
};
