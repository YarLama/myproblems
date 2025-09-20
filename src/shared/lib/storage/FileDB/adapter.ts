import { FileDB } from "@constants/db";
import { executeReadOperation, executeWriteOperation } from "../utils";

export interface FileHandleRecord {
  id?: number;
  fileName: string;
  fileHandle: FileSystemFileHandle;
  lastModified: Date;
  size: number;
  path?: string;
}

interface FileDB {
  getFileHandle(): Promise<FileHandleRecord | null>;
  saveFileHandle(record: FileHandleRecord): Promise<void>;
  clearFileHandle(): Promise<void>;
}

export const createFileDB = (): FileDB => {
  let db: IDBDatabase | null = null;

  const connect = async (): Promise<IDBDatabase> => {
    if (db) return db;

    return new Promise((res, rej) => {
      const request = indexedDB.open(
        FileDB.dbName,
        FileDB.dbVersion,
      );

      request.onupgradeneeded = () => {
        const db = request.result;

        if (
          !db.objectStoreNames.contains(FileDB.dbFileStore)
        ) {
          db.createObjectStore(FileDB.dbFileStore, {
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
    async getFileHandle() {
      return executeReadOperation(
        connect(),
        FileDB.dbFileStore,
        (store) => store.get(FileDB.fileKey),
      );
    },

    async saveFileHandle(record) {
      return executeWriteOperation(
        connect(),
        FileDB.dbFileStore,
        (store) => store.put(record, FileDB.fileKey)
      )
    },

    async clearFileHandle() { 
      return executeWriteOperation(
        connect(),
        FileDB.dbFileStore,
        (store) => store.delete(FileDB.fileKey)
      )
    },
  };
};
