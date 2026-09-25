"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { Basket, Leaf, Logo } from "@/components/Art";
import Image from "next/image";
import Shell from "@/components/Shell";
import { googleLogin, login } from "@/lib/api";

export default function RecipientLogin() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function go(fn: () => Promise<unknown>) {
    setLoading(true); setError("");
    try { await fn(); router.push("/home"); } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  }
  // POST /auth/login  { identifier, password, remember }
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); go(() => login({ identifier: id, password: pw, remember })); };
  // POST /auth/google { idToken } – replace the placeholder with the token from Google Identity Services
  const onGoogle = () => go(() => googleLogin({ idToken: "TODO_GOOGLE_ID_TOKEN" }));

  return (
    <Shell>
      <Leaf className="absolute -left-3 top-6 h-24 w-24 -rotate-12" />
      <Leaf className="absolute -right-2 top-40 h-28 w-28 rotate-45" />

      <div className="mx-auto grid w-full max-w-6xl flex-1 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
      <aside className="hidden flex-col items-center gap-8 text-center lg:flex">
        <Logo variant="login" />
        <Basket className="w-80" />
        <p className="max-w-xs text-lg text-ink-soft">Good food, less waste, a brighter tomorrow.</p>
      </aside>
      <div className="relative flex flex-col items-center px-6 pb-6 pt-12 lg:my-10 lg:rounded-[2rem] lg:border lg:border-line lg:bg-surface lg:py-12">
        <div className="lg:hidden"><Logo variant="login" /></div>

        <div className="mt-8 grid h-24 w-24 lg:mt-0 place-items-center rounded-full bg-primary-soft text-primary">
          <Icon name="handheart" className="h-14 w-14" />
        </div>

        <h1 className="mt-4 text-center font-serif text-4xl font-bold text-primary sm:text-5xl">Recipient Login</h1>
        <p className="mt-3 max-w-[15rem] text-center text-lg leading-snug text-ink">Access free, fresh food from your community.</p>

        <form className="mt-8 w-full max-w-sm space-y-4" onSubmit={onSubmit}>
          <label className="pill-input">
            <Icon name="mail" className="h-6 w-6 shrink-0" />
            <input value={id} onChange={(e) => setId(e.target.value)} type="text" autoComplete="username" required
              placeholder="Email address or mobile number" className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/70" />
          </label>
          <label className="pill-input">
            <Icon name="lock" className="h-6 w-6 shrink-0" />
            <input value={pw} onChange={(e) => setPw(e.target.value)} type={show ? "text" : "password"} autoComplete="current-password" required
              placeholder="Password" className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/70" />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
              <Icon name={show ? "eyeoff" : "eye"} className="h-6 w-6" />
            </button>
          </label>

          <div className="flex items-center justify-between px-1 text-sm">
            <label className="flex cursor-pointer items-center gap-3 text-ink">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="peer sr-only" />
              <span className="grid h-6 w-6 place-items-center rounded-md border border-line text-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                {remember && <Icon name="check" className="h-4 w-4" />}
              </span>
              Remember me
            </label>
            <Link href="/forgot-password" className="text-primary underline underline-offset-4">Forgot password?</Link>
          </div>

          {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-xl font-semibold text-white shadow-md shadow-primary/25 hover:bg-primary-dark active:scale-[0.99]">
            Log In <Icon name="arrow" className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 text-ink-soft"><span className="h-px flex-1 bg-line" />OR<span className="h-px flex-1 bg-line" /></div>

          <button type="button" onClick={onGoogle} disabled={loading} className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-line bg-surface text-lg font-medium text-ink shadow-sm">
            <Image src="/images/google.png" alt="" width={24} height={24} className="h-6 w-6" />
            Continue with Google
          </button>

          <p className="pt-2 text-center text-ink">Don&apos;t have an account? <Link href="/signup" className="text-primary underline underline-offset-4">Sign Up</Link></p>
        </form>
        <Basket className="mt-8 w-40 self-start sm:w-48 lg:hidden" />
      </div>
      </div>
    </Shell>
  );
}
