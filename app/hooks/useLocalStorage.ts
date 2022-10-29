import { useCallback, useState } from 'react';

type StorageError = unknown;
type ValueOrUpdater<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, ValueOrUpdater<T>, StorageError] {
  const [storageError, setStorageError] = useState<StorageError>();
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setStorageError(error);
      return initialValue;
    }
  });

  const setValue: typeof setStoredValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : prev;

        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(newValue));
          }
        } catch (error) {
          setStorageError(error);
        }

        return newValue;
      });
    },
    [key],
  );

  return [storedValue, setValue, storageError];
}
