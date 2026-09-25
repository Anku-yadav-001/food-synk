import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const inputCls = "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/70 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";

function Wrap({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>{children}</label>;
}
export function Field({ label, ...p }: InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <Wrap label={label}><input {...p} className={inputCls} /></Wrap>; }
export function TextArea({ label, ...p }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) { return <Wrap label={label}><textarea rows={3} {...p} className={inputCls} /></Wrap>; }
export function Select({ label, children, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) { return <Wrap label={label}><select {...p} className={`${inputCls} [&>option]:text-ink`}>{children}</select></Wrap>; }

export function Button({ children, loading, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button {...p} disabled={loading || p.disabled}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-lg font-semibold text-white shadow-md shadow-primary/25 hover:bg-primary-dark active:scale-[0.99] disabled:opacity-60">
      {loading ? "Please wait…" : children}
    </button>
  );
}
export const ErrorText = ({ children }: { children?: ReactNode }) => (children ? <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{children}</p> : null);

/** Renders loading / error states for useApi results. */
export function State({ loading, error, onRetry, empty }: { loading: boolean; error: string | null; onRetry?: () => void; empty?: string }) {
  if (loading) return <p className="py-8 text-center text-ink-soft">Loading…</p>;
  if (error) return <div className="py-8 text-center"><p className="text-red-700">{error}</p>{onRetry && <button onClick={onRetry} className="mt-2 text-primary underline">Try again</button>}</div>;
  return empty ? <p className="py-8 text-center text-ink-soft">{empty}</p> : null;
}
