import Image from "next/image";
import { Salad } from "lucide-react";

// Image files live in /public/images – replace them with your own assets (same names) any time.

/** Bowl badge: pure Tailwind + lucide, no photo asset. Pass a square className (e.g. h-36 w-36). */
export function Bowl({ className = "" }: { className?: string }) {
  return (
    <span className={`relative grid place-items-center rounded-full bg-surface shadow-md shadow-black/10 ring-1 ring-line ${className}`} aria-hidden="true">
      <span className="absolute inset-[14%] rounded-full bg-primary-soft" />
      <Salad className="relative h-[46%] w-[46%] text-primary" strokeWidth={1.5} />
      <span className="absolute right-[16%] top-[20%] h-[10%] w-[10%] rounded-full bg-accent" />
      <span className="absolute left-[20%] top-[26%] h-[7%] w-[7%] rounded-full bg-accent-deep" />
      <span className="absolute bottom-[18%] left-[30%] h-[8%] w-[8%] rounded-full bg-primary-dark" />
    </span>
  );
}
export function Roti({ className = "" }: { className?: string }) {
  return <Image src="/images/roti.jpg" alt="" width={153} height={64} className={`object-cover ${className}`} />;
}
export function Basket({ className = "" }: { className?: string }) {
  // Light-theme stand-in for the photographed basket: a soft badge using the bowl art + brand ring.
  return (
    <span className={`relative grid place-items-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-primary-soft" />
      <span className="absolute inset-3 rounded-full border-2 border-dashed border-accent/40" />
      <Bowl className="relative h-[70%] w-[70%] drop-shadow-lg" />
    </span>
  );
}

/** Decorative leaf – pure Tailwind (rounded corners make the leaf shape). */
export function Leaf({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`pointer-events-none block rounded-br-full rounded-tl-full border border-primary/25 bg-primary/10 ${className}`} />;
}

export function Logo({ variant = "app" }: { variant?: "app" | "login" }) {
  if (variant === "login") {
    return (
      <div className="flex items-center justify-center gap-3">
        <Image src="/images/logo-icon.png" alt="FoodSynk" width={64} height={62} priority className="h-16 w-16 shrink-0" />
        <div>
          <p className="text-4xl font-bold leading-none text-ink">Food<span className="text-primary">Synk</span></p>
          <p className="mt-1 text-sm text-ink-soft">Smart Food. Zero Waste.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <Image src="/images/logo-icon.png" alt="FoodSynk" width={48} height={47} priority className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
      <div>
        <p className="text-3xl font-semibold leading-none tracking-tight text-ink">
          Food<span className="text-primary">Synk</span>
        </p>
        <p className="mt-1 text-xs text-ink-soft sm:text-sm">Smart Food. Zero Waste.</p>
      </div>
    </div>
  );
}