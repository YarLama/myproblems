import { AvailableProgrammingLanguages } from "@constants/languages";
import { makeAutoObservable } from "mobx";

class ProblemEditorStore {
  currentLanguage: AvailableProgrammingLanguages =
    "javascript";
  code: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage = (lang: AvailableProgrammingLanguages) => {
    this.currentLanguage = lang;
  };

  setCode = (value: string) => {
    this.code = value;
  }
}

export const problemEditorStore = new ProblemEditorStore();
