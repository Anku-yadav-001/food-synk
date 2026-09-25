"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { Button, ErrorText, Field, State } from "@/components/ui";
import { getProfile, logout, updateProfile } from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function Profile() {
  const router = useRouter();
  const { data, loading, error, reload } = useApi(getProfile);
  const [f, setF] = useState({ name: "", email: "", phone: "", address: "" });
  const [saving, setSaving] = useState(false); const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  useEffect(() => { if (data) setF({ name: data.name, email: data.email ?? "", phone: data.phone ?? "", address: data.address ?? "" }); }, [data]);

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setMsg(""); setErr("");
    try { await updateProfile(f); setMsg("Profile saved."); } catch (x) { setErr((x as Error).message); } finally { setSaving(false); } // PATCH /users/me
  }
  const on = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <AppShell title="Profile" subtitle="Keep your details up to date." active="Profile">
      <State loading={loading} error={error} onRetry={reload} />
      {data && (
        <form onSubmit={save} className="card mx-auto max-w-2xl space-y-4 rounded-3xl p-5 sm:p-8">
          <Field label="Full name" required value={f.name} onChange={on("name")} />
          <Field label="Email" type="email" value={f.email} onChange={on("email")} />
          <Field label="Mobile number" type="tel" value={f.phone} onChange={on("phone")} />
          <Field label="Address" value={f.address} onChange={on("address")} />
          <ErrorText>{err}</ErrorText>
          {msg && <p role="status" className="text-sm text-primary">{msg}</p>}
          <Button type="submit" loading={saving}>Save changes</Button>
          <button type="button" onClick={() => { logout(); router.push("/"); }} className="w-full py-2 text-center text-primary underline">Log out</button>
        </form>
      )}
    </AppShell>
  );
}
