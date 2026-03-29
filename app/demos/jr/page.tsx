import Image from 'next/image';

const demoData = {
  agencyName: 'Afterlight',
  clientName: 'JR Cigars',
  heroText:
    'we took one group photo and turned it into individual product photos for each cigar',
  skus: [
    {
      id: 'sku1',
      displayName: 'Montecristo Lovers Edition II',
      productTitle: 'Montecristo Lovers Edition II',
      skuCode: 'MXP5S',
      originalLink:
        'https://www.jrcigars.com/item/cigar-samplers/montecristo-lovers-edition-ii/MXP5S.html#start=1',
      inputs: ['/jr/IMG_3748.jpeg'],
      outputs: [
        '/jr/Generated Image March 28, 2026 - 5_13PM.jpeg',
        '/jr/IMG_3747.png',
        '/jr/IMG_3750.png',
        '/jr/IMG_3755.jpeg',
        '/jr/Generated Image March 28, 2026 - 5_27PM (1).jpeg',
        '/jr/IMG_3754.jpeg',
        '/jr/Generated Image March 28, 2026 - 5_30PM.jpeg',
      ],
    },
    {
      id: 'sku2',
      displayName: 'Boneshaker Lunatic 3 Cigar Sampler',
      productTitle: 'Boneshaker Lunatic 3 Cigar Sampler',
      skuCode: 'BSL3SMP',
      originalLink:
        'https://www.jrcigars.com/item/boneshaker-lunatic/3-cigar-sampler/BSL3SMP.html',
      inputs: ['/jr/IMG_3749.jpeg'],
      outputs: [
        '/jr/Generated Image March 28, 2026 - 5_37PM.jpeg',
        '/jr/Generated Image March 28, 2026 - 5_43PM.jpeg',
        '/jr/Generated Image March 28, 2026 - 5_38PM.jpeg',
      ],
    },
  ],
};

const SectionHeader = ({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) => (
  <h2
    className={`mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black ${className}`}
  >
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
    <span className="mt-1 w-10 shrink-0 text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:mt-0">
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

const PipelineDivider = () => (
  <>
    <div className="hidden lg:flex h-full items-center justify-center px-10 xl:px-14 pt-10">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-200 bg-white shadow-[0_0_0_8px_rgba(255,255,255,1)]">
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          className="text-neutral-800 stroke-current stroke-[2.8]"
        >
          <path
            d="M3 12H21M21 12L13 4M21 12L13 20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    <div className="flex justify-center py-12 lg:hidden">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-200 bg-white shadow-[0_0_0_8px_rgba(255,255,255,1)]">
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          className="text-neutral-800 stroke-current stroke-[2.8]"
        >
          <path
            d="M12 3V21M12 21L4 13M12 21L20 13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </>
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
            Demo
          </p>
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-black sm:text-5xl md:text-7xl">
            {demoData.clientName}
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-neutral-600 md:mt-6 md:text-[18px]">
            {demoData.heroText}
          </p>
        </div>

        {demoData.skus.map((sku, index) => (
          <div
            key={sku.id}
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
                {sku.displayName}
              </h3>
            </div>

            <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-[minmax(0,3fr)_auto_minmax(0,8fr)] lg:gap-14 xl:gap-20">
              <div className="flex w-full flex-col">
                <SectionHeader title="Input" />

                <div className="mb-6 w-full max-w-[400px]">
                  {sku.inputs.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square w-full overflow-hidden rounded-md border border-neutral-100 bg-[#fafafa]"
                    >
                      <Image
                        src={src}
                        alt={`${sku.displayName} Input ${idx + 1}`}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 1024px) 100vw, 30vw"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2 md:pt-4">
                  <MetadataLabel label="Title" value={sku.productTitle} />
                  <MetadataLabel label="SKU" value={sku.skuCode} />
                  <MetadataLabel label="URL" value={sku.originalLink} isLink />
                </div>
              </div>

              <PipelineDivider />

              <div className="flex w-full flex-col">
                <SectionHeader
                  title="Generated Results"
                  className="text-[13px] md:text-[14px]"
                />

                <div
                  className={`grid gap-4 lg:gap-6 ${
                    sku.outputs.length === 5
                      ? 'grid-cols-2 md:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-3'
                  }`}
                >
                  {sku.outputs.map((src, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="relative aspect-square overflow-hidden rounded-md bg-[#f5f5f5]">
                        <Image
                          src={src}
                          alt={`${sku.displayName} Generated Output ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      {idx === sku.outputs.length - 1 ? (
                        <div className="mt-4 md:hidden">
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
