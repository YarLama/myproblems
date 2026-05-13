import { menuStore } from "@features";
import { IconButton } from "@ui";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const buttonClasses = clsx([
  "w-full",
  "text-left",
  "p-3",
  "hover:bg-[var(--color-text)] text-[var(--color-text)] hover:text-[var(--color-secondary)]",
]);

const containerClasses = clsx([
  "fixed top-0 left-0 z-50",
  "h-full w-[30vw] m:w-[100vw]",
  "bg-[var(--color-secondary)]",
]);

export const SlideMenu = observer(() => {
  const { isOpen, close, openFile, saveFileAs, saveFile } =
    menuStore;

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/80 z-50"
        onClick={close}
      />
      <div className={containerClasses}>
        <div className="h-full flex flex-col">
          <div className="flex p-4 border-b border-[var(--color-primary)]">
            <IconButton
              onClick={close}
              icon="cancel"
              aria-label="Close menu"
            />
          </div>
          <div className="flex-1">
            <button
              onClick={openFile}
              className={buttonClasses}
            >
              Open File
            </button>
            <button
              onClick={() => saveFile()}
              className={buttonClasses}
            >
              Save File
            </button>
            <button
              onClick={() => saveFileAs()}
              className={buttonClasses}
            >
              Save File As
            </button>
            <div className="border-t border-[var(--color-primary)]" />
            <a
              href="https://github.com/YarLama/myproblems"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={buttonClasses}>
                GitHub
              </button>
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
});
