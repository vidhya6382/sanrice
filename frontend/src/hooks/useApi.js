import { useEffect, useState } from "react";

/**
 * Runs an async loader and tracks { data, loading }.
 * `deps` re-runs the loader when they change (e.g. a brand filter).
 */
export default function useApi(loader, deps = [], initial = null) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loader().then((result) => {
      if (active) {
        setData(result);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading };
}
