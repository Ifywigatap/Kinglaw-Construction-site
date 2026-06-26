import { useState, useEffect, useRef } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setLoading(true);
    setError(null);

    fetch(url, { signal, ...(options || {}) })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText || "Fetch error");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => controllerRef.current?.abort();
  }, [url, options]);

  return { data, loading, error };
}
