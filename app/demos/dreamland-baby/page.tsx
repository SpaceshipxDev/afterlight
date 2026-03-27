import Image from 'next/image';

const demoData = {
  clientName: 'Dreamland Baby',
  demoLabel: 'Client Demo',
  skus: [
    {
      id: 'sku1',
      displayName: 'Dream Baby Blanket',
      originalTitle: 'Dream Baby Blanket - Navy',
      originalLink: 'https://dreamlandbabyco.com/products/dream-baby-blanket-color-navy',
      inputs: ['/dreamland-baby/2024_navy_blanket_webwhite.webp'],
      outputs: [
        '/dreamland-baby/Generated Image March 25, 2026 - 10_44PM.jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_44PM (1).jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_48PM.jpg',
      ],
    },
    {
      id: 'sku2',
      displayName: 'Dream Weighted Sack Swaddle',
      originalTitle: 'Dream Weighted Sack Swaddle',
      originalLink: 'https://dreamlandbabyco.com/products/dream-weighted-sack-swaddle',
      inputs: ['/dreamland-baby/03.23_PDP_SW_1GreyStar_795b33a8-c952-432a-ad9b-ca3f0671c151.webp'],
      outputs: [
        '/dreamland-baby/Generated Image March 25, 2026 - 10_32PM.jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_34PM.jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_35PM.jpg',
      ],
    },
  ],
};

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black mb-6">
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
  <div className="text-[13px] leading-relaxed flex items-start sm:items-center gap-3">
    <span className="font-medium text-neutral-400 uppercase tracking-wider text-[10px] w-8 mt-1 sm:mt-0 shrink-0">
      {label}
    </span>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-neutral-500 transition-colors inline-flex items-center gap-1 break-all sm:break-normal"
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
  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-100 font-sans">
      <header className="border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-6 py-5 md:py-6">
          <h1 className="text-base md:text-lg font-bold tracking-widest text-black uppercase">
            Afterlight
          </h1>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-32">
        <div className="mb-20 md:mb-32">
          <p className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.15em] text-neutral-500 mb-3 md:mb-4">
            {demoData.demoLabel}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-black uppercase">
            {demoData.clientName}
          </h2>
        </div>

        {demoData.skus.map((sku, index) => (
          <div
            key={sku.id}
            className={`${index !== 0 ? 'mt-24 pt-16 md:mt-40 md:pt-20 border-t border-neutral-100' : ''}`}
          >
            <div className="mb-10 md:mb-16 flex items-baseline gap-3 md:gap-4">
              <span className="text-xs md:text-sm font-mono text-neutral-400">0{index + 1}</span>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">{sku.displayName}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_auto_minmax(0,7fr)] gap-0 lg:gap-16 items-start">
              <div className="flex flex-col w-full">
                <SectionHeader title="Input" />

                <div
                  className={`grid gap-3 md:gap-4 mb-6 ${sku.inputs.length === 1 ? 'grid-cols-1 w-2/3 max-w-[300px]' : 'grid-cols-2'}`}
                >
                  {sku.inputs.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square bg-[#fafafa] rounded-md overflow-hidden border border-neutral-100"
                    >
                      <Image
                        src={src}
                        alt={`${sku.displayName} Input ${idx + 1}`}
                        fill
                        className="object-contain p-4 mix-blend-multiply"
                        sizes="(max-w-1024px) 50vw, 20vw"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2 md:pt-4">
                  <MetadataLabel label="SKU" value={sku.originalTitle} />
                  <MetadataLabel label="URL" value={sku.originalLink} isLink={true} />
                </div>
              </div>

              <div className="hidden lg:flex h-full items-center justify-center pt-8">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-neutral-300 stroke-current stroke-[1.5]"
                >
                  <path
                    d="M4 12H20M20 12L13 5M20 12L13 19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex lg:hidden justify-center py-10 opacity-60">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-neutral-400 stroke-current stroke-[1.5]"
                >
                  <path
                    d="M12 4V20M12 20L5 13M12 20L19 13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col w-full">
                <SectionHeader title="Afterlight" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {sku.outputs.map((src, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="relative aspect-square bg-[#f5f5f5] rounded-md overflow-hidden">
                        <Image
                          src={src}
                          alt={`${sku.displayName} Try-on ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-w-768px) 100vw, 33vw"
                        />
                      </div>
                      {idx === sku.outputs.length - 1 ? (
                        <div className="md:hidden">
                          <SourceLinkButton href={sku.originalLink} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <footer className="mt-24 pt-10 md:mt-40 md:pt-12 border-t border-neutral-100 flex justify-between items-center text-[11px] md:text-[13px] font-medium text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight</span>
          <span>Confidential</span>
        </footer>
      </div>
    </main>
  );
}
