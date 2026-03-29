import Image from 'next/image';

type PaintOption = {
  label: string;
  name: string;
  code: string;
  swatch: string;
  href: string;
};

type DemoExample = {
  id: string;
  roomTitle: string;
  displayName: string;
  before: string;
  after: string;
  paintOptions: PaintOption[];
};

const demoData = {
  agencyName: 'Afterlight',
  clientName: 'Behr',
  heroText: 'We turned existing room photos into Behr ready campaign creative, no reshoot.',
  examples: [
    {
      id: 'sage',
      roomTitle: 'Bitter Sage Dining Nook',
      displayName: 'Sage set',
      before: '/behr/Generated%20Image%20March%2029,%202026%20-%203.jpg',
      after: '/behr/Gemini_Generated_Image_ucwjxeucwjxeucwj.jpg',
      paintOptions: [
        {
          label: 'Cabinets',
          name: 'Bitter Sage',
          code: 'N390-4',
          swatch: '#99a189',
          href: 'https://www.behr.com/consumer/ColorDetailView/N390-4',
        },
        {
          label: 'Walls',
          name: 'Painter’s White',
          code: 'PPU18-08',
          swatch: '#eae4da',
          href: 'https://www.behr.com/consumer/ColorDetailView/PPU18-08',
        },
      ],
    },
    {
      id: 'blue',
      roomTitle: 'Admiral Blue Kitchen',
      displayName: 'Blue set',
      before: '/behr/Gemini_Generated_Image_dk5i5wdk5i5wdk5i.jpg',
      after: '/behr/Gemini_Generated_Image_8txec8txec8txec8.jpg',
      paintOptions: [
        {
          label: 'Lower cabinets',
          name: 'Admiral Blue',
          code: 'M520-7',
          swatch: '#1e3f67',
          href: 'https://www.behr.com/consumer/ColorDetailView/M520-7',
        },
        {
          label: 'Upper cabinets',
          name: 'Cotton Knit',
          code: 'PPU7-11',
          swatch: '#ede6d9',
          href: 'https://www.behr.com/consumer/ColorDetailView/PPU7-11',
        },
      ],
    },
    {
      id: 'charcoal',
      roomTitle: 'Graphic Charcoal Kitchen',
      displayName: 'Charcoal set',
      before: '/behr/Gemini_Generated_Image_pv3dpypv3dpypv3d.jpg',
      after: '/behr/Gemini_Generated_Image_om6fy5om6fy5om6f.jpg',
      paintOptions: [
        {
          label: 'Walls',
          name: 'Silky White',
          code: 'PPU7-12',
          swatch: '#ded8cf',
          href: 'https://www.behr.com/consumer/ColorDetailView/PPU7-12',
        },
        {
          label: 'Lower cabinets',
          name: 'Graphic Charcoal',
          code: 'N500-6',
          swatch: '#4a4849',
          href: 'https://www.behr.com/consumer/ColorDetailView/N500-6',
        },
      ],
    },
  ] satisfies DemoExample[],
};

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black md:mb-8 md:text-[12px]">
    {title}
  </h2>
);

