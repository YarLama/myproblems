import { createHashRouter } from "react-router";
import { ProblemPage, ProblemsPage } from "@pages";
import { MainLayout, ProblemsLayout } from "@layouts";
import { routePath } from "@constants/routePaths";

const routes = [
  {
    path: routePath.root,
    element: <MainLayout />,
    children: [
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
        ],
      },
      {
        path: routePath.add.root,
        element: <div>add page</div>,
      },
      {
        path: routePath.notFound.root,
        element: <div>404 Page</div>,
      },
    ],
  },
];

export const router = createHashRouter(routes);
