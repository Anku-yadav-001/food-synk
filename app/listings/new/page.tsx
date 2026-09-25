"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { Button, ErrorText, Field, Select, TextArea } from "@/components/ui";
import { createListing } from "@/lib/api";
import type { FoodCategory } from "@/lib/types";

export default function AddListing() {
  const router = useRouter();
  const [f, setF] = useState({ title: "", description: "", portions: 1, category: "vegetarian" as FoodCategory, pickupTime: "", address: "" });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      // Payload sent to POST /listings (CreateListingPayload)
      await createListing({ ...f, portions: Number(f.portions), pickupTime: new Date(f.pickupTime).toISOString() });
      router.push("/listings");
    } catch (err) { setError((err as Error).message); } finally { setLoading(false); }
  }
  return (
    <AppShell title="Add surplus food" subtitle="Share extra food with your community." active="Add">
      <form onSubmit={onSubmit} className="card mx-auto max-w-2xl space-y-4 rounded-3xl p-5 sm:p-8">
        <Field label="Title" required placeholder="e.g. Vegetable rice bowl" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        <TextArea label="Description" required placeholder="What is it, how was it stored, any allergens?" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Portions" type="number" min={1} required value={f.portions} onChange={(e) => setF({ ...f, portions: Number(e.target.value) })} />
          <Select label="Category" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value as FoodCategory })}>
            <option value="vegetarian">Vegetarian</option><option value="non-vegetarian">Non-vegetarian</option><option value="vegan">Vegan</option>
          </Select>
        </div>
        <Field label="Pickup date & time" type="datetime-local" required value={f.pickupTime} onChange={(e) => setF({ ...f, pickupTime: e.target.value })} />
        <Field label="Pickup address" required value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} autoComplete="street-address" />
        <ErrorText>{error}</ErrorText>
        <Button type="submit" loading={loading}>Publish listing</Button>
      </form>
    </AppShell>
  );
}