const PipelineDivider = () => (
  <>
    <div className="hidden h-full items-center justify-center px-6 pt-10 lg:flex xl:px-10">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d9d3ca] bg-[#fbf8f2] shadow-[0_18px_40px_rgba(122,105,83,0.12)]">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-current text-[#3f4348]"
        >
          <path
            d="M3 12H21M21 12L13 4M21 12L13 20"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    <div className="flex justify-center py-12 lg:hidden">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d9d3ca] bg-[#fbf8f2] shadow-[0_18px_40px_rgba(122,105,83,0.12)]">
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-current text-[#3f4348]"
        >
          <path
            d="M12 3V21M12 21L4 13M12 21L20 13"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </>
);

const PaintSwatch = ({ paint }: { paint: PaintOption }) => (
  <a
    href={paint.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block transition-transform hover:-translate-y-0.5"
  >
    <div
      className="h-[70px] w-[70px] border-[3px] border-white shadow-[0_12px_24px_rgba(80,68,55,0.14)] sm:h-[112px] sm:w-[112px]"
      style={{ backgroundColor: paint.swatch }}
    />
    <div className="pt-3 pl-1 text-[#4d5357]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#697076]">
        {paint.label}
      </p>
      <p className="mt-1 text-[16px] font-semibold uppercase leading-none tracking-[-0.03em] sm:text-[21px]">
        {paint.name}
      </p>
      <p className="mt-2 text-[13px] leading-none sm:text-[16px]">{paint.code}</p>
    </div>
  </a>
);

const BehrRoomCard = ({
  roomTitle,
  imageSrc,
  paintOptions,
  priority = false,
}: {
  roomTitle: string;
  imageSrc: string;
  paintOptions: PaintOption[];
  priority?: boolean;
}) => (
  <div className="rounded-[28px] border border-[#e9e1d6] bg-[#fbf8f2] p-3 shadow-[0_28px_60px_rgba(138,114,87,0.08)] sm:p-6">
    <p className="mb-5 text-[26px] font-semibold uppercase leading-none tracking-[-0.04em] text-[#5a6167] sm:mb-6 sm:text-[34px] md:text-[42px]">
      {roomTitle}
    </p>

    <a
      href={imageSrc}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-[4px] border border-[#f0e9df] bg-white p-0"
    >
      <div className="relative aspect-[2876/1472] overflow-hidden">
        <Image
          src={imageSrc}
          alt={roomTitle}
          fill
          className="object-cover scale-[1.045] sm:scale-100"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    </a>

    <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-wrap gap-4 sm:gap-5">
        {paintOptions.map((paint) => (
          <PaintSwatch key={paint.code} paint={paint} />
        ))}
      </div>

      <a
        href={imageSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="pr-1 text-left text-[18px] font-semibold tracking-[-0.02em] text-[#c46b4c] transition-colors hover:text-[#a9593f] md:pb-4 md:text-right md:text-[19px]"
      >
        View Full Image
      </a>
    </div>
  </div>
);

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100">
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-[1600px] px-6 py-5 md:py-6">
          <h1 className="text-base font-bold uppercase tracking-widest text-black md:text-lg">
            {demoData.agencyName}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-12 md:py-32">
        <div className="mb-20 md:mb-32">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500 md:mb-4 md:text-[12px]">
            Demo // {demoData.clientName}
          </p>
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-black sm:text-5xl md:text-7xl">
            {demoData.clientName}
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-neutral-600 md:mt-6 md:text-[18px]">
            {demoData.heroText}
          </p>
        </div>

        {demoData.examples.map((example, index) => (
          <div
            key={example.id}
            className={`${
              index !== 0
                ? 'mt-24 border-t border-neutral-100 pt-16 md:mt-40 md:pt-20'
                : ''
            }`}
          >
            <div className="mb-10 flex items-baseline gap-3 md:mb-16 md:gap-4">
              <span className="font-mono text-xs text-neutral-400 md:text-sm">
                0{index + 1}
              </span>
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                {example.displayName}
              </h3>
            </div>

            <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-[minmax(0,4fr)_auto_minmax(0,7fr)] lg:gap-14 xl:gap-20">
              <div className="flex w-full flex-col">
                <SectionHeader title="Before" />

                <div className="w-full">
                  <div className="relative aspect-[2876/1472] overflow-hidden rounded-[24px] border border-neutral-100 bg-[#f7f5f1] shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
                    <Image
                      src={example.before}
                      alt={`${example.roomTitle} before`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 36vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>

              <PipelineDivider />

              <div className="flex w-full flex-col">
                <SectionHeader title="Generated Results" />
                <BehrRoomCard
                  roomTitle={example.roomTitle}
                  imageSrc={example.after}
                  paintOptions={example.paintOptions}
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}

        <footer className="mt-24 flex items-center justify-between border-t border-neutral-100 pt-10 text-[11px] font-medium text-neutral-400 md:mt-40 md:pt-12 md:text-[13px]">
          <span>
            &copy; {new Date().getFullYear()} {demoData.agencyName}
          </span>
          <span>Confidential</span>
        </footer>
      </div>
    </main>
  );
}
