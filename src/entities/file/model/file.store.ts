import { ProblemList } from "@entities";
import { createFileDB } from "@lib";
import { makeAutoObservable, runInAction } from "mobx";

class FileStore {
  hasPermission: boolean = false;
  fileHandler: FileSystemFileHandle | null = null;
  isLoading: boolean = true;
  private db = createFileDB();
  private filePickerOption: OpenFilePickerOptions &
    SaveFilePickerOptions = {};

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init = async () => {
    try {
      const fileHandler = await this.db.getFileHandle();
      if (fileHandler) {
        this.fileHandler = fileHandler;
      }
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  };

  async checkPermissions() {
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
  }

  async requestPermission(): Promise<boolean> {
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
      console.log("requerstPermission error: ", e);
      return false;
    }
  }

  async openFile() {
    try {
      const [handler] = await window.showOpenFilePicker(
        this.filePickerOption,
      );
      await this.setupNewHandler(handler);
    } catch (e) {
      console.log("Open File error: ", e);
    }
  }

  async saveFileAs(data: ProblemList) {
    try {
      const handler = await window.showSaveFilePicker(
        this.filePickerOption,
      );
      await this.setupNewHandler(handler);
      await this.writeData(JSON.stringify(data));
    } catch (e) {
      console.log("Save As... error: ", e);
    }
  }

  async saveFile(data: ProblemList) {
    if (!this.fileHandler) {
      return this.saveFileAs(data);
    }

    if (!this.hasPermission) {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    await this.writeData(JSON.stringify(data));
  }

  private async setupNewHandler(
    handler: FileSystemFileHandle,
  ) {
    await this.db.saveFileHandle(handler);
    runInAction(() => {
      this.fileHandler = handler;
      this.hasPermission = true;
    });
  }

  private async writeData(data: string) {
    if (!this.fileHandler) return;
    try {
      const writable =
        await this.fileHandler.createWritable();
      await writable.write(data);
      await writable.close();
    } catch (e) {
      console.log("Write data error: ", e);
    }
  }
}

export const fileStore = new FileStore();
