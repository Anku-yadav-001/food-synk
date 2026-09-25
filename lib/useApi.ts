"use client";
import { useCallback, useEffect, useState } from "react";

/** Loads data on mount / when deps change. `fn` may close over state (e.g. filters) – list them in deps. */
export function useApi<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(() => {
    setLoading(true);
    fn().then((d) => { setData(d); setError(null); }).catch((e: Error) => setError(e.message)).finally(() => setLoading(false));
  }, deps);
  useEffect(load, [load]);
  return { data, setData, error, loading, reload: load };
}
