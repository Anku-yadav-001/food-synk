export type Role = "provider" | "recipient";
export type FoodCategory = "vegetarian" | "non-vegetarian" | "vegan";
export type ListingStatus = "available" | "reserved" | "completed" | "expired";

export interface User { id: string; name: string; email?: string; phone?: string; role: Role; address?: string; avatarUrl?: string }

/* ---------- Auth ---------- */
export interface LoginPayload { identifier: string; password: string; remember: boolean }   // identifier = email or mobile
export interface SignupPayload { name: string; identifier: string; password: string; role: Role }
export interface ForgotPasswordPayload { identifier: string }
export interface GoogleLoginPayload { idToken: string }
export interface AuthResponse { token: string; user: User }

/* ---------- Listings ---------- */
export interface Listing {
  id: string; title: string; description: string; portions: number; category: FoodCategory;
  status: ListingStatus; pickupTime: string /* ISO 8601 */; address: string;
  distanceKm?: number; imageUrl?: string; createdAt: string;
}
export interface CreateListingPayload {
  title: string; description: string; portions: number; category: FoodCategory;
  pickupTime: string /* ISO 8601 */; address: string; imageUrl?: string;
}
export type UpdateListingPayload = Partial<CreateListingPayload & { status: ListingStatus }>;
export interface ListingsQuery { status?: ListingStatus; page?: number; limit?: number }
export interface Paginated<T> { items: T[]; total: number; page: number; limit: number }

/* ---------- Dashboard / Impact ---------- */
export interface DashboardResponse {
  user: Pick<User, "id" | "name">;
  stats: { totalListings: number; foodSavedKg: number; peopleHelped: number };
  recentListings: Listing[];
}
export interface ImpactResponse {
  totalListings: number; foodSavedKg: number; peopleHelped: number; mealsShared: number; co2SavedKg: number;
  monthly: { month: string; kg: number }[];
}

/* ---------- Misc ---------- */
export interface AppNotification { id: string; title: string; body: string; read: boolean; createdAt: string }
export interface GuidelineSection { id: string; title: string; items: string[] }
export type UpdateProfilePayload = Partial<Pick<User, "name" | "email" | "phone" | "address">>;
