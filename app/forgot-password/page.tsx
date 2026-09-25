"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { Button, ErrorText, Field } from "@/components/ui";
import { forgotPassword } from "@/lib/api";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [msg, setMsg] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(""); setMsg("");
    try { setMsg((await forgotPassword({ identifier })).message); } catch (err) { setError((err as Error).message); } finally { setLoading(false); }
  }
  return (
    <AuthLayout title="Reset password" subtitle="We'll send you a link to set a new one.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email address or mobile number" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        <ErrorText>{error}</ErrorText>
        {msg && <p role="status" className="rounded-xl bg-primary-soft px-3 py-2 text-sm text-primary-dark">{msg}</p>}
        <Button type="submit" loading={loading}>Send reset link</Button>
        <p className="text-center"><Link href="/login" className="text-primary underline underline-offset-4">Back to log in</Link></p>
      </form>
    </AuthLayout>
  );
}
