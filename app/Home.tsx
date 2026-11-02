// tryafterlight.com — industrial home (2026-11-01). Low key on purpose: no pitch copy.
// Figures = verified Oct 30 pull, week to Oct 29: 101 workers at 7 factories scanned 12,867 times.

const CONTACT = "mailto:harry@tryafterlight.com";
const WORKERS = 101;

// Deterministic pseudo-random so server and client render the same field.
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function ScanField() {
  return (
    <div
      className="mx-auto flex max-w-[560px] flex-wrap justify-center gap-[13px] sm:gap-[15px]"
      role="img"
      aria-label={`${WORKERS} dots, one per worker who scanned last week`}
    >
      {Array.from({ length: WORKERS }, (_, i) => {
        const duration = 5 + rand(i, 1) * 11; // 5–16 s between scans
        const delay = -rand(i, 2) * duration; // start mid-cycle
        return (
          <span
            key={i}
            className="al-dot"
            style={{ animationDuration: `${duration.toFixed(2)}s`, animationDelay: `${delay.toFixed(2)}s` }}
          />
        );
      })}
    </div>
  );
}

function Wordmark({ light }: { light?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/afterlight-wordmark.svg"
      alt="Afterlight"
      width={924}
      height={219}
      className="h-[22px] w-auto select-none"
      style={light ? { filter: "invert(1)" } : undefined}
    />
  );
}

/* ---------- product visuals, drawn in HTML (the real UI is Chinese) ---------- */

