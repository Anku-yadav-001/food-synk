import Link from "next/link";
import Icon from "./Icon";
import { Logo } from "./Art";
import { NAV } from "./BottomNav";

export default function AppHeader({ active }: { active?: string }) {
  return (
    <header className="flex items-center justify-between gap-4 pt-6 lg:pt-8">
      <Link href="/home" aria-label="FoodSynk home"><Logo /></Link>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
        {NAV.map((n) => (
          <Link key={n.label} href={n.href} className={`text-base ${n.label === active ? "border-b-2 border-primary pb-1 text-primary" : "text-ink-soft hover:text-primary"}`}>{n.label}</Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/notifications" aria-label="Notifications" className="relative text-ink"><Icon name="bell" className="h-7 w-7" /><i className="absolute -right-0.5 top-0 h-2.5 w-2.5 rounded-full bg-accent" /></Link>
        <Link href="/profile" aria-label="Profile" className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white"><Icon name="user" className="h-6 w-6" filled /></Link>
      </div>
    </header>
  );
}
