import Link from "next/link";
import Icon from "./Icon";

export const NAV = [
  { label: "Home", icon: "home", href: "/home" },
  { label: "Add", icon: "plus", href: "/listings/new" },
  { label: "My Listings", icon: "list", href: "/listings" },
  { label: "Profile", icon: "user", href: "/profile" },
];

export default function BottomNav({ active }: { active?: string }) {
  return (
    <nav className="sticky bottom-0 z-10 mt-auto border-t border-line bg-surface/95 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      <ul className="grid grid-cols-4">
        {NAV.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs ${active === i.label ? "text-primary" : "text-ink-soft"}`}>
              <Icon name={i.icon} className="h-7 w-7" filled={active === i.label && i.icon === "home"} />
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
