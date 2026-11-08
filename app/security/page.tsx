import Link from "next/link";
import { CONTACT, EMAIL, FONTS, Label, PageHero, SiteFooter } from "@/components/Site";

export const metadata = {
  title: "Security — Afterlight",
  description: "How Afterlight protects your production data.",
};

const CONTROLS = [
  ["Isolation", "Each factory runs on its own application instance and database. No factory can see another's data."],
  ["Encryption in transit", "All traffic to the system is served over TLS."],
  ["Access", "Production access is limited to Afterlight staff who need it to run and support the system."],
  ["Change control", "Every change is versioned in source control and can be rolled back."],
  ["AI processing", "Requests to the assistant go to model providers that do not train on your data."],
  ["Hosting", "The United States and Asia, as set in your agreement."],
];

const DATA = [
  ["Ownership", "Your production data belongs to you."],
  ["Use", "Used only to run, support and secure your system."],
  ["AI training", "Only under our Licensed Data Training Program, by separate written agreement. Contact us to take part."],
  ["Export", "Full export of your data at any time, on request."],
  ["Deletion", "Deleted within 30 days of your request after the agreement ends."],
];

export default function SecurityPage() {
  return (
    <div className={`al-home ${FONTS} min-h-screen bg-white text-[#0a0a0a]`}>
      <PageHero label="Security" title="Your data stays yours." sub="How we protect the production records you run your factory on." />

      <section className="mx-auto max-w-[1240px] px-6 py-24 sm:py-28">
        <h2 className="border-b border-[#e5e5e5] pb-5 text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">Controls</h2>
        <div className="grid border-l border-[#e5e5e5] sm:grid-cols-2 lg:grid-cols-3">
          {CONTROLS.map(([t, b], i) => (
            <div key={t} className="border-b border-r border-[#e5e5e5] px-6 pb-10 pt-6">
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#6b6b6b]">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:py-28">
          <h2 className="text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">Your data</h2>
          <dl className="mt-10 border-t border-[#e5e5e5]">
            {DATA.map(([k, v]) => (
              <div key={k} className="grid gap-2 border-b border-[#e5e5e5] py-5 sm:grid-cols-12">
                <dt className="sm:col-span-4">
                  <Label>{k}</Label>
                </dt>
                <dd className="text-[16px] sm:col-span-8">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[14px] text-[#6b6b6b]">
            Details in our <Link href="/privacy" className="underline decoration-[#d4d4d4] underline-offset-4 hover:decoration-[#0a0a0a]">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="underline decoration-[#d4d4d4] underline-offset-4 hover:decoration-[#0a0a0a]">Terms of Service</Link>.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f5f5]">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-6 py-20 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <Label>Report an issue</Label>
          </div>
          <div className="sm:col-span-8">
            <p className="text-[20px] font-medium tracking-[-0.02em]">
              Found a vulnerability? Email{" "}
              <a href={CONTACT} className="underline decoration-[#bdbdbd] underline-offset-4 hover:decoration-[#0a0a0a]">
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
