import { menuStore } from "@features";
import { IconButton } from "@ui";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export const SlideMenu = observer(() => {
  const { isOpen, close, openFile, saveFileAs, saveFile } = menuStore;

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
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={close}
      />
      <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Меню
            </h2>
            <IconButton
              onClick={close}
              icon="cancel"
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Закрыть меню"
            />
          </div>
          <div className="flex-1 p-4 space-y-2">
            <button onClick={openFile} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900">
              Открыть
            </button>
            <button onClick={saveFile} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900">
              Сохранить
            </button>
            <button onClick={saveFileAs} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900">
              Сохранить Как
            </button>
            <div className="my-4 border-t border-gray-200" />
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 flex items-center">
              GitHub репозиторий
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
});
