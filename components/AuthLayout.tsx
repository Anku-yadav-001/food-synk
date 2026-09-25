import { Logo } from "./Art";
import Shell from "./Shell";

export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-10">
        <Logo variant="login" />
        <h1 className="mt-8 text-center font-serif text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-center text-lg text-ink">{subtitle}</p>
        <div className="mt-8 rounded-[2rem] border border-line bg-surface p-5 sm:p-8">{children}</div>
      </div>
    </Shell>
  );
}
