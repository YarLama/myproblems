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
      const request = indexedDB.open(
        LocalDB.dbName,
        LocalDB.dbVersion,
      );

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

  const executeWriteOperation = async (
    storeName: string,
    operation: (store: IDBObjectStore) => void,
  ): Promise<void> => {
    const db = await connect();
    return new Promise((res, rej) => {
      const tx = db.transaction(storeName, "readwrite");
      operation(tx.objectStore(storeName));
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  };

  const executeReadOperation = async <T>(
    storeName: string,
    operation: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T> => {
    const db = await connect();
    return new Promise((res, rej) => {
      const tx = db.transaction(storeName, "readonly");
      const request = operation(tx.objectStore(storeName));
      request.onsuccess = () => res(request.result);
      request.onerror = () => rej(request.error);
    });
  };

  return {
    async getProblemListInfo() {
      return executeReadOperation(
        LocalDB.dbProblemListInfoStore,
        (store) => store.get("info"),
      );
    },

    async setProblemListInfo(info) {
      return executeWriteOperation(
        LocalDB.dbProblemListInfoStore,
        (store) => store.put(info, "info"),
      );
    },

    async getAllProblems() {
      return executeReadOperation(
        LocalDB.dbProblemListStore,
        (store) => store.getAll(),
      ).then((result) => result || []);
    },

    async getProblem(id) {
      return executeReadOperation(
        LocalDB.dbProblemListStore,
        (store) => store.get(id),
      ).then((result) => result || null);
    },

    async addProblem(item) {
      const plainItem = JSON.parse(JSON.stringify(item));
      return executeWriteOperation(
        LocalDB.dbProblemListStore,
        (store) => store.add(plainItem),
      );
    },

    async updateProblem(item) {
      const plainItem = JSON.parse(JSON.stringify(item));
      return executeWriteOperation(
        LocalDB.dbProblemListStore,
        (store) => store.put(plainItem),
      );
    },

    async deleteProblem(id) {
      return executeWriteOperation(
        LocalDB.dbProblemListStore,
        (store) => store.delete(id),
      );
    },
  };
};
