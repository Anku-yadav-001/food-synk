"use client";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Bowl } from "@/components/Art";
import AppHeader from "@/components/AppHeader";
import ListingCard from "@/components/ListingCard";
import { getDashboard } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import BottomNav from "@/components/BottomNav";
import Shell from "@/components/Shell";

const STATS = [
  { icon: "utensils", key: "totalListings", label: "Food Listings", bg: "bg-primary-soft text-primary" },
  { icon: "leaf", key: "foodSavedKg", label: "Food Saved", bg: "bg-accent-soft text-accent-deep" },
  { icon: "users", key: "peopleHelped", label: "People Helped", bg: "bg-primary-soft text-primary" },
];
const ACTIONS = [
  { icon: "plus", href: "/listings/new", title: "Add Listing", sub: "Share surplus food", bg: "bg-primary-soft text-primary" },
  { icon: "clipboard", href: "/listings", title: "My Listings", sub: "Manage your posts", bg: "bg-accent-soft text-accent-deep" },
  { icon: "chart", href: "/impact", title: "Impact", sub: "Track your impact", bg: "bg-primary-soft text-primary" },
  { icon: "info", href: "/guidelines", title: "Guidelines", sub: "Learn & support", bg: "bg-primary-soft text-primary" },
];

export default function ProviderHome() {
  const { data, error } = useApi(getDashboard); // GET /provider/dashboard
  const stats = data?.stats as Record<string, number> | undefined;
  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <AppHeader active="Home" />

        <section className="mt-6 flex items-center justify-between gap-4 lg:mt-10">
          <div className="min-w-0">
            <p className="text-lg text-ink lg:text-xl">Hello,</p>
            <h1 className="text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">{data?.user.name ?? "\u00a0"}</h1>
            <p className="mt-3 text-lg font-medium text-ink lg:text-2xl">Your food makes a difference!</p>
            <p className="mt-1 max-w-xs text-base leading-snug text-ink-soft lg:max-w-md lg:text-lg">Help reduce food waste and support your community.</p>
          </div>
          <div className="flex shrink-0 flex-col items-center">
            <p className="-rotate-6 text-center font-hand text-lg leading-5 text-accent-deep lg:text-2xl lg:leading-6">Good food<br />finds its way ♡</p>
            <Bowl className="h-32 w-32 drop-shadow-xl sm:h-44 sm:w-44 lg:h-60 lg:w-60" />
          </div>
        </section>

        <section className="card mt-6 grid grid-cols-3 divide-x divide-line rounded-3xl py-4 lg:py-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-1">
              <span className={`grid h-12 w-12 place-items-center rounded-full text-ink lg:h-14 lg:w-14 ${s.bg}`}><Icon name={s.icon} className="h-6 w-6 lg:h-7 lg:w-7" /></span>
              <b className="text-xl font-semibold text-ink lg:text-2xl">{stats ? (s.key === "foodSavedKg" ? `${stats[s.key]} kg` : stats[s.key]) : "–"}</b>
              <span className="text-center text-xs text-ink-soft sm:text-sm">{s.label}</span>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="space-y-6">
            <Link href="/listings/new" className="card flex items-center gap-4 rounded-3xl p-4 transition hover:border-primary/40 hover:shadow-md">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Icon name="cloche" className="h-9 w-9" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-semibold text-ink">Add Surplus Food</span>
                <span className="block text-sm leading-snug text-ink-soft">Share extra food with your community and reduce waste.</span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white"><Icon name="arrow" className="h-5 w-5" /></span>
            </Link>

            <section>
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-3 text-xl font-medium text-ink"><span className="h-px w-5 bg-primary" />Quick Actions</h2>
                <Link href="/impact" className="flex items-center gap-1 text-sm text-primary">See all <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ACTIONS.map((a) => (
                  <li key={a.title}>
                    <Link href={a.href} className="card flex h-full flex-col items-center gap-1 rounded-2xl px-2 py-4 text-center transition hover:border-primary/40 hover:shadow-md">
                      <span className={`grid h-12 w-12 place-items-center rounded-full ${a.bg}`}><Icon name={a.icon} className="h-6 w-6" /></span>
                      <b className="whitespace-nowrap text-sm font-medium text-ink">{a.title}</b>
                      <span className="text-xs leading-tight text-ink-soft">{a.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-ink">Recent Listings</h2>
              <Link href="/listings" className="flex items-center gap-1 text-sm text-primary">View all <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            {error && <p role="alert" className="mt-3 text-red-700">{error}</p>}
            <ul className="mt-3 space-y-3">
              {data?.recentListings.map((l) => <li key={l.id}><ListingCard listing={l} /></li>)}
            </ul>
          </section>
        </div>
      </div>
      <BottomNav active="Home" />
    </Shell>
  );
}
