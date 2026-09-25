"use client";
import AppShell from "@/components/AppShell";
import { State } from "@/components/ui";
import { getGuidelines } from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function Guidelines() {
  const { data, loading, error, reload } = useApi(getGuidelines);
  return (
    <AppShell title="Guidelines" subtitle="Share safely and help your community.">
      <State loading={loading} error={error} onRetry={reload} />
      <div className="mx-auto max-w-3xl space-y-3">
        {data?.map((s, i) => (
          <details key={s.id} open={i === 0} className="card rounded-2xl p-4">
            <summary className="cursor-pointer text-lg font-medium text-primary">{s.title}</summary>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-soft">{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </details>
        ))}
      </div>
    </AppShell>
  );
}
