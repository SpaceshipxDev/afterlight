import Image from 'next/image';

const demoData = {
  agencyName: 'Million Dollar Baby',
  clientName: "Carter's by DaVinci",
  skus: [
    {
      id: 'sku1',
      displayName: 'Colby 4-in-1 Low-Profile Convertible Crib',
      originalTitle: 'Colby 4-in-1 Low-Profile Convertible Crib',
      originalLink:
        'https://davincibaby.com/products/colby-4-in-1-low-profile-convertible-crib?variant=29207675699293',
      inputs: ['/million-dollar-baby/IMG_3689.webp'],
      outputs: [
        '/million-dollar-baby/IMG_3695.jpeg',
        '/million-dollar-baby/IMG_3696.jpeg',
        '/million-dollar-baby/IMG_3700.jpeg',
      ],
    },
  ],
};

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
    {title}
  </h2>
);

const SourceLinkButton = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-1 rounded-md border border-neutral-200 px-4 py-3 text-[13px] font-medium text-black transition-colors hover:border-neutral-300 hover:text-neutral-500"
  >
    Source Link
    <svg
      width="10"
      height="10"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4L7.5 4C7.22386 4 7 3.77614 7 3.5C7 3.22386 7.22386 3 7.5 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  </a>
);

const MetadataLabel = ({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) => (
  <div className="flex items-start gap-3 text-[13px] leading-relaxed sm:items-center">
    <span className="mt-1 w-8 shrink-0 text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:mt-0">
      {label}
    </span>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 break-all text-black transition-colors hover:text-neutral-500 sm:break-normal"
      >
        Source Link
        <svg
          width="10"
          height="10"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4L7.5 4C7.22386 4 7 3.77614 7 3.5C7 3.22386 7.22386 3 7.5 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </a>
    ) : (
      <span className="text-black">{value}</span>
    )}
  </div>
);

export default function DemoPage() {
  const sku = demoData.skus[0];

  return (
    <main className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100">
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-[1600px] px-6 py-5 md:py-6">
          <h1 className="text-base font-bold uppercase tracking-widest text-black md:text-lg">
            Afterlight
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-12 md:py-32">
        <div className="mb-20 md:mb-24">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500 md:mb-4 md:text-[12px]">
            Demo // {demoData.agencyName}
          </p>

          <h2 className="text-4xl font-bold uppercase tracking-tighter text-black sm:text-5xl md:text-7xl">
            {demoData.clientName}
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-700 md:mt-6 md:text-xl">
            We took one crib photo and made the other bed versions in the same room.
          </p>
        </div>

        <div>
          <div className="mb-10 flex items-baseline gap-3 md:mb-16 md:gap-4">
            <span className="text-xs font-mono text-neutral-400 md:text-sm">01</span>
            <h3 className="text-xl font-medium tracking-tight md:text-2xl">{sku.displayName}</h3>
          </div>

          <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-[minmax(0,4fr)_auto_minmax(0,8fr)] lg:gap-16">
            <div className="flex w-full flex-col">
              <SectionHeader title="Input" />

              <div className="mb-6 w-full max-w-[360px]">
                <div className="relative aspect-square overflow-hidden rounded-md border border-neutral-100 bg-[#fafafa]">
                  <Image
                    src={sku.inputs[0]}
                    alt={`${sku.displayName} Input`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 26vw"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 md:pt-4">
                <MetadataLabel label="SKU" value={sku.originalTitle} />
                <MetadataLabel label="URL" value={sku.originalLink} isLink={true} />
              </div>
            </div>

            <div className="hidden h-full items-center justify-center pt-8 lg:flex">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current stroke-[1.5] text-neutral-300"
              >
                <path
                  d="M4 12H20M20 12L13 5M20 12L13 19"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex justify-center py-10 opacity-60 lg:hidden">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current stroke-[1.5] text-neutral-400"
              >
                <path
                  d="M12 4V20M12 20L5 13M12 20L19 13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex w-full flex-col">
              <SectionHeader title="Afterlight" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
                {sku.outputs.map((src, idx) => {
                  const labels = ['Side rails', 'Half rails', 'Full bed'];

                  return (
                    <div key={idx} className="space-y-3">
                      <div className="relative aspect-square overflow-hidden rounded-md bg-[#f5f5f5]">
                        <Image
                          src={src}
                          alt={`${sku.displayName} Output ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <p className="text-sm font-medium text-black">{labels[idx]}</p>
                      {idx === sku.outputs.length - 1 ? (
                        <div className="md:hidden">
                          <SourceLinkButton href={sku.originalLink} />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 hidden md:block">
                <SourceLinkButton href={sku.originalLink} />
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-24 flex items-center justify-between border-t border-neutral-100 pt-10 text-[11px] font-medium text-neutral-400 md:mt-40 md:pt-12 md:text-[13px]">
          <span>&copy; {new Date().getFullYear()} Afterlight</span>
          <span>Confidential</span>
        </footer>
      </div>
    </main>
  );
}
