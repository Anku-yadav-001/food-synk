"use client";
import AppShell from "@/components/AppShell";
import { State } from "@/components/ui";
import { getNotifications, markNotificationRead } from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function Notifications() {
  const { data, setData, loading, error, reload } = useApi(getNotifications);
  async function read(id: string) {
    await markNotificationRead(id);
    setData((d) => d && d.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }
  return (
    <AppShell title="Notifications" subtitle="Updates on your listings.">
      <State loading={loading} error={error} onRetry={reload} empty={data && !data.length ? "You're all caught up." : undefined} />
      <ul className="mx-auto max-w-3xl space-y-3">
        {data?.map((n) => (
          <li key={n.id}>
            <button onClick={() => !n.read && read(n.id)} className="card flex w-full items-start gap-3 rounded-2xl p-4 text-left">
              <i className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-primary"}`} />
              <span><b className="block text-ink">{n.title}</b><span className="text-sm text-ink-soft">{n.body}</span></span>
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
