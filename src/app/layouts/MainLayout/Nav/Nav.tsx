import clsx from "clsx";
import { matchPath, useLocation } from "react-router";
import { ProblemsNav } from "./components/ProblemsNav";
import { ProblemNav } from "./components/ProblemNav";
import { DefaultNav } from "./components/DefaultNav";
import { routePath } from "@constants/routePaths";

const navClasses = clsx([
  "fixed",
  "top-0",
  "inset-x-0",
  "z-99",
  "h-[var(--header-height)]",
  "flex",
  "items-center",
  "justify-between",
  "p-4",
  "bg-gray-600",
  "border-b",
  "border-b-gray-700",
]);

export const Nav = () => {
  const { pathname } = useLocation();

  const getNavContent = (path: string) => {
    if (path === routePath.problems.root)
      return <ProblemsNav />;
    if (path === routePath.problems.add)
      return <DefaultNav title="Добавить новую задачу" />;
    if (matchPath({ path }, path)) return <ProblemNav />;
    return <DefaultNav title="" />;
  };

  return (
    <nav className={navClasses}>
      {getNavContent(pathname)}
    </nav>
  );
};
