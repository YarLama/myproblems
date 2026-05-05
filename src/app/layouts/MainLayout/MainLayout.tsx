import { Outlet } from "react-router";
import { Nav } from "./Nav/Nav";
import { FileAccessNotification } from "@root/src/features/file-access-notification";
import { ScrollToTop } from "@ui";

export const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Nav />
      <main className="pt-[var(--header-height)] m:pt-[calc(var(--header-height)*1.5)] bg-primary text-fonts min-h-screen">
        <Outlet />
      </main>
      <FileAccessNotification />
      <ScrollToTop thresholdY={200}/>
    </div>
  );
};
