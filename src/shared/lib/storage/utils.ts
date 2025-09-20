export const executeWriteOperation = async (
  connection: Promise<IDBDatabase>,
  storeName: string,
  operation: (store: IDBObjectStore) => void,
): Promise<void> => {
  const db = await connection;
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, "readwrite");
    operation(tx.objectStore(storeName));
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
};

export const executeReadOperation = async <T>(
  connection: Promise<IDBDatabase>,
  storeName: string,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> => {
  const db = await connection;
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, "readonly");
    const request = operation(tx.objectStore(storeName));
    request.onsuccess = () => res(request.result);
    request.onerror = () => rej(request.error);
  });
};

export const clearStore = async (
  connection: Promise<IDBDatabase>,
  storeName: string,
): Promise<void> => {
  return executeWriteOperation(connection, storeName, (store) => {
    store.clear();
  });
};
