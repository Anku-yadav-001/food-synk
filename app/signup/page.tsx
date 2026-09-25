"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import { Button, ErrorText, Field } from "@/components/ui";
import { signup } from "@/lib/api";
import type { Role, SignupPayload } from "@/lib/types";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState<SignupPayload>({ name: "", identifier: "", password: "", role: "recipient" });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const set = (k: keyof SignupPayload) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try { await signup(form); router.push("/home"); } catch (err) { setError((err as Error).message); } finally { setLoading(false); }
  }
  return (
    <AuthLayout title="Create account" subtitle="Join your community and cut food waste.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="I am a">
          {(["recipient", "provider"] as Role[]).map((r) => (
            <button type="button" key={r} role="radio" aria-checked={form.role === r} onClick={() => setForm({ ...form, role: r })}
              className={`rounded-full border py-2.5 text-sm font-medium ${form.role === r ? "border-primary bg-primary text-white" : "border-line bg-surface text-ink"}`}>
              {r === "provider" ? "Food provider" : "Recipient"}
            </button>
          ))}
        </div>
        <Field label="Full name" required value={form.name} onChange={set("name")} autoComplete="name" />
        <Field label="Email address or mobile number" required value={form.identifier} onChange={set("identifier")} autoComplete="username" />
        <Field label="Password" type="password" required minLength={6} value={form.password} onChange={set("password")} autoComplete="new-password" />
        <ErrorText>{error}</ErrorText>
        <Button type="submit" loading={loading}>Sign up</Button>
        <p className="text-center text-ink">Already have an account? <Link href="/login" className="text-primary underline underline-offset-4">Log in</Link></p>
      </form>
    </AuthLayout>
  );
}
