"use client";
import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import ListingCard from "@/components/ListingCard";
import { State } from "@/components/ui";
import { deleteListing, getListings } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import type { ListingStatus } from "@/lib/types";

const TABS: { label: string; value?: ListingStatus }[] = [{ label: "All" }, { label: "Available", value: "available" }, { label: "Reserved", value: "reserved" }, { label: "Completed", value: "completed" }];

export default function MyListings() {
  const [status, setStatus] = useState<ListingStatus | undefined>();
  const { data, loading, error, reload } = useApi(() => getListings({ status }), [status]);

  async function remove(id: string) { if (confirm("Remove this listing?")) { await deleteListing(id); reload(); } }

  return (
    <AppShell title="My listings" subtitle="Manage the food you've shared." active="My Listings">
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button key={t.label} onClick={() => setStatus(t.value)} aria-pressed={status === t.value}
            className={`rounded-full border px-4 py-1.5 text-sm ${status === t.value ? "border-primary bg-primary text-white" : "border-line bg-surface text-ink"}`}>{t.label}</button>
        ))}
        <Link href="/listings/new" className="ml-auto rounded-full bg-primary px-4 py-1.5 text-sm text-white">+ Add listing</Link>
      </div>
      <State loading={loading} error={error} onRetry={reload} empty={data && !data.items.length ? "No listings yet. Add your first one." : undefined} />
      <ul className="mt-4 grid gap-3 lg:grid-cols-2">
        {data?.items.map((l) => <li key={l.id}><ListingCard listing={l} onDelete={remove} /></li>)}
      </ul>
    </AppShell>
  );
}
