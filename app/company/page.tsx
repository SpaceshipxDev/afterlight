import { CONTACT, EMAIL, FONTS, Label, ORDER_UPDATES, PageHero, SiteFooter } from "@/components/Site";

export const metadata = {
  title: "Company — Afterlight",
  description: "Afterlight builds manufacturing execution software for factories.",
};

const PRINCIPLES = [
  ["Start from what you use.", "We build your system from the spreadsheet and routing you already run on, so nobody relearns their job."],
  ["Change it when you ask.", "Your factory changes every month. The software changes with it, usually the same day you ask."],
  ["Keep it running.", "We host it, monitor it and fix it, so your floor keeps scanning."],
];

export default function CompanyPage() {
  return (
    <div className={`al-home ${FONTS} min-h-screen bg-white text-[#0a0a0a]`}>
      <PageHero
        label="Company"
        title={
          <>
            We build software
            <br />
            for factories.
          </>
        }
        sub="Afterlight makes manufacturing execution software for machining and fabrication shops."
      />

      <section className="mx-auto max-w-[1240px] px-6 py-24 sm:py-28">
        <h2 className="border-b border-[#e5e5e5] pb-5 text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">How we work</h2>
        <div className="grid border-l border-[#e5e5e5] md:grid-cols-3">
          {PRINCIPLES.map(([t, b], i) => (
            <div key={t} className="border-b border-r border-[#e5e5e5] px-6 pb-10 pt-6">
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <h3 className="mt-10 text-[20px] font-medium tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 max-w-[340px] text-[15px] leading-[1.55] text-[#6b6b6b]">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5e5e5]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-24 sm:grid-cols-12 sm:py-28">
          <div className="sm:col-span-4">
            <Label>In production</Label>
          </div>
          <div className="sm:col-span-8">
            <div className="text-[64px] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[96px]">{ORDER_UPDATES}</div>
            <p className="mt-4 text-[16px] text-[#6b6b6b]">Order updates scanned on the shop floor.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5]">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-6 py-20 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <Label>Contact</Label>
          </div>
          <div className="sm:col-span-8">
            <a href={CONTACT} className="text-[28px] font-medium tracking-[-0.02em] underline decoration-[#bdbdbd] underline-offset-[6px] hover:decoration-[#0a0a0a] sm:text-[36px]">
              {EMAIL}
            </a>
            <p className="mt-3 text-[14px] text-[#6b6b6b]">Afterlight, Inc.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
