// tryafterlight.com — industrial home. Low key on purpose: no pitch copy, owner speaks as "you".
// ORDER_UPDATES lives in components/Site.tsx (also shown on /company).

import Link from "next/link";
import { FONTS, Label, ORDER_UPDATES, SiteFooter, SiteNav } from "@/components/Site";
import { Board, ChatVisual, PhoneVisual, SheetVisual } from "@/components/Visuals";

const STEPS = [
  { n: "01", title: "Starts from your sheet.", body: "Set up from the production spreadsheet you already use. Same columns, same steps.", visual: <SheetVisual /> },
  { n: "02", title: "Scanned at every step.", body: "Every drawing carries a QR code. Workers scan it with their phone as the part moves.", visual: <PhoneVisual /> },
  { n: "03", title: "Changed by asking.", body: "Say what you want in your group chat. It changes.", visual: <ChatVisual /> },
];

export default function Home() {
  return (
    <div className={`al-home ${FONTS} min-h-screen bg-white text-[#0a0a0a]`}>
      {/* hero */}
      <section className="bg-[#0a0a0a] text-white">
        <SiteNav />
        <div className="mx-auto grid max-w-[1240px] gap-16 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-12 lg:items-end lg:pb-24">
          <div className="lg:col-span-8">
            <Label dark>
              <span className="mr-2.5 inline-block h-[7px] w-[7px] bg-[#ff4f00] align-[1px]" />
              Manufacturing execution system
            </Label>
            <h1 className="mt-7 text-[52px] font-medium leading-[0.98] tracking-[-0.038em] sm:text-[88px]">
              Software for
              <br />
              your factory.
            </h1>
            <p className="mt-8 max-w-[440px] text-[17px] leading-[1.55] text-[#a3a3a3] sm:text-[19px]">
              Built from the spreadsheet you already run on. Change it by asking.
            </p>
          </div>
          <div className="border-t border-white/15 pt-6 lg:col-span-4">
            <div className="text-[56px] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[72px]">{ORDER_UPDATES}</div>
            <div className="mt-3 text-[14px] text-[#a3a3a3]">Order updates scanned on the shop floor.</div>
          </div>
        </div>
      </section>

      {/* product */}
      <section className="bg-[linear-gradient(#0a0a0a_0_45%,#fff_45%)]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Board />
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-28 sm:pb-32 sm:pt-36">
        <div className="flex items-baseline justify-between border-b border-[#e5e5e5] pb-5">
          <h2 className="text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">How it works</h2>
          <Link href="/product" className="text-[14px] text-[#6b6b6b] transition-colors hover:text-[#0a0a0a]">
            Product →
          </Link>
        </div>
        <div className="grid border-l border-[#e5e5e5] md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col border-b border-r border-[#e5e5e5]">
              <div className="flex h-[340px] items-center justify-center bg-[#f5f5f5] px-6">{s.visual}</div>
              <div className="px-6 pb-8 pt-6">
                <Label>{s.n}</Label>
                <h3 className="mt-3 text-[20px] font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 max-w-[320px] text-[15px] leading-[1.55] text-[#6b6b6b]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* specs */}
      <section className="border-t border-[#e5e5e5]">
        <div className="mx-auto grid max-w-[1240px] px-6 md:grid-cols-3">
          {[
            ["Runs on", "Phone, desktop, shop-floor TV", ""],
            ["Languages", "English, Chinese", ""],
            ["Your data", "Yours. Isolated per factory.", "/security"],
          ].map(([k, v, href]) => (
            <div key={k} className="border-b border-[#e5e5e5] py-8 last:border-b-0 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
              <Label>{k}</Label>
              {href ? (
                <Link href={href} className="mt-3 inline-block text-[17px] underline decoration-[#d4d4d4] underline-offset-4 transition-colors hover:decoration-[#0a0a0a]">
                  {v}
                </Link>
              ) : (
                <div className="mt-3 text-[17px]">{v}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
