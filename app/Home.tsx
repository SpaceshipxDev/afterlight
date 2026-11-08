// tryafterlight.com — industrial home. Low key on purpose: no pitch copy, owner speaks as "you".
// ORDER_UPDATES = every non-voided floor scan, all live factories, demos excluded. Pulled 2026-11-05:
// HK db.json reports 27,372 + 越侬 Supabase worker_stage_events 132,639 + 品胜 Aliyun reports 4,935.

import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--al-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--al-mono" });

const EMAIL = "contact@tryafterlight.com";
const CONTACT = `mailto:${EMAIL}`;
const ORDER_UPDATES = "164,946";

function Wordmark({ light, h = 20 }: { light?: boolean; h?: number }) {
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

function Label({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`al-mono text-[11px] uppercase tracking-[0.14em] ${dark ? "text-[#8a8a8a]" : "text-[#737373]"}`}>
      {children}
    </div>
  );
}

/* ---------- product visuals, drawn in HTML (the real UI is Chinese) ---------- */

const STAGES = ["下料", "开粗", "热处理", "精铣", "检验", "发货"];
const ORDERS: [string, string, string, number, string, number, "late" | "ok" | "out" | "done"][] = [
  ["ZC-1027", "6061 底板", "6061-T6", 12, "11-08", 3, "late"],
  ["ZC-1028", "法兰盖", "SUS304", 40, "11-09", 2, "ok"],
  ["ZC-1031", "电机座", "45#", 8, "11-10", 2, "out"],
  ["ZC-1033", "导轨垫块", "Cr12MoV", 64, "11-11", 1, "ok"],
  ["ZC-1036", "轴承座", "QT450", 20, "11-12", 4, "ok"],
  ["ZC-1038", "定位销板", "7075-T6", 6, "11-13", 0, "ok"],
  ["ZC-1040", "主轴端盖", "SUS303", 150, "11-14", 5, "done"],
];

