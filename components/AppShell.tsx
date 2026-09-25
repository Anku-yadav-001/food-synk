import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import Shell from "./Shell";

/** Standard inner page: header + title + content + mobile bottom nav. */
export default function AppShell({ title, subtitle, active, children }: { title: string; subtitle?: string; active?: string; children: React.ReactNode }) {
  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <AppHeader active={active} />
        <div className="mt-6 lg:mt-10">
          <h1 className="text-3xl font-bold text-ink lg:text-4xl">{title}</h1>
          {subtitle && <p className="mt-1 text-ink-soft lg:text-lg">{subtitle}</p>}
        </div>
        <div className="mt-6">{children}</div>
      </div>
      <BottomNav active={active} />
    </Shell>
  );
}
