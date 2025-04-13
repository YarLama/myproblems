import clsx from "clsx"
import App from "../../../App"
import { IconButton } from "@ui"

export const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-between p-4 bg-gray-600 border-b border-b-gray-700">
        <div className={clsx(["flex", "space-x-2"])}>
          <IconButton icon="menu" />
          <IconButton icon="left" />
          <IconButton icon="right" />
          <IconButton icon="add" />
          <IconButton icon="delete" />
          <IconButton icon="shuffle" />
          <IconButton icon="up" />
        </div>
        <div className="flex-1 max-w-md mx-4">
          <IconButton icon="search" />
        </div>
        <div className="flex space-x-2">
          <IconButton icon="cancel" hoverVariant="negative"/>
          <IconButton icon="ok" hoverVariant="positive"/>
        </div>
      </nav>
      <main className="bg-gray-600 text-gray-300">
        MainLayout
        <App />
      </main>
    </div>
  )
}