function ExcelToSystem() {
  const rows = [
    ["ZC-1027", "6061 底板", "12", "11-04"],
    ["ZC-1028", "法兰盖", "40", "11-06"],
    ["ZC-1031", "电机座", "8", "11-07"],
  ];
  const status = [
    ["精铣", "bg-[#1d1d1f] text-white"],
    ["开粗", "bg-[#e8e8ed] text-[#1d1d1f]"],
    ["下料", "bg-[#e8e8ed] text-[#1d1d1f]"],
  ];
  return (
    <div className="al-cn flex w-full max-w-[420px] flex-col gap-4 text-[12px]">
      <div className="overflow-hidden rounded-[10px] border border-[#d2d2d7] bg-white">
        <div className="flex items-center gap-2 border-b border-[#d2d2d7] bg-[#f5f5f7] px-3 py-2 text-[11px] text-[#6e6e73]">
          <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[#1f7a4d]" />
          生产表.xlsx
        </div>
        <table className="w-full border-collapse text-left text-[#424245]">
          <thead>
            <tr className="text-[#86868b]">
              {["订单", "零件", "数量", "交期"].map((h) => (
                <th key={h} className="border-b border-r border-[#e8e8ed] px-3 py-1.5 font-normal last:border-r-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, j) => (
                  <td key={j} className="border-b border-r border-[#e8e8ed] px-3 py-1.5 last:border-r-0">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center text-[11px] tracking-wide text-[#86868b]">about an hour later</div>
      <div className="rounded-[14px] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_30px_rgba(0,0,0,0.06)]">
        {rows.map((r, i) => (
          <div key={r[0]} className="flex items-center justify-between rounded-[8px] px-2 py-2.5 text-[#1d1d1f] [&+&]:border-t [&+&]:border-[#f0f0f2]">
            <div className="flex flex-col">
              <span className="text-[13px] font-medium">{r[1]} ×{r[2]}</span>
              <span className="text-[11px] text-[#86868b]">{r[0]} · 交期 {r[3]}</span>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${status[i][1]}`}>{status[i][0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneScan() {
  const steps = [
    ["下料", "done"],
    ["开粗", "done"],
    ["精铣", "now"],
    ["检验", "next"],
    ["发货", "next"],
  ] as const;
  return (
    <div className="al-cn rounded-[44px] bg-[#1d1d1f] p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.18)]">
      <div className="flex h-[480px] w-[240px] flex-col rounded-[35px] bg-[#f5f5f7] px-5 pb-6 pt-4">
        <div className="mx-auto mb-6 h-[22px] w-[76px] rounded-full bg-[#1d1d1f]" />
        <div className="text-[11px] text-[#86868b]">ZC-1027 · 已扫码</div>
        <div className="mt-1 text-[22px] font-semibold leading-tight text-[#1d1d1f]">6061 底板</div>
        <div className="text-[13px] text-[#6e6e73]">12 件</div>
        <div className="mt-6 flex flex-col gap-0">
          {steps.map(([name, s]) => (
            <div key={name} className="flex items-center gap-3 py-[7px]">
              <span
                className={
                  s === "done"
                    ? "h-2 w-2 rounded-full bg-[#1d1d1f]"
                    : s === "now"
                      ? "al-now h-2 w-2 rounded-full bg-[#0a84ff]"
                      : "h-2 w-2 rounded-full border border-[#c7c7cc]"
                }
              />
              <span
                className={
                  s === "now"
                    ? "text-[15px] font-semibold text-[#1d1d1f]"
                    : s === "done"
                      ? "text-[14px] text-[#86868b] line-through decoration-[#c7c7cc]"
                      : "text-[14px] text-[#aeaeb2]"
                }
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-[14px] bg-[#1d1d1f] py-3.5 text-center text-[16px] font-semibold text-white">
          完成 精铣
        </div>
      </div>
    </div>
  );
}

function AskChat() {
  return (
    <div className="al-cn w-full max-w-[380px] overflow-hidden rounded-[18px] bg-[#ededed] text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#dcdcdc] bg-[#f7f7f7] py-3 text-center text-[14px] font-medium text-[#1d1d1f]">
        生产群
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        <div className="text-center text-[11px] text-[#999]">00:14</div>
        <div className="flex items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[#c9b8a3] text-[13px] font-medium text-white">王</span>
          <div className="rounded-[6px] bg-white px-3 py-2 text-[#1d1d1f]">@思 交期三天内的订单，标红</div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[#1d1d1f] text-[13px] font-medium text-white">思</span>
          <div className="rounded-[6px] bg-white px-3 py-2 text-[#1d1d1f]">好的王总，已经上线了，刷新就能看到。</div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[#c9b8a3] text-[13px] font-medium text-white">王</span>
          <div className="rounded-[6px] bg-white px-3 py-2 text-[#1d1d1f]">👍</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

function Beat({ title, body, visual, flip }: { title: string; body: string; visual: React.ReactNode; flip?: boolean }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
      <div className={flip ? "md:order-2" : ""}>
        <h3 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1d1d1f] sm:text-[34px]">{title}</h3>
        <p className="mt-3 max-w-[420px] text-[17px] leading-[1.55] text-[#6e6e73]">{body}</p>
      </div>
      <div className={`flex min-h-[420px] w-full items-center justify-center rounded-[28px] bg-[#f5f5f7] px-6 py-12 ${flip ? "md:order-1" : ""}`}>
        {visual}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="al-home min-h-screen bg-white text-[#1d1d1f]">
      <section className="bg-black text-white">
        <nav className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <Wordmark light />
          <a href={CONTACT} className="text-[14px] text-[#a1a1a6] transition-colors hover:text-white">
            Contact
          </a>
        </nav>

        <div className="mx-auto max-w-[1100px] px-6 pb-24 pt-20 text-center sm:pb-28 sm:pt-28">
          <h1 className="mx-auto max-w-[860px] text-[44px] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[76px]">
            Software for your factory.
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-[19px] leading-[1.5] text-[#a1a1a6] sm:text-[22px]">
            Built from the spreadsheet you already run on. Change it by asking.
          </p>

          <div className="mt-20 sm:mt-24">
            <ScanField />
            <div className="mt-12 text-[13px] font-medium uppercase tracking-[0.14em] text-[#6e6e73]">Last week</div>
            <div className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[52px]">
              101 workers. 12,867 scans.
            </div>
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.55] text-[#86868b] sm:text-[17px]">
              One dot for each worker who scanned a part.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-24 sm:py-32">
        <div className="flex flex-col gap-20 sm:gap-28">
          <Beat
            title="Starts from your sheet."
            body="We set it up from the production spreadsheet you already use. Same columns, same steps."
            visual={<ExcelToSystem />}
          />
          <Beat
            title="Scanned at every step."
            body="Every drawing carries a QR code. Your workers scan it with their phone as the part moves on."
            visual={<PhoneScan />}
            flip
          />
          <Beat
            title="Changed by asking."
            body="Want something different? Say it in your WeChat group, and it changes."
            visual={<AskChat />}
          />
        </div>
      </section>

      <footer className="border-t border-[#e8e8ed]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-2 px-6 py-8 text-[13px] text-[#86868b] sm:flex-row">
          <span>© 2026 Afterlight, Inc.</span>
          <a href={CONTACT} className="transition-colors hover:text-[#1d1d1f]">harry@tryafterlight.com</a>
        </div>
      </footer>
    </div>
  );
}
