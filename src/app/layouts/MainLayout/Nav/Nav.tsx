import clsx from "clsx";
import { matchPath, useLocation } from "react-router";
import { ProblemsNav } from "./components/ProblemsNav";
import { ProblemNav } from "./components/ProblemNav";
import { DefaultNav } from "./components/DefaultNav";
import { routePath } from "@constants/routePaths";
import { SlideMenu } from "@features";
import { NewProblemNav } from "./components/NewProblemNav";

const navClasses = clsx([
  "fixed top-0 inset-x-0 z-40 h-[var(--header-height)]",
  "bg-gray-600 border-b border-b-gray-700",
  "grid grid-cols-[1fr_auto_1fr] items-center",
  "m:grid-cols-2 m:h-auto m:py-2",
]);

export const Nav = () => {
  const { pathname } = useLocation();

  const getNavContent = (path: string) => {
    if (path === routePath.problems.root)
      return <ProblemsNav />;
    if (path === routePath.problems.add)
      return <NewProblemNav />;
    if (matchPath({ path }, path)) return <ProblemNav />;
    return <DefaultNav title="" />;
  };

  return (
    <>
      <nav className={navClasses}>
        {getNavContent(pathname)}
      </nav>
      <SlideMenu />
    </>
  );
};
