import Image from 'next/image';
import Link from 'next/link';
import { PiTriangleBold } from 'react-icons/pi';

type PaintOption = {
  label: string;
  name: string;
  code: string;
  swatch: string;
};

type Scene = {
  id: string;
  roomTitle: string;
  before: string;
  after: string;
  paintOptions: PaintOption[];
};

const pilot = {
  brand: 'Behr',
  logo: '/logos/behr.svg',
  logoH: 36,
  headline: 'Restyled without a reshoot.',
  lede:
    'A four-week pilot turning existing Behr room photography into campaign-ready creative for new color drops — using the actual Behr palette, no studio time, no repaint.',
  scope: '3 rooms',
  output: '3 final scenes',
  timeline: '4-day sprint',
  status: 'Active',
  scenes: [
    {
      id: 'sage',
      roomTitle: 'Bitter Sage Dining Nook',
      before: '/behr/Generated%20Image%20March%2029,%202026%20-%203.jpg',
      after: '/behr/Gemini_Generated_Image_ucwjxeucwjxeucwj.jpg',
      paintOptions: [
        { label: 'Cabinets', name: 'Bitter Sage', code: 'N390-4', swatch: '#99a189' },
        { label: 'Walls', name: 'Painter’s White', code: 'PPU18-08', swatch: '#eae4da' },
      ],
    },
    {
      id: 'blue',
      roomTitle: 'Admiral Blue Kitchen',
      before: '/behr/Gemini_Generated_Image_dk5i5wdk5i5wdk5i.jpg',
      after: '/behr/Gemini_Generated_Image_8txec8txec8txec8.jpg',
      paintOptions: [
        { label: 'Lower cabinets', name: 'Admiral Blue', code: 'M520-7', swatch: '#1e3f67' },
        { label: 'Upper cabinets', name: 'Cotton Knit', code: 'PPU7-11', swatch: '#ede6d9' },
      ],
    },
    {
      id: 'charcoal',
      roomTitle: 'Graphic Charcoal Kitchen',
      before: '/behr/Gemini_Generated_Image_pv3dpypv3dpypv3d.jpg',
      after: '/behr/Gemini_Generated_Image_om6fy5om6fy5om6f.jpg',
      paintOptions: [
        { label: 'Walls', name: 'Silky White', code: 'PPU7-12', swatch: '#ded8cf' },
        { label: 'Lower cabinets', name: 'Graphic Charcoal', code: 'N500-6', swatch: '#4a4849' },
      ],
    },
  ] satisfies Scene[],
};

const PaintSwatch = ({ paint }: { paint: PaintOption }) => (
  <div className="flex items-center gap-3">
    <div
      className="h-10 w-10 rounded-[8px] border border-neutral-200 shrink-0"
      style={{ backgroundColor: paint.swatch }}
    />
    <div className="leading-tight">
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-400">
        {paint.label}
      </p>
      <p className="text-[14px] font-medium tracking-[-0.005em] text-neutral-900 mt-1">
        {paint.name}
      </p>
      <p className="text-[12px] font-mono text-neutral-400 mt-0.5">{paint.code}</p>
    </div>
  </div>
);

export default function BehrPilotPage() {
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
            <img
              src={pilot.logo}
              alt={pilot.brand}
              style={{ height: pilot.logoH, width: 'auto' }}
              className="opacity-95"
              draggable={false}
            />
          </div>

          <h1 className="text-[44px] md:text-[68px] lg:text-[80px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.02] max-w-4xl mb-8">
            {pilot.headline}
          </h1>
          <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-2xl tracking-[-0.005em]">
            {pilot.lede}
          </p>

          {/* Meta grid */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 rounded-[16px] overflow-hidden border border-neutral-100">
            {[
              { label: 'Scope', value: pilot.scope },
              { label: 'Output', value: pilot.output },
              { label: 'Timeline', value: pilot.timeline },
              { label: 'Status', value: pilot.status },
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

      {/* Scene comparisons */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
        {pilot.scenes.map((scene, index) => (
          <section
            key={scene.id}
            className={index !== 0 ? 'mt-24 md:mt-40 pt-16 md:pt-20 border-t border-neutral-100' : ''}
          >
            <div className="flex items-baseline gap-3 mb-10 md:mb-14">
              <span className="font-mono text-[12px] md:text-[13px] text-neutral-400">
                0{index + 1}
              </span>
              <h2 className="text-[20px] md:text-[26px] font-medium tracking-[-0.015em] text-neutral-900">
                {scene.roomTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Before */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-5">
                  Before
                </p>
                <div className="relative aspect-[2876/1472] overflow-hidden rounded-[16px] bg-neutral-50 border border-neutral-100">
                  <Image
                    src={scene.before}
                    alt={`${scene.roomTitle} — source`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* After */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-5">
                  After
                </p>
                <div className="relative aspect-[2876/1472] overflow-hidden rounded-[16px] bg-neutral-100">
                  <Image
                    src={scene.after}
                    alt={`${scene.roomTitle} — generated`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>

            {/* Palette */}
            <div className="mt-8 md:mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {scene.paintOptions.map((paint) => (
                <PaintSwatch key={paint.code} paint={paint} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA footer */}
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
            Request access
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex items-center justify-between text-[12px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight</span>
          <Link href="/" className="hover:text-neutral-700 transition-colors">Afterlight</Link>
        </div>
      </footer>
    </main>
  );
}
