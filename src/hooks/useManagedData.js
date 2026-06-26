import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kinglaw-admin-data';

/**
 * A hook to manage a specific category of data, syncing with localStorage.
 * @param {string} category The category key (e.g., 'materials', 'rentals').
 * @param {Array<any>} initialData The default static data to use if nothing is in localStorage.
 * @returns {{data: Array<any>, setData: (newData: Array<any>) => void}}
 */
export default function useManagedData(category, initialData) {
  const [data, setData] = useState(() => {
    try {
      const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return allData[category] || initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allData[category] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  }, [data, category]);

  return { data, setData };
}