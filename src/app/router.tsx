import { createHashRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout/MainLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        element: <div>404 Page</div>
      }
    ]
  }
]

export const router = createHashRouter(routes);
