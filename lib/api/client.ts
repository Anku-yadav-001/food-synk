import { API_BASE_URL } from "../config";

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

const KEY = "foodsynk_token";
export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY)),
  set: (t: string, persist = true) => (persist ? localStorage : sessionStorage).setItem(KEY, t),
  clear: () => { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); },
};

type Opts = { body?: unknown; query?: Record<string, string | number | undefined> };

/** Single place to change base URL, auth header, error shape. Expects errors as { message: string }. */
export async function request<T>(method: string, path: string, { body, query }: Opts = {}): Promise<T> {
  const qs = query ? new URLSearchParams(Object.entries(query).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])).toString() : "";
  const token = tokenStore.get();
  const res = await fetch(`${API_BASE_URL}${path}${qs ? `?${qs}` : ""}`, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(res.status, err.message ?? res.statusText);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}
