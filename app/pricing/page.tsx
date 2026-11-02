import Link from 'next/link';

export const metadata = {
  title: 'Pricing — Afterlight',
  description: 'Try Afterlight free with 10 SKUs.',
};

const trialIncludes = [
  '10 SKUs generated',
  'Brand-trained on your catalog',
  'Source files at full PDP resolution',
  'Reply within 24 hours',
];

const enterpriseIncludes = [
  'Unlimited generations during the pilot',
  'Direct Slack with the founders',
  'White-glove onboarding',
  'Quoted to catalog size and turnaround',
];

const trialMailto =
  'mailto:harry@tryafterlight.com,lorin@tryafterlight.com?subject=10-SKU%20free%20trial';
const enterpriseMailto =
  'mailto:harry@tryafterlight.com,lorin@tryafterlight.com?subject=Afterlight%20enterprise%20pilot';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Afterlight home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/afterlight-wordmark.svg"
              alt="Afterlight"
              width={919}
              height={193}
              className="h-6 w-auto select-none"
            />
          </Link>
          <div className="flex items-center gap-7 text-[14px] font-medium text-neutral-600">
            <Link href="/use-cases" className="hover:text-neutral-900 transition-colors">Use Cases</Link>
            <Link href="/pricing" className="text-neutral-900">Pricing</Link>
            <Link href="/api" className="hover:text-neutral-900 transition-colors">API</Link>
            <Link href="/cdrp" className="hover:text-neutral-900 transition-colors">Trust</Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-neutral-700 border border-neutral-200 rounded-full px-5 py-2 text-[14px] font-medium hover:text-black hover:border-black hover:bg-neutral-50 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="border-b border-neutral-100">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-14 md:pb-20 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
            Pricing
          </p>
          <h1 className="text-[44px] md:text-[68px] lg:text-[76px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.04]">
            Try Afterlight free.
          </h1>
          <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-2xl mx-auto mt-6 tracking-[-0.005em]">
            Send 10 product photos. We generate campaign-ready images in your brand’s style. No commitment, no payment.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Free trial — primary */}
          <div className="rounded-[28px] bg-neutral-900 text-white p-8 md:p-10 relative overflow-hidden">
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60">
                Free trial
              </p>
              <p className="text-[12px] text-white/50">Start here</p>
            </div>

            <h2 className="text-[40px] md:text-[52px] font-medium tracking-[-0.02em] leading-none">
              10 SKUs
            </h2>
            <p className="text-[16px] text-white/60 mt-3 leading-relaxed">
              On us. No card required.
            </p>

            <div className="my-7 border-t border-white/10" />

            <ul className="space-y-3 mb-8">
              {trialIncludes.map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] text-white/85 leading-relaxed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white mt-0.5 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>

            <a
              href={trialMailto}
              className="inline-flex w-full items-center justify-center gap-2 bg-white text-black rounded-full px-7 py-4 text-[15px] font-semibold tracking-tight hover:bg-neutral-100 transition-colors"
            >
              Start free trial
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <p className="text-center text-[12px] text-white/45 mt-4">
              Or write to{' '}
              <a href="mailto:harry@tryafterlight.com" className="text-white/75 hover:text-white underline underline-offset-2">harry@tryafterlight.com</a>{' '}
              ·{' '}
              <a href="mailto:lorin@tryafterlight.com" className="text-white/75 hover:text-white underline underline-offset-2">lorin@tryafterlight.com</a>
            </p>
          </div>

          {/* Enterprise — secondary */}
          <div className="rounded-[28px] border border-neutral-200 bg-white p-8 md:p-10">
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500">
                Enterprise
              </p>
              <p className="text-[12px] text-neutral-400">For brands at scale</p>
            </div>

            <h2 className="text-[40px] md:text-[52px] font-medium tracking-[-0.02em] text-neutral-900 leading-none">
              Custom
            </h2>
            <p className="text-[16px] text-neutral-500 mt-3 leading-relaxed">
              Quoted to scope. Pilots run 1–4 weeks.
            </p>

            <div className="my-7 border-t border-neutral-100" />

            <ul className="space-y-3 mb-8">
              {enterpriseIncludes.map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] text-neutral-700 leading-relaxed">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 mt-0.5 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>

            <a
              href={enterpriseMailto}
              className="inline-flex w-full items-center justify-center gap-2 bg-white text-neutral-900 border border-neutral-300 rounded-full px-7 py-4 text-[15px] font-semibold tracking-tight hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              Talk to a founder
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <p className="text-center text-[12px] text-neutral-400 mt-4">
              We reply within 24 hours.
            </p>
          </div>
        </div>

        <p className="text-center text-[13px] text-neutral-400 mt-12 max-w-xl mx-auto px-6">
          Self-serve plans are coming. For now, every customer goes through a pilot first.
        </p>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[12px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight, Inc.</span>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/use-cases" className="hover:text-neutral-700 transition-colors">Use Cases</Link>
              <Link href="/pricing" className="hover:text-neutral-700 transition-colors">Pricing</Link>
              <Link href="/api" className="hover:text-neutral-700 transition-colors">API</Link>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-neutral-400/85">
              <Link href="/terms" className="hover:text-neutral-700 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-neutral-700 transition-colors">Privacy</Link>
              <Link href="/cdrp" className="hover:text-neutral-700 transition-colors">Trust</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
