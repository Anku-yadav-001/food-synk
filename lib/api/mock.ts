import { ApiError } from "./client";
import type * as T from "../types";

const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));
const at = (dayOffset: number, h: number) => { const d = new Date(); d.setDate(d.getDate() + dayOffset); d.setHours(h, 0, 0, 0); return d.toISOString(); };

const db = {
  user: { id: "u1", name: "Krish Yadav", email: "krish@gmail.com", phone: "+91 98765 43210", role: "provider", address: "Indiranagar, Bengaluru" } as T.User,
  listings: [
    { id: "l1", title: "Vegetable Rice Bowl", description: "Freshly prepared, 5 portions available.", portions: 5, category: "vegetarian", status: "available", pickupTime: at(0, 14), address: "12 MG Road", distanceKm: 2.3, createdAt: at(0, 9) },
    { id: "l2", title: "Homemade Rotis", description: "Fresh and soft, 10 portions available.", portions: 10, category: "vegetarian", status: "available", pickupTime: at(0, 16), address: "45 Church Street", distanceKm: 3.1, createdAt: at(0, 8) },
    { id: "l3", title: "Dal Tadka & Jeera Rice", description: "Home-cooked, 4 portions.", portions: 4, category: "vegetarian", status: "reserved", pickupTime: at(1, 13), address: "8 Koramangala", distanceKm: 4.0, createdAt: at(-1, 18) },
    { id: "l4", title: "Chicken Biryani", description: "Party leftovers, 8 portions.", portions: 8, category: "non-vegetarian", status: "completed", pickupTime: at(-2, 20), address: "22 HSR Layout", distanceKm: 5.2, createdAt: at(-2, 12) },
  ] as T.Listing[],
  notifications: [
    { id: "n1", title: "Pickup confirmed", body: "Asha reserved 'Dal Tadka & Jeera Rice'.", read: false, createdAt: at(0, 10) },
    { id: "n2", title: "Listing completed", body: "'Chicken Biryani' was collected. 8 people helped.", read: true, createdAt: at(-2, 21) },
  ] as T.AppNotification[],
  guidelines: [
    { id: "g1", title: "Food safety", items: ["Share only food prepared and stored hygienically.", "Keep hot food hot and cold food cold until pickup.", "Mention allergens such as nuts, dairy and gluten."] },
    { id: "g2", title: "Listing tips", items: ["Add a clear title and accurate portion count.", "Set a realistic pickup window.", "Update the listing if the food is no longer available."] },
    { id: "g3", title: "Pickup etiquette", items: ["Meet in a public, well-lit place where possible.", "Be on time and communicate delays.", "Be kind and respectful to every recipient."] },
  ] as T.GuidelineSection[],
};

export async function login(p: T.LoginPayload): Promise<T.AuthResponse> {
  await wait(); if (p.password.length < 6) throw new ApiError(401, "Invalid email/mobile or password (mock: use 6+ chars).");
  return { token: "mock-token", user: db.user };
}
export async function signup(p: T.SignupPayload): Promise<T.AuthResponse> { await wait(); db.user = { ...db.user, name: p.name, role: p.role }; return { token: "mock-token", user: db.user }; }
export async function forgotPassword(_p: T.ForgotPasswordPayload) { await wait(); return { message: "Reset link sent." }; }
export async function googleLogin(_p: T.GoogleLoginPayload): Promise<T.AuthResponse> { await wait(); return { token: "mock-token", user: db.user }; }
export async function getProfile() { await wait(150); return db.user; }
export async function updateProfile(p: T.UpdateProfilePayload) { await wait(); db.user = { ...db.user, ...p }; return db.user; }
export async function getDashboard(): Promise<T.DashboardResponse> {
  await wait(200);
  return { user: { id: db.user.id, name: db.user.name }, stats: { totalListings: 12, foodSavedKg: 48.5, peopleHelped: 32 }, recentListings: db.listings.slice(0, 2) };
}
export async function getListings(q: T.ListingsQuery): Promise<T.Paginated<T.Listing>> {
  await wait(200); const items = db.listings.filter((l) => !q.status || l.status === q.status);
  return { items, total: items.length, page: q.page ?? 1, limit: q.limit ?? 20 };
}
export async function createListing(p: T.CreateListingPayload): Promise<T.Listing> {
  await wait(); const l: T.Listing = { ...p, id: `l${Date.now()}`, status: "available", distanceKm: 1.2, createdAt: new Date().toISOString() };
  db.listings.unshift(l); return l;
}
export async function updateListing(id: string, p: T.UpdateListingPayload) {
  await wait(); const i = db.listings.findIndex((l) => l.id === id); if (i < 0) throw new ApiError(404, "Listing not found");
  db.listings[i] = { ...db.listings[i], ...p }; return db.listings[i];
}
export async function deleteListing(id: string) { await wait(200); db.listings = db.listings.filter((l) => l.id !== id); }
export async function getImpact(): Promise<T.ImpactResponse> {
  await wait(200);
  return { totalListings: 12, foodSavedKg: 48.5, peopleHelped: 32, mealsShared: 96, co2SavedKg: 121, monthly: [["Apr", 4], ["May", 7], ["Jun", 6], ["Jul", 9], ["Aug", 11], ["Sep", 11.5]].map(([month, kg]) => ({ month: month as string, kg: kg as number })) };
}
export async function getNotifications() { await wait(150); return db.notifications; }
export async function markNotificationRead(id: string) { await wait(100); db.notifications = db.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)); }
export async function getGuidelines() { await wait(150); return db.guidelines; }
