import {
  fileStore,
  ProblemList,
  problemStore,
} from "@entities";
import { createLocalDB } from "@lib";
import { validateProblemList } from "@utils/verify";
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
    runInAction(() => {
      this.isOpen = false;
    });
    try {
      const handle = await fileStore.openFile();
      const file = await handle?.getFile();
      const content = await file?.text();
      if (content) {
        const json: ProblemList = JSON.parse(content);
        const validateResult = validateProblemList(json);

        if (validateResult.isValid) {
          const localDB = createLocalDB();
          await localDB.setProblemListInfo({
            version: json.version,
            format: json.format,
          });
          await localDB.replaceAllProblems(json.data);
          await problemStore.refreshFromDB();
        } else {
          throw new Error(validateResult.error);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  saveFile = async () => {
    const problemList = problemStore.problemList;
    await fileStore.saveFile(problemList);
    runInAction(() => {
      this.isOpen = false;
    });
  };

  saveFileAs = async () => {
    const problemList = problemStore.problemList;
    await fileStore.saveFileAs(problemList);
    runInAction(() => {
      this.isOpen = false;
    });
  };
}

export const menuStore = new MenuStore();
