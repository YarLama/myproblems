import { fileStore, problemStore } from "@entities";
import { makeAutoObservable, runInAction } from "mobx";

class MenuStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  openToggle = () => {
    this.isOpen = !this.isOpen;
  };

  open = () => {
    this.isOpen = true;
  };

  close = () => {
    this.isOpen = false;
  };

  openFile = async () => {
    await fileStore.openFile();
    runInAction(() => {
      this.isOpen = false;
    })
  }

  saveFile = async () => {
    const problemList = problemStore.problemList;
    await fileStore.saveFile(problemList);
    runInAction(() => {
      this.isOpen = false;
    })
  }

  saveFileAs = async () => {
    const problemList = problemStore.problemList;
    await fileStore.saveFileAs(problemList);
    runInAction(() => {
      this.isOpen = false;
    })
  }
}

export const menuStore = new MenuStore();
