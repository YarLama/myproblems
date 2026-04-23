import { ProblemList } from "@entities";
import { fileDB } from "@lib";
import { makeAutoObservable, runInAction } from "mobx";

class FileStore {
  hasPermission: boolean = false;
  fileHandler: FileSystemFileHandle | null = null;
  isLoading: boolean = true;
  private db = fileDB;
  private commonPickerOption: OpenFilePickerOptions &
    SaveFilePickerOptions = {
      types: [
        {
          accept: { "application/json": [".json"] },
        },
      ],
    };

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init = async () => {
    try {
      const fileHandler = await this.db.getFileHandle();
      if (fileHandler) {
        runInAction(() => (this.fileHandler = fileHandler));
      }
      await this.checkPermissions();
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };

  clear = async () => {
    if (this.fileHandler) {
      runInAction(() => {
        this.fileHandler = null;
        this.hasPermission = false;
      });
    }
    this.db.clearFileHandle();
  };

  checkPermissions = async () => {
    if (!this.fileHandler) {
      runInAction(() => (this.hasPermission = false));
      return;
    }

    const state = await this.fileHandler.queryPermission({
      mode: "readwrite",
    });

    runInAction(() => {
      this.hasPermission = state === "granted";
    });
  };

  requestPermission = async (): Promise<boolean> => {
    if (!this.fileHandler) return false;

    try {
      const state =
        await this.fileHandler.requestPermission({
          mode: "readwrite",
        });
      const isGranted = state === "granted";

      runInAction(() => {
        this.hasPermission = isGranted;
      });

      return isGranted;
    } catch (e) {
      console.error("requerstPermission error: ", e);
      return false;
    }
  };

  openFile =
    async (): Promise<FileSystemFileHandle | null> => {
      try {
        const [handler] = await window.showOpenFilePicker({
          ...this.commonPickerOption,
          excludeAcceptAllOption: true,
          multiple: false,
        });
        await this.setupNewHandler(handler);

        return handler;
      } catch (e) {
        console.error("Open File error: ", e);
        return null;
      }
    };

  saveFileAs = async (data: ProblemList) => {
    try {
      const handler = await window.showSaveFilePicker({
        ...this.commonPickerOption,
        suggestedName: "my problem list.json",
      });
      await this.setupNewHandler(handler);
      await this.writeData(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Save As... error: ", e);
    }
  };

  saveFile = async (data: ProblemList) => {
    if (!this.fileHandler) {
      return this.saveFileAs(data);
    }

    if (!this.hasPermission) {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    await this.writeData(JSON.stringify(data, null, 2));
  };

  private setupNewHandler = async (
    handler: FileSystemFileHandle,
  ) => {
    await this.db.saveFileHandle(handler);
    runInAction(() => {
      this.fileHandler = handler;
      this.hasPermission = true;
    });
  };

  private writeData = async (data: string) => {
    if (!this.fileHandler) return;
    try {
      const writable =
        await this.fileHandler.createWritable();
      await writable.write(data);
      await writable.close();
    } catch (e) {
      console.error("Write data error: ", e);
    }
  };
}

export const fileStore = new FileStore();