function Board() {
  return (
    <div className="al-cn overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-white text-[#0a0a0a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
      <div className="flex h-11 items-center justify-between border-b border-[#ececec] px-4">
        <div className="flex items-center gap-6">
          <span className="text-[13px] font-semibold">生产看板</span>
          <div className="hidden items-center gap-5 text-[12px] text-[#737373] sm:flex">
            <span className="text-[#0a0a0a]">
              生产中 <span className="al-mono text-[11px] text-[#a3a3a3]">128</span>
            </span>
            <span>
              外发 <span className="al-mono text-[11px] text-[#a3a3a3]">17</span>
            </span>
            <span>
              已完成 <span className="al-mono text-[11px] text-[#a3a3a3]">2,406</span>
            </span>
          </div>
        </div>
        <div className="flex h-7 w-36 items-center rounded-[4px] border border-[#e5e5e5] px-2.5 text-[11px] text-[#a3a3a3] sm:w-52">
          搜索订单、零件
        </div>
      </div>
      <table className="w-full border-collapse whitespace-nowrap text-left text-[12px]">
        <thead>
          <tr className="text-[11px] text-[#8a8a8a]">
            <th className="hidden px-4 py-2.5 font-normal sm:table-cell">订单</th>
            <th className="py-2.5 pl-4 pr-3 font-normal sm:px-3">零件</th>
            <th className="hidden px-3 py-2.5 font-normal md:table-cell">材料</th>
            <th className="px-3 py-2.5 text-right font-normal">数量</th>
            <th className="px-3 py-2.5 font-normal">交期</th>
            <th className="hidden px-3 py-2.5 font-normal sm:table-cell">工序</th>
            <th className="px-4 py-2.5 font-normal">当前</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map(([id, part, mat, qty, due, at, s]) => (
            <tr key={id} className="border-t border-[#f0f0f0]">
              <td className="al-mono hidden px-4 py-[11px] text-[11px] text-[#737373] sm:table-cell">{id}</td>
              <td className="py-[11px] pl-4 pr-3 font-medium sm:px-3">{part}</td>
              <td className="al-mono hidden px-3 py-[11px] text-[11px] text-[#737373] md:table-cell">{mat}</td>
              <td className="al-mono px-3 py-[11px] text-right text-[11px]">{qty}</td>
              <td className={`al-mono px-3 py-[11px] text-[11px] ${s === "late" ? "text-[#ff4f00]" : "text-[#404040]"}`}>{due}</td>
              <td className="hidden px-3 py-[11px] sm:table-cell">
                <div className="flex gap-[3px]">
                  {STAGES.map((st, i) => (
                    <span
                      key={st}
                      className={`h-[6px] w-5 rounded-[1px] lg:w-7 ${
                        s === "done" || i < at ? "bg-[#0a0a0a]" : i === at ? (s === "late" ? "bg-[#ff4f00]" : "bg-[#9a9a9a]") : "bg-[#e8e8e8]"
                      }`}
                    />
                  ))}
                </div>
              </td>
              <td className="px-4 py-[11px]">
                {s === "done" ? (
                  <span className="text-[#8a8a8a]">已发货</span>
                ) : s === "out" ? (
                  <span>
                    {STAGES[at]} <span className="text-[#8a8a8a]">· 外发</span>
                  </span>
                ) : (
                  STAGES[at]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SheetVisual() {
  const rows = [
    ["ZC-1027", "6061 底板", "12"],
    ["ZC-1028", "法兰盖", "40"],
    ["ZC-1031", "电机座", "8"],
  ];
  return (
    <div className="al-cn w-full max-w-[300px] text-[11px]">
      <div className="overflow-hidden rounded-[4px] border border-[#d9d9d9] bg-white">
        <div className="flex items-center gap-2 border-b border-[#e5e5e5] px-3 py-2 text-[#737373]">
          <span className="inline-block h-2 w-2 rounded-[1px] bg-[#1f7a4d]" />
          生产表.xlsx
        </div>
        <table className="w-full border-collapse text-left text-[#404040]">
          <tbody>
            {[["订单", "零件", "数量"], ...rows].map((r, i) => (
              <tr key={i} className={i === 0 ? "text-[#a3a3a3]" : ""}>
                {r.map((c, j) => (
                  <td key={j} className="border-t border-r border-[#efefef] px-3 py-1.5 last:border-r-0">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto h-6 w-px bg-[#d4d4d4]" />
      <div className="rounded-[4px] border border-[#d9d9d9] bg-white">
        {rows.map((r, i) => (
          <div key={r[0]} className="flex items-center justify-between border-t border-[#f0f0f0] px-3 py-2 first:border-t-0">
            <span className="text-[12px] font-medium text-[#0a0a0a]">
              {r[1]} <span className="font-normal text-[#8a8a8a]">×{r[2]}</span>
            </span>
            <span className="flex gap-[2px]">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className={`h-[5px] w-3 rounded-[1px] ${k < 3 - i ? "bg-[#0a0a0a]" : "bg-[#e5e5e5]"}`} />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneVisual() {
  const steps = ["下料", "开粗", "精铣", "检验", "发货"];
  return (
    <div className="al-cn rounded-[30px] border border-[#cfcfcf] bg-white p-[6px]">
      <div className="flex h-[300px] w-[160px] flex-col rounded-[25px] bg-[#fafafa] px-4 pb-4 pt-3">
        <div className="mx-auto mb-5 h-[14px] w-[48px] rounded-full bg-[#0a0a0a]" />
        <div className="al-mono text-[9px] text-[#8a8a8a]">ZC-1027</div>
        <div className="mt-0.5 text-[15px] font-semibold leading-tight text-[#0a0a0a]">6061 底板</div>
        <div className="text-[10px] text-[#737373]">12 件</div>
        <div className="mt-4 flex flex-col">
          {steps.map((name, i) => (
            <div key={name} className="flex items-center gap-2.5 py-[4px]">
              <span
                className={`h-[6px] w-[6px] rounded-full ${
                  i < 2 ? "bg-[#0a0a0a]" : i === 2 ? "al-now bg-[#ff4f00]" : "border border-[#c4c4c4]"
                }`}
              />
              <span
                className={`text-[11px] ${
                  i === 2 ? "font-semibold text-[#0a0a0a]" : i < 2 ? "text-[#8a8a8a]" : "text-[#b5b5b5]"
                }`}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-[8px] bg-[#0a0a0a] py-2.5 text-center text-[12px] font-semibold text-white">完成 精铣</div>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="al-cn w-full max-w-[300px] overflow-hidden rounded-[4px] border border-[#d9d9d9] bg-[#f2f2f2] text-[12px]">
      <div className="border-b border-[#e0e0e0] bg-white py-2 text-center text-[12px] font-medium text-[#0a0a0a]">生产群</div>
      <div className="flex flex-col gap-3 px-3 py-4">
        <div className="flex items-start gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#a8a29e] text-[11px] font-medium text-white">王</span>
          <div className="rounded-[4px] bg-white px-2.5 py-1.5 text-[#0a0a0a]">@思 交期三天内的订单，标红</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#0a0a0a] text-[11px] font-medium text-white">思</span>
          <div className="rounded-[4px] bg-white px-2.5 py-1.5 text-[#0a0a0a]">好的王总，已上线，刷新就能看到。</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

const STEPS = [
  { n: "01", title: "Starts from your sheet.", body: "Set up from the production spreadsheet you already use. Same columns, same steps.", visual: <SheetVisual /> },
  { n: "02", title: "Scanned at every step.", body: "Every drawing carries a QR code. Workers scan it with their phone as the part moves.", visual: <PhoneVisual /> },
  { n: "03", title: "Changed by asking.", body: "Say what you want in your WeChat group. It changes.", visual: <ChatVisual /> },
];

const SPECS = [
  ["Runs on", "Phone, desktop, shop-floor TV"],
  ["Languages", "中文, English"],
];

export default function Home() {
  return (
    <div className={`al-home ${sans.variable} ${mono.variable} min-h-screen bg-white text-[#0a0a0a]`}>
      {/* hero */}
      <section className="bg-[#0a0a0a] text-white">
        <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between border-b border-white/10 px-6">
          <Wordmark light />
          <a
            href={CONTACT}
            className="rounded-[4px] border border-white/20 px-3.5 py-1.5 text-[13px] text-white transition-colors hover:border-white/60"
          >
            Contact
          </a>
        </nav>

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
            <div className="text-[56px] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[72px]">
              {ORDER_UPDATES}
            </div>
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
        <div className="border-b border-[#e5e5e5] pb-5">
          <h2 className="text-[28px] font-medium tracking-[-0.03em] sm:text-[36px]">How it works</h2>
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

      {/* specs + contact */}
      <section className="border-t border-[#e5e5e5]">
        <div className="mx-auto grid max-w-[1240px] px-6 md:grid-cols-3">
          {[...SPECS, ["Contact", EMAIL]].map(([k, v]) => (
            <div key={k} className="border-b border-[#e5e5e5] py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
              <Label>{k}</Label>
              {k === "Contact" ? (
                <a href={CONTACT} className="al-cn mt-3 inline-block text-[17px] underline decoration-[#d4d4d4] underline-offset-4 transition-colors hover:decoration-[#0a0a0a]">
                  {v}
                </a>
              ) : (
                <div className="al-cn mt-3 text-[17px]">{v}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#0a0a0a] text-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-10">
          <Wordmark light h={16} />
          <span className="text-[12px] text-[#737373]">© 2026 Afterlight, Inc.</span>
        </div>
      </footer>
    </div>
  );
}
