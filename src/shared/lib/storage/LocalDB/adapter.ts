import { LocalDB } from "./constants";

interface LocalDB {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown): Promise<void>;
}

export const createLocalDB = (): LocalDB => {
  let db: IDBDatabase | null = null;

  const connect = async (): Promise<IDBDatabase> => {
    if (db) return db;

    return new Promise((res, rej) => {
      const request = indexedDB.open(LocalDB.dbName, 1);

      request.onupgradeneeded = () => {
        request.result.createObjectStore(LocalDB.dbStoreName);
      };

      request.onsuccess = () => {
        db = request.result;
        res(db);
      };

      request.onerror = () => rej(request.error);
    });
  };

  return {
    async get(key) {
      const _db = await connect();
      return new Promise((res) => {
        const tx = _db.transaction(
          LocalDB.dbStoreName,
          "readonly",
        );
        const request = tx
          .objectStore(LocalDB.dbStoreName)
          .get(key);
        request.onsuccess = () =>
          res(request.result || null);
        request.onerror = () => res(null);
      });
    },

    async set(key, value) {
      const _db = await connect();
      return new Promise((res) => {
        const tx = _db.transaction(
          LocalDB.dbStoreName,
          "readwrite",
        );
        tx.objectStore(LocalDB.dbStoreName).put(value, key);
        tx.oncomplete = () => res();
      });
    },
  };
};
