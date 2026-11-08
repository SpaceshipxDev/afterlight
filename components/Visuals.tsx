// Product visuals drawn in HTML for the industrial site. English mode of the real UI.

const STAGES = ["Cut", "Rough", "Heat treat", "Finish", "Inspect", "Ship"];
const ORDERS: [string, string, string, number, string, number, "late" | "ok" | "out" | "done"][] = [
  ["WO-24127", "Base plate", "6061-T6", 12, "Nov 08", 3, "late"],
  ["WO-24128", "Flange cover", "SS304", 40, "Nov 09", 2, "ok"],
  ["WO-24131", "Motor mount", "1045", 8, "Nov 10", 2, "out"],
  ["WO-24133", "Guide block", "D2", 64, "Nov 11", 1, "ok"],
  ["WO-24136", "Bearing housing", "Ductile iron", 20, "Nov 12", 4, "ok"],
  ["WO-24138", "Locating plate", "7075-T6", 6, "Nov 13", 0, "ok"],
  ["WO-24140", "Spindle end cap", "SS303", 150, "Nov 14", 5, "done"],
];

export function Board() {
  return (
    <div className="overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-white text-[#0a0a0a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
      <div className="flex h-11 items-center justify-between border-b border-[#ececec] px-4">
        <div className="flex items-center gap-6">
          <span className="text-[13px] font-semibold">Production</span>
          <div className="hidden items-center gap-5 text-[12px] text-[#737373] sm:flex">
            <span className="text-[#0a0a0a]">
              In progress <span className="al-mono text-[11px] text-[#a3a3a3]">128</span>
            </span>
            <span>
              Outsourced <span className="al-mono text-[11px] text-[#a3a3a3]">17</span>
            </span>
            <span>
              Shipped <span className="al-mono text-[11px] text-[#a3a3a3]">2,406</span>
            </span>
          </div>
        </div>
        <div className="flex h-7 w-36 items-center rounded-[4px] border border-[#e5e5e5] px-2.5 text-[11px] text-[#a3a3a3] sm:w-52">
          Search orders, parts
        </div>
      </div>
      <table className="w-full border-collapse whitespace-nowrap text-left text-[12px]">
        <thead>
          <tr className="text-[11px] text-[#8a8a8a]">
            <th className="hidden px-4 py-2.5 font-normal sm:table-cell">Order</th>
            <th className="py-2.5 pl-4 pr-3 font-normal sm:px-3">Part</th>
            <th className="hidden px-3 py-2.5 font-normal md:table-cell">Material</th>
            <th className="px-3 py-2.5 text-right font-normal">Qty</th>
            <th className="px-3 py-2.5 font-normal">Due</th>
            <th className="hidden px-3 py-2.5 font-normal sm:table-cell">Routing</th>
            <th className="px-4 py-2.5 font-normal">Now</th>
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
                        s === "done" || i < at
                          ? "bg-[#0a0a0a]"
                          : i === at
                            ? s === "late"
                              ? "bg-[#ff4f00]"
                              : "bg-[#9a9a9a]"
                            : "bg-[#e8e8e8]"
                      }`}
                    />
                  ))}
                </div>
              </td>
              <td className="px-4 py-[11px]">
                {s === "done" ? (
                  <span className="text-[#8a8a8a]">Shipped</span>
                ) : s === "out" ? (
                  <span>
                    {STAGES[at]} <span className="hidden text-[#8a8a8a] sm:inline">· Outsourced</span>
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

export function SheetVisual() {
  const rows = [
    ["WO-24127", "Base plate", "12"],
    ["WO-24128", "Flange cover", "40"],
    ["WO-24131", "Motor mount", "8"],
  ];
  return (
    <div className="w-full max-w-[300px] text-[11px]">
      <div className="overflow-hidden rounded-[4px] border border-[#d9d9d9] bg-white">
        <div className="flex items-center gap-2 border-b border-[#e5e5e5] px-3 py-2 text-[#737373]">
          <span className="inline-block h-2 w-2 rounded-[1px] bg-[#1f7a4d]" />
          production.xlsx
        </div>
        <table className="w-full border-collapse text-left text-[#404040]">
          <tbody>
            {[["Order", "Part", "Qty"], ...rows].map((r, i) => (
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

export function PhoneVisual() {
  const steps = ["Cut", "Rough", "Finish", "Inspect", "Ship"];
  return (
    <div className="rounded-[30px] border border-[#cfcfcf] bg-white p-[6px]">
      <div className="flex h-[300px] w-[160px] flex-col rounded-[25px] bg-[#fafafa] px-4 pb-4 pt-3">
        <div className="mx-auto mb-5 h-[14px] w-[48px] rounded-full bg-[#0a0a0a]" />
        <div className="al-mono text-[9px] text-[#8a8a8a]">WO-24127</div>
        <div className="mt-0.5 text-[15px] font-semibold leading-tight text-[#0a0a0a]">Base plate</div>
        <div className="text-[10px] text-[#737373]">12 pcs</div>
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
        <div className="mt-auto rounded-[8px] bg-[#0a0a0a] py-2.5 text-center text-[12px] font-semibold text-white">
          Complete Finish
        </div>
      </div>
    </div>
  );
}

export function ChatVisual() {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-[4px] border border-[#d9d9d9] bg-[#f2f2f2] text-[12px]">
      <div className="border-b border-[#e0e0e0] bg-white py-2 text-center text-[12px] font-medium text-[#0a0a0a]">
        Production
      </div>
      <div className="flex flex-col gap-3 px-3 py-4">
        <div className="flex items-start gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#a8a29e] text-[11px] font-medium text-white">
            W
          </span>
          <div className="rounded-[4px] bg-white px-2.5 py-1.5 text-[#0a0a0a]">@Afterlight Mark orders due in 3 days red.</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#0a0a0a] text-[11px] font-medium text-white">
            A
          </span>
          <div className="rounded-[4px] bg-white px-2.5 py-1.5 text-[#0a0a0a]">Done. Refresh and you&rsquo;ll see it.</div>
        </div>
      </div>
    </div>
  );
}
