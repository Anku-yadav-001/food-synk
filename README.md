# FoodSynk – Frontend (Next.js 14 + Tailwind)

Pure Next.js + Tailwind. Icons come from `lucide-react`, food imagery from `/public/images` via `next/image` (no inline SVG).

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Screens
`/` role select · `/login` · `/signup` · `/forgot-password` · `/home` dashboard · `/listings` (my listings) ·
`/listings/new` · `/impact` · `/guidelines` · `/profile` · `/notifications`

## Connecting your backend
All network calls live in **`lib/api/index.ts`** – screens never call `fetch` directly.
Each function has a comment with `METHOD /endpoint`, and its request/response types are in **`lib/types.ts`**.

1. In `.env.local` set `NEXT_PUBLIC_USE_MOCK=false` and `NEXT_PUBLIC_API_BASE_URL=https://your-api/v1`.
2. Adjust endpoint paths / payload fields in `lib/api/index.ts` and `lib/types.ts` if your backend differs.
3. Auth: the JWT is stored by `tokenStore` (`lib/api/client.ts`) and sent as `Authorization: Bearer <token>`.
   Errors are expected as `{ "message": "..." }`.

| Function | Endpoint | Payload / Response |
|---|---|---|
| `login` | POST /auth/login | `LoginPayload` → `AuthResponse` |
| `signup` | POST /auth/register | `SignupPayload` → `AuthResponse` |
| `googleLogin` | POST /auth/google | `{ idToken }` → `AuthResponse` |
| `forgotPassword` | POST /auth/forgot-password | `{ identifier }` → `{ message }` |
| `getProfile` / `updateProfile` | GET / PATCH /users/me | `UpdateProfilePayload` → `User` |
| `getDashboard` | GET /provider/dashboard | → `DashboardResponse` |
| `getImpact` | GET /provider/impact | → `ImpactResponse` |
| `getListings` | GET /listings?status&page&limit | → `Paginated<Listing>` |
| `createListing` | POST /listings | `CreateListingPayload` → `Listing` |
| `updateListing` / `deleteListing` | PATCH / DELETE /listings/:id | |
| `getNotifications` / `markNotificationRead` | GET /notifications · PATCH /notifications/:id/read | |
| `getGuidelines` | GET /guidelines | → `GuidelineSection[]` |

Mock data (used while `NEXT_PUBLIC_USE_MOCK=true`) is in `lib/api/mock.ts`. In mock mode, any password with 6+ characters logs in.

## Images
Replace files in `public/images/` (`bowl.png`, `basket.png`, `roti.jpg`, `google.png`) with your own assets using the same names.
Theme colors and fonts: `tailwind.config.ts` (Fresh harvest palette — green `primary`, orange `accent`, light `canvas`/`surface`), `app/globals.css`.
Brand logo: `public/images/logo-icon.png` (mark) — swap it for your own file of the same name to rebrand.
