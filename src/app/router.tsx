import { createHashRouter } from "react-router";
import { ProblemPage, TasksPage } from "@pages";
import { MainLayout, TasksLayout } from "@layouts";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "tasks",
        element: <TasksLayout />,
        children: [
          {
            index: true,
            element: <TasksPage />,
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
