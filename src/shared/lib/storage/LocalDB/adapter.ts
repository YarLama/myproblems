import { Problem } from "@types";
import { LocalDB } from "./constants";

interface ProblemListInfo {
  version: number;
  format: "list";
}

interface LocalDB {
  getProblemListInfo(): Promise<ProblemListInfo>;
  setProblemListInfo(info: ProblemListInfo): Promise<void>;
  getAllProblems(): Promise<Problem[]>;
  getProblem(id: string): Promise<Problem | null>;
  addProblem(item: Problem): Promise<void>;
  updateProblem(item: Problem): Promise<void>;
  deleteProblem(id: string): Promise<void>;
}

export const createLocalDB = (): LocalDB => {
  let db: IDBDatabase | null = null;

  const connect = async (): Promise<IDBDatabase> => {
    if (db) return db;

    return new Promise((res, rej) => {
      const request = indexedDB.open(LocalDB.dbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (
          !db.objectStoreNames.contains(
            LocalDB.dbProblemListInfoStore,
          )
        ) {
          db.createObjectStore(
            LocalDB.dbProblemListInfoStore,
          );
        }
        if (
          !db.objectStoreNames.contains(
            LocalDB.dbProblemListStore,
          )
        ) {
          db.createObjectStore(LocalDB.dbProblemListStore, {
            keyPath: "id",
            autoIncrement: false,
          });
        }
      };

      request.onsuccess = () => {
        db = request.result;
        res(db);
      };

      request.onerror = () => rej(request.error);
    });
  };

  return {
    async getProblemListInfo() {
      const _storeName = LocalDB.dbProblemListInfoStore;
      const _db = await connect();
      return new Promise((res) => {
        const tx = _db.transaction(_storeName, "readonly");
        const request = tx
          .objectStore(_storeName)
          .get("info");
        request.onsuccess = () => res(request.result);
      });
    },

    async setProblemListInfo(info) {
      const _storeName = LocalDB.dbProblemListInfoStore;
      const _db = await connect();
      return new Promise((res) => {
        const tx = _db.transaction(_storeName, "readwrite");
        tx.objectStore(_storeName).put(info, "info");
        tx.oncomplete = () => res();
      });
    },

    async getAllProblems() {
      const _storeName = LocalDB.dbProblemListStore;
      const _db = await connect();
      return new Promise((res) => {
        const tx = _db.transaction(_storeName, "readonly");
        const request = tx.objectStore(_storeName).getAll();
        request.onsuccess = () => {
          res(request.result || []);
        };
      });
    },

    async getProblem(id) {
      const _storeName = LocalDB.dbProblemListStore;
      const _db = await connect();
      return new Promise((res) => {
        const tx = _db.transaction(_storeName, "readonly");
        const request = tx.objectStore(_storeName).get(id);
        request.onsuccess = () =>
          res(request.result || null);
      });
    },

    async addProblem(item) {
      const _storeName = LocalDB.dbProblemListStore;
      const _db = await connect();
      return new Promise((res, rej) => {
        const tx = _db.transaction(_storeName, "readwrite");
        const _store = tx.objectStore(_storeName);
        _store.add(item);
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    },
  };
};
