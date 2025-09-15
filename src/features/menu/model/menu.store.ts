import { makeAutoObservable } from "mobx";

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
}

export const menuStore = new MenuStore();
