import { FONTS, Label, PageHero, SiteFooter } from "@/components/Site";
import { Board, PhoneVisual } from "@/components/Visuals";

export const metadata = {
  title: "Product — Afterlight",
  description: "Orders, routing, shop-floor scanning, outsourcing and inventory in one system, set up from your spreadsheet.",
};

const MODULES = [
  ["Orders", "Every order, part, quantity and due date, imported from your spreadsheet."],
  ["Routing", "Each part carries its own steps. The board shows where it is now."],
  ["Shop-floor scanning", "Workers scan the drawing's QR code with a phone to finish a step. No terminals."],
  ["Outsourcing", "Parts sent out for heat treatment, plating or machining stay tracked until they return."],
  ["Inventory", "Stock in and out, by part and by material."],
  ["Output", "Pieces by worker, step and day, straight from the scans."],
  ["Shop-floor TV", "A live board on the wall, readable from across the floor."],
  ["Changes", "Ask in your group chat for a new column, report or rule. It goes live in the system."],
];

const DEPLOY = [
  ["Setup", "From your existing spreadsheet and routing. Nothing to install."],
  ["Devices", "Any phone with a camera. Any browser. Any TV."],
  ["Languages", "English, Chinese."],
  ["Hosting", "The United States and Asia."],
];

export default function ProductPage() {
  return (
    <div className={`al-home ${FONTS} min-h-screen bg-white text-[#0a0a0a]`}>
      <PageHero
        label="Product"
        title={
          <>
            From order
            <br />
            to shipment.
          </>
        }
        sub="Orders, routing, scanning, outsourcing and inventory in one system, set up from the spreadsheet you already use."
      />

      <section className="bg-[linear-gradient(#0a0a0a_0_40%,#fff_40%)]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Board />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-24 pt-28 sm:pt-36">
        <h2 className="border-b border-[#e5e5e5] pb-5 text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">Modules</h2>
        <div className="grid border-l border-[#e5e5e5] sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map(([t, b], i) => (
            <div key={t} className="border-b border-r border-[#e5e5e5] px-6 pb-10 pt-6">
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#6b6b6b]">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] items-center gap-16 px-6 pb-24 sm:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label>On the floor</Label>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px]">One scan per step.</h2>
          <p className="mt-5 max-w-[420px] text-[16px] leading-[1.6] text-[#6b6b6b]">
            The worker scans the drawing, sees the part and its next step, and taps once when it is done. The office board
            updates at the same moment.
          </p>
        </div>
        <div className="flex h-[440px] items-center justify-center bg-[#f5f5f5] lg:col-span-7">
          <PhoneVisual />
        </div>
      </section>

      <section className="border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 sm:py-28">
          <h2 className="text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">Deployment</h2>
          <dl className="mt-10 border-t border-[#e5e5e5]">
            {DEPLOY.map(([k, v]) => (
              <div key={k} className="grid gap-2 border-b border-[#e5e5e5] py-5 sm:grid-cols-12">
                <dt className="sm:col-span-4">
                  <Label>{k}</Label>
                </dt>
                <dd className="text-[16px] sm:col-span-8">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
