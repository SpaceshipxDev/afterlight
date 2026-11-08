// Shared chrome for the industrial site: home (app/Home.tsx) and the legal pages.
import Link from "next/link";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--al-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--al-mono" });

export const FONTS = `${sans.variable} ${mono.variable}`;
export const EMAIL = "contact@tryafterlight.com";
export const CONTACT = `mailto:${EMAIL}`;
// Every non-voided floor scan, all live factories, demos excluded. Pulled 2026-11-05:
// HK db.json reports 27,372 + 越侬 Supabase worker_stage_events 132,639 + 品胜 Aliyun reports 4,935.
export const ORDER_UPDATES = "164,946";

export function Wordmark({ light, h = 20 }: { light?: boolean; h?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/afterlight-wordmark.svg"
      alt="Afterlight"
      width={924}
      height={219}
      className="w-auto select-none"
      style={{ height: h, ...(light ? { filter: "invert(1)" } : {}) }}
    />
  );
}

export function Label({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`al-mono text-[11px] uppercase tracking-[0.14em] ${dark ? "text-[#8a8a8a]" : "text-[#737373]"}`}>
      {children}
    </div>
  );
}

const PAGES = [
  ["/product", "Product"],
  ["/security", "Security"],
  ["/company", "Company"],
];

export function SiteNav() {
  return (
    <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between border-b border-white/10 px-6">
      <div className="flex items-center gap-10">
        <Link href="/" aria-label="Afterlight home">
          <Wordmark light />
        </Link>
        <div className="hidden items-center gap-7 text-[13px] text-[#a3a3a3] sm:flex">
          {PAGES.map(([href, name]) => (
            <Link key={href} href={href} className="transition-colors hover:text-white">
              {name}
            </Link>
          ))}
        </div>
      </div>
      <a
        href={CONTACT}
        className="rounded-[4px] border border-white/20 px-3.5 py-1.5 text-[13px] text-white transition-colors hover:border-white/60"
      >
        Contact
      </a>
    </nav>
  );
}

export function PageHero({ label, title, sub }: { label: string; title: React.ReactNode; sub?: string }) {
  return (
    <header className="bg-[#0a0a0a] text-white">
      <SiteNav />
      <div className="mx-auto max-w-[1240px] px-6 pb-20 pt-20 sm:pt-28">
        <Label dark>{label}</Label>
        <h1 className="mt-6 max-w-[900px] text-[44px] font-medium leading-[1] tracking-[-0.038em] sm:text-[72px]">{title}</h1>
        {sub ? <p className="mt-7 max-w-[520px] text-[17px] leading-[1.55] text-[#a3a3a3] sm:text-[19px]">{sub}</p> : null}
      </div>
    </header>
  );
}

export function SiteFooter() {
  const cols: [string, [string, string][]][] = [
    ["Afterlight", [["/product", "Product"], ["/security", "Security"], ["/company", "Company"]]],
    ["Legal", [["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]]],
    ["Contact", [[CONTACT, EMAIL]]],
  ];
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-6 pb-10 pt-16 sm:grid-cols-12">
        <div className="sm:col-span-6">
          <Link href="/" aria-label="Afterlight home">
            <Wordmark light h={18} />
          </Link>
          <p className="mt-4 text-[13px] text-[#737373]">Manufacturing execution system.</p>
        </div>
        {cols.map(([title, links]) => (
          <div key={title} className="sm:col-span-2">
            <Label dark>{title}</Label>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13px] text-[#a3a3a3]">
              {links.map(([href, name]) => (
                <li key={href}>
                  {href.startsWith("mailto:") ? (
                    <a href={href} className="transition-colors hover:text-white">{name}</a>
                  ) : (
                    <Link href={href} className="transition-colors hover:text-white">{name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="border-t border-white/10 py-6 text-[12px] text-[#5c5c5c]">© 2026 Afterlight, Inc. All rights reserved.</div>
      </div>
    </footer>
  );
}

export type Section = { id: string; title: string; body: React.ReactNode };

export function LegalDoc({ title, effective, sections }: { title: string; effective: string; sections: Section[] }) {
  return (
    <div className={`al-home ${FONTS} min-h-screen bg-white text-[#0a0a0a]`}>
      <header className="bg-[#0a0a0a] text-white">
        <SiteNav />
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-20 sm:pt-24">
          <Label dark>Legal</Label>
          <h1 className="mt-6 text-[44px] font-medium leading-[1] tracking-[-0.038em] sm:text-[64px]">{title}</h1>
          <div className="al-mono mt-6 text-[12px] text-[#8a8a8a]">Effective {effective}</div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 sm:py-20 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-10">
            <Label>Contents</Label>
            <ol className="mt-4 flex flex-col gap-2 text-[13px] text-[#6b6b6b]">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="al-mono w-5 text-[11px] leading-[19px] text-[#a3a3a3]">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${s.id}`} className="transition-colors hover:text-[#0a0a0a]">{s.title}</a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <div className="al-legal lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-10 border-t border-[#e5e5e5] py-10 first:border-t-0 first:pt-0">
              <div className="flex gap-4">
                <span className="al-mono pt-[5px] text-[11px] text-[#a3a3a3]">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[20px] font-medium tracking-[-0.02em]">{s.title}</h2>
                  <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.65] text-[#404040]">{s.body}</div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
