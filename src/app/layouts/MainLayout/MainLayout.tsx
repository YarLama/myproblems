import { Outlet } from "react-router";
import { Nav } from "./Nav/Nav";
import { FileAccessNotification } from "@root/src/features/file-access-notification";

export const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Nav />
      <main className="pt-[var(--header-height)] bg-primary text-fonts min-h-screen">
        <Outlet />
      </main>
      <FileAccessNotification />
    </div>
  );
};
