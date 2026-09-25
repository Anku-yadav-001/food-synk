/* eslint-disable @next/next/no-img-element */
import Icon from "./Icon";
import { Bowl, Roti } from "./Art";
import { formatPickup } from "@/lib/format";
import type { Listing } from "@/lib/types";

const CAT = { vegetarian: "Vegetarian", "non-vegetarian": "Non-veg", vegan: "Vegan" };

export default function ListingCard({ listing: l, onDelete }: { listing: Listing; onDelete?: (id: string) => void }) {
  const ready = l.status === "available";
  return (
    <div className="card flex items-center gap-3 rounded-2xl p-2.5">
      <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary-soft">
        <span className={`absolute left-0 top-0 rounded-br-lg px-2 py-0.5 text-xs capitalize ${ready ? "bg-primary text-white" : "bg-accent text-ink"}`}>{l.status}</span>
        {l.imageUrl ? <img src={l.imageUrl} alt={l.title} className="h-full w-full object-cover" /> : /roti/i.test(l.title) ? <Roti className="h-full w-full" /> : <Bowl className="h-20 w-20" />}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-ink">{l.title}</h3>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-ink-soft">
          {l.distanceKm !== undefined && <span className="flex items-center gap-1"><Icon name="pin" className="h-4 w-4 text-primary" />{l.distanceKm} km away</span>}
          <span className="flex items-center gap-1"><Icon name="clock" className="h-4 w-4 text-primary" />{formatPickup(l.pickupTime)}</span>
        </p>
        <p className="mt-1 text-sm leading-snug text-ink-soft">{l.description}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-primary-dark">{CAT[l.category]}</span>
          {ready && <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-accent-deep">Ready to Pickup</span>}
          {onDelete && <button onClick={() => onDelete(l.id)} className="ml-auto text-primary underline">Remove</button>}
        </div>
      </div>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon name="chevron" className="h-5 w-5" /></span>
    </div>
  );
}
