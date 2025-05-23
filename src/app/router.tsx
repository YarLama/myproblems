import { createHashRouter } from "react-router";
import { ProblemPage, ProblemsPage } from "@pages";
import { MainLayout, ProblemsLayout } from "@layouts";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "problems",
        element: <ProblemsLayout />,
        children: [
          {
            index: true,
            element: <ProblemsPage />,
          },
          {
            path: ":id",
            element: <ProblemPage />,
          },
        ],
      },
      {
        path: "add",
        element: <div>add page</div>,
      },
      {
        path: "*",
        element: <div>404 Page</div>,
      },
    ],
  },
];

export const router = createHashRouter(routes);
