import { Outlet } from "react-router";
import { Nav } from "./Nav/Nav";

export const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Nav />
      <main className="pt-[var(--header-height)] bg-gray-800 text-gray-300">
        <Outlet />
      </main>
    </div>
  );
};
