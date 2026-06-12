import { useState, useEffect } from 'react';

export function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Start false until executed
  const [error, setError] = useState(null);

  // A plain, normal async function. No hooks wrapped around it.
  const execute = async (...args) => {
    setLoading(true);
    try {
      const res = await apiFunc(...args);
      setData(res);
      setError(null);
      return res;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}
