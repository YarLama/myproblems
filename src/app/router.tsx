import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { TasksPage } from "@pages";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "tasks",
        element: <TasksPage />,
        children: [
          {
            path: ":id",
            element: <div>task page with id</div>,
          },
          {
            path: "tadd",
            element: <div>test add page inner tasks</div>,
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
