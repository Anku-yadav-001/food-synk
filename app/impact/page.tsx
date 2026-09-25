"use client";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { State } from "@/components/ui";
import { getImpact } from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function Impact() {
  const { data, loading, error, reload } = useApi(getImpact);
  const max = Math.max(1, ...(data?.monthly.map((m) => m.kg) ?? []));
  const cards = data && [
    { icon: "leaf", value: `${data.foodSavedKg} kg`, label: "Food saved" }, { icon: "users", value: data.peopleHelped, label: "People helped" },
    { icon: "utensils", value: data.mealsShared, label: "Meals shared" }, { icon: "chart", value: `${data.co2SavedKg} kg`, label: "CO₂ avoided" },
  ];
  return (
    <AppShell title="Your impact" subtitle="See the difference your food makes.">
      <State loading={loading} error={error} onRetry={reload} />
      {data && (
        <div className="space-y-6">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cards!.map((c) => (
              <li key={c.label} className="card flex flex-col items-center gap-1 rounded-3xl py-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary"><Icon name={c.icon} className="h-6 w-6" /></span>
                <b className="text-2xl text-ink">{c.value}</b><span className="text-sm text-ink-soft">{c.label}</span>
              </li>
            ))}
          </ul>
          <section className="card rounded-3xl p-5">
            <h2 className="text-lg font-medium text-ink">Food saved per month (kg)</h2>
            <ul className="mt-6 flex h-52 items-end gap-3 sm:gap-6">
              {data.monthly.map((m) => (
                <li key={m.month} className="flex h-full flex-1 flex-col justify-end text-center">
                  <span className="text-xs text-ink-soft">{m.kg}</span>
                  <div className="mx-auto mt-1 w-full max-w-12 rounded-t-lg bg-primary" style={{ height: `${(m.kg / max) * 80}%` }} />
                  <span className="mt-2 text-xs text-ink-soft">{m.month}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </AppShell>
  );
}
