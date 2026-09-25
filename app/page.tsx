import Link from "next/link";
import Icon from "@/components/Icon";
import { Bowl, Leaf, Logo } from "@/components/Art";
import Shell from "@/components/Shell";
import Image from "next/image";

const ROLES = [
  { title: "Food Provider", text: "Share surplus food and reduce waste.", icon: "chef", href: "/home" },
  { title: "Recipient", text: "Discover local food and help reduce waste.", icon: "users", href: "/login" },
];

export default function Welcome() {
  return (
    <Shell>
      <Leaf className="absolute -left-4 top-56 h-20 w-20 -rotate-12 opacity-70" />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col lg:px-8">
        <header className="flex items-start justify-between px-6 pt-8 lg:px-0">
          <Logo />
          <p className="mt-1 hidden max-w-[8rem] -rotate-6 text-center font-hand text-xl leading-5 text-accent-deep sm:block">Good food finds its way ♡</p>
        </header>

        <div className="flex flex-1 flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <section className="flex items-center justify-between gap-2 px-6 pt-8 lg:flex-col lg:items-start lg:gap-6 lg:px-0 lg:pt-0">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">Welcome <span className="text-primary">Back!</span></h1>
              <p className="mt-4 max-w-[13rem] text-base leading-snug text-ink-soft sm:max-w-xs sm:text-lg lg:max-w-md lg:text-xl">
                Together we can reduce food waste and build stronger communities.
              </p>
            </div>
            <Bowl className="h-36 w-36 shrink-0 drop-shadow-xl sm:h-52 sm:w-52 lg:h-80 lg:w-80 lg:self-center" />
           
          </section>

          <section className="mt-8 flex flex-1 flex-col rounded-t-[3rem] bg-surface px-5 pb-8 pt-6 lg:mt-0 lg:flex-none lg:rounded-[2rem] lg:border lg:border-line lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <h2 className="flex items-center justify-center gap-3 text-xl font-medium text-primary">
                <span className="h-px w-8 bg-primary" /> Log in as <span className="h-px w-8 bg-primary" />
              </h2>
              <ul className="mt-5 space-y-4">
                {ROLES.map((r) => (
                  <li key={r.title}>
                    <Link href={r.href} className="card flex items-center gap-4 rounded-3xl p-4 transition hover:border-primary/40 hover:shadow-md active:scale-[0.99]">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Icon name={r.icon} className="h-9 w-9" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xl font-semibold text-primary">{r.title}</span>
                        <span className="block text-sm text-ink-soft">{r.text}</span>
                      </span>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white"><Icon name="arrow" className="h-5 w-5" /></span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-5 flex items-center gap-4 text-ink-soft"><span className="h-px flex-1 bg-line" /> OR <span className="h-px flex-1 bg-line" /></div>
              <Link href="/login" className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-primary text-primary hover:bg-primary-soft">
                <Icon name="user" className="h-5 w-5" /> Continue with Account
              </Link>
              <p className="mt-6 text-center text-[10px] tracking-widest text-ink-soft">GOOD FOOD • LESS WASTE • A BRIGHTER TOMORROW</p>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
