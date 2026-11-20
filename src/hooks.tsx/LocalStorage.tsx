import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const savedData = localStorage.getItem(key);

    if (savedData !== null) {
      try {
        return JSON.parse(savedData) as T;
      } catch {
        return initialValue;
      }
    }

    return initialValue;
  });

  // SET: Save data whenever value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
