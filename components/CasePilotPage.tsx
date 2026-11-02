import Image from 'next/image';
import Link from 'next/link';
import { PiTriangleBold } from 'react-icons/pi';

export type Sku = {
  id: string;
  displayName: string;
  inputs: string[];
  outputs: string[];
};

export type CasePilotData = {
  brand: string;
  /** Optional path to a logo file in /public. If omitted, brand name is rendered as a wordmark. */
  logo?: string;
  /** Display height of the logo in px. */
  logoH?: number;
  headline: string;
  lede: string;
  scope: string;
  output: string;
  timeline: string;
  status: string;
  /** Whether inputs are product flat lays (rendered with white-bg padding) or full scenes. */
  inputStyle?: 'flat' | 'scene';
  skus: Sku[];
};

type Props = { data: CasePilotData };

export default function CasePilotPage({ data }: Props) {
  const inputStyle = data.inputStyle ?? 'flat';

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center text-black" style={{ gap: '0.25em', fontSize: '18px' }}>
            <PiTriangleBold style={{ width: '1.25em', height: '1.25em' }} />
            <span className="font-semibold tracking-tight leading-none">Afterlight</span>
          </Link>
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            All pilots
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-neutral-100">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="mb-12 md:mb-16">
            {data.logo ? (
              <img
                src={data.logo}
                alt={data.brand}
                style={{ height: data.logoH ?? 48, width: 'auto' }}
                className="opacity-95"
                draggable={false}
              />
            ) : (
              <p className="text-[28px] md:text-[34px] font-semibold tracking-[-0.02em] text-neutral-900">
                {data.brand}
              </p>
            )}
          </div>

          <h1 className="text-[44px] md:text-[68px] lg:text-[80px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.02] max-w-4xl mb-8">
            {data.headline}
          </h1>
          <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-2xl tracking-[-0.005em]">
            {data.lede}
          </p>

          {/* Meta grid */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 rounded-[16px] overflow-hidden border border-neutral-100">
            {[
              { label: 'Scope', value: data.scope },
              { label: 'Output', value: data.output },
              { label: 'Timeline', value: data.timeline },
              { label: 'Status', value: data.status },
            ].map((m) => (
              <div key={m.label} className="bg-white p-5 md:p-6">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-neutral-400 mb-2">
                  {m.label}
                </p>
                <p className="text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-neutral-900">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* SKU sections */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
        {data.skus.map((sku, index) => (
          <section
            key={sku.id}
            className={index !== 0 ? 'mt-24 md:mt-40 pt-16 md:pt-20 border-t border-neutral-100' : ''}
          >
            <div className="flex items-baseline gap-3 mb-10 md:mb-14">
              <span className="font-mono text-[12px] md:text-[13px] text-neutral-400">
                0{index + 1}
              </span>
              <h2 className="text-[20px] md:text-[24px] font-medium tracking-[-0.015em] text-neutral-900">
                {sku.displayName}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-6 md:gap-10">
              {/* Before */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-5">
                  Before
                </p>
                <div className={`grid gap-3 md:gap-4 ${sku.inputs.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {sku.inputs.map((src, idx) => (
                    <div
                      key={idx}
                      className={`relative aspect-square overflow-hidden rounded-[16px] border border-neutral-100 ${
                        inputStyle === 'flat' ? 'bg-neutral-50' : 'bg-neutral-100'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${sku.displayName} — source ${idx + 1}`}
                        fill
                        className={
                          inputStyle === 'flat'
                            ? 'object-contain p-6 mix-blend-multiply'
                            : 'object-cover'
                        }
                        sizes="(max-width: 1024px) 100vw, 30vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-5">
                  After
                </p>
                <div
                  className={`grid gap-3 md:gap-4 ${
                    sku.outputs.length === 1
                      ? 'grid-cols-1'
                      : sku.outputs.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-2 md:grid-cols-3'
                  }`}
                >
                  {sku.outputs.map((src, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-[16px] bg-neutral-100">
                      <Image
                        src={src}
                        alt={`${sku.displayName} — generated ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 22vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-5">
            Run a pilot like this
          </p>
          <h2 className="text-[32px] md:text-[44px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.1] max-w-2xl mx-auto mb-10">
            Skip your next photoshoot.
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-7 py-4 text-[15px] font-semibold tracking-tight hover:bg-neutral-800 transition-colors"
          >
            Get on the waitlist
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex items-center justify-between text-[12px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight, Inc.</span>
          <div className="flex items-center gap-6">
            <Link href="/use-cases" className="hover:text-neutral-700 transition-colors">Use Cases</Link>
            <Link href="/pricing" className="hover:text-neutral-700 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
