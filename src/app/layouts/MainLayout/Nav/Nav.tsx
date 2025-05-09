import { SearchFeature } from "@features"
import { IconButton } from "@ui"
import clsx from "clsx"

export const Nav = () => {
  return (
      <nav className="fixed top-0 inset-x-0 z-99 h-[var(--header-height)] flex items-center justify-between p-4 bg-gray-600 border-b border-b-gray-700">
        <div className={clsx(["flex", "space-x-2"])}>
          <IconButton icon="menu" />
          <IconButton icon="add" />
        </div>
        <div className="flex-1 max-w-md mx-4">
          <SearchFeature />
        </div>
        <div className="flex space-x-2">
          <IconButton icon="shuffle" />
        </div>
      </nav>
 
  )
}
