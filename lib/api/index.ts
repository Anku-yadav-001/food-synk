/**
 * FoodSynk API layer. Every UI screen calls ONLY these functions.
 * To go live: set NEXT_PUBLIC_USE_MOCK=false and adjust the endpoints/payloads below to match your backend.
 * Each function documents: METHOD /endpoint  ->  request payload  ->  response type.
 */
import { USE_MOCK } from "../config";
import { request, tokenStore } from "./client";
import * as mock from "./mock";
import type * as T from "../types";

const run = <R>(real: () => Promise<R>, fake: () => Promise<R>) => (USE_MOCK ? fake() : real());
export { ApiError, tokenStore } from "./client";

/* ---------------- Auth ---------------- */
/** POST /auth/login  body: LoginPayload -> AuthResponse */
export async function login(p: T.LoginPayload) {
  const res = await run(() => request<T.AuthResponse>("POST", "/auth/login", { body: p }), () => mock.login(p));
  tokenStore.set(res.token, p.remember); return res;
}
/** POST /auth/register  body: SignupPayload -> AuthResponse */
export async function signup(p: T.SignupPayload) {
  const res = await run(() => request<T.AuthResponse>("POST", "/auth/register", { body: p }), () => mock.signup(p));
  tokenStore.set(res.token); return res;
}
/** POST /auth/google  body: { idToken } (token from Google Identity Services) -> AuthResponse */
export async function googleLogin(p: T.GoogleLoginPayload) {
  const res = await run(() => request<T.AuthResponse>("POST", "/auth/google", { body: p }), () => mock.googleLogin(p));
  tokenStore.set(res.token); return res;
}
/** POST /auth/forgot-password  body: ForgotPasswordPayload -> { message } */
export const forgotPassword = (p: T.ForgotPasswordPayload) =>
  run(() => request<{ message: string }>("POST", "/auth/forgot-password", { body: p }), () => mock.forgotPassword(p));
export const logout = () => tokenStore.clear(); // add POST /auth/logout here if your backend tracks sessions

/* ---------------- Profile ---------------- */
/** GET /users/me -> User */
export const getProfile = () => run(() => request<T.User>("GET", "/users/me"), mock.getProfile);
/** PATCH /users/me  body: UpdateProfilePayload -> User */
export const updateProfile = (p: T.UpdateProfilePayload) =>
  run(() => request<T.User>("PATCH", "/users/me", { body: p }), () => mock.updateProfile(p));

/* ---------------- Dashboard & Impact ---------------- */
/** GET /provider/dashboard -> DashboardResponse */
export const getDashboard = () => run(() => request<T.DashboardResponse>("GET", "/provider/dashboard"), mock.getDashboard);
/** GET /provider/impact -> ImpactResponse */
export const getImpact = () => run(() => request<T.ImpactResponse>("GET", "/provider/impact"), mock.getImpact);

/* ---------------- Listings ---------------- */
/** GET /listings?status=&page=&limit= -> Paginated<Listing> */
export const getListings = (q: T.ListingsQuery = {}) =>
  run(() => request<T.Paginated<T.Listing>>("GET", "/listings", { query: { ...q } }), () => mock.getListings(q));
/** POST /listings  body: CreateListingPayload -> Listing */
export const createListing = (p: T.CreateListingPayload) =>
  run(() => request<T.Listing>("POST", "/listings", { body: p }), () => mock.createListing(p));
/** PATCH /listings/:id  body: UpdateListingPayload -> Listing */
export const updateListing = (id: string, p: T.UpdateListingPayload) =>
  run(() => request<T.Listing>("PATCH", `/listings/${id}`, { body: p }), () => mock.updateListing(id, p));
/** DELETE /listings/:id -> 204 */
export const deleteListing = (id: string) => run(() => request<void>("DELETE", `/listings/${id}`), () => mock.deleteListing(id));

/* ---------------- Notifications & Guidelines ---------------- */
/** GET /notifications -> AppNotification[] */
export const getNotifications = () => run(() => request<T.AppNotification[]>("GET", "/notifications"), mock.getNotifications);
/** PATCH /notifications/:id/read -> 204 */
export const markNotificationRead = (id: string) =>
  run(() => request<void>("PATCH", `/notifications/${id}/read`), () => mock.markNotificationRead(id));
/** GET /guidelines -> GuidelineSection[] */
export const getGuidelines = () => run(() => request<T.GuidelineSection[]>("GET", "/guidelines"), mock.getGuidelines);
