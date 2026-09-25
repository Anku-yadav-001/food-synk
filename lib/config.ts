// Set NEXT_PUBLIC_USE_MOCK=false and NEXT_PUBLIC_API_BASE_URL in .env.local to hit a real backend.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
