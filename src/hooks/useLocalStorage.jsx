import { useState } from "react";

const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to get localStorage key: ${key}`, error);
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set localStorage key: ${key}`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
