import { createHashRouter, Navigate } from "react-router";
import {
  NewProblemPage,
  ProblemPage,
  ProblemsPage,
} from "@pages";
import { MainLayout, ProblemsLayout } from "@layouts";
import { routePath } from "@constants/routePaths";

const routes = [
  {
    path: routePath.root,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate to={routePath.problems.root} replace />
        ),
      },
      {
        path: routePath.problems.root,
        element: <ProblemsLayout />,
        children: [
          {
            index: true,
            element: <ProblemsPage />,
          },
          {
            path: routePath.problems.byIdTemplate,
            element: <ProblemPage />,
          },
          {
            path: routePath.problems.add,
            element: <NewProblemPage />,
          },
        ],
      },
      {
        path: routePath.notFound.root,
        element: (
          <Navigate to={routePath.problems.root} replace />
        ),
      },
    ],
  },
];

export const router = createHashRouter(routes);
