import Link from 'next/link';

export type LegalSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

export type LegalRelated = {
  href: string;
  title: string;
  blurb: string;
};

export const legalDocs: LegalRelated[] = [
  {
    href: '/terms',
    title: 'Brand Services Agreement',
    blurb: 'For brands and agencies generating product photography on Afterlight.',
  },
  {
    href: '/influencer-agreement',
    title: 'Influencer Agreement',
    blurb: 'For creators participating in Afterlight marketing campaigns.',
  },
  {
    href: '/privacy',
    title: 'Privacy Policy',
    blurb: 'What we collect, how we use it, and the rights you keep.',
  },
];

function LegalNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link href="/" aria-label="Afterlight home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/afterlight-wordmark.svg"
            alt="Afterlight"
            width={919}
            height={193}
            className="h-[22px] w-auto select-none"
          />
        </Link>
        <div className="flex items-center gap-7 text-[13px] font-normal text-[#6e6e73]">
          <Link href="/use-cases" className="hover:text-[#1d1d1f] transition-colors">Use Cases</Link>
          <Link href="/pricing" className="hover:text-[#1d1d1f] transition-colors">Pricing</Link>
          <Link href="/api" className="hover:text-[#1d1d1f] transition-colors hidden sm:inline">API</Link>
          <Link href="/login" className="hover:text-[#1d1d1f] transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
}

function LegalFooter() {
  return (
    <footer className="border-t border-black/5 mt-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-y-4 text-[12px] text-[#86868b]">
        <span>&copy; {new Date().getFullYear()} Afterlight, Inc.</span>
        <div className="flex items-center gap-6 flex-wrap">
          <Link href="/use-cases" className="hover:text-[#1d1d1f] transition-colors">Use Cases</Link>
          <Link href="/pricing" className="hover:text-[#1d1d1f] transition-colors">Pricing</Link>
          <Link href="/api" className="hover:text-[#1d1d1f] transition-colors">API</Link>
          <Link href="/terms" className="hover:text-[#1d1d1f] transition-colors">Brand Terms</Link>
          <Link href="/influencer-agreement" className="hover:text-[#1d1d1f] transition-colors">Influencer Terms</Link>
          <Link href="/privacy" className="hover:text-[#1d1d1f] transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}

export default function LegalPage({
  title,
  kicker,
  effective,
  lede,
  sections,
  disclaimer,
  current,
}: {
  title: string;
  kicker: string;
  effective: string;
  lede?: React.ReactNode;
  sections: LegalSection[];
  disclaimer?: React.ReactNode;
  current?: string;
}) {
  const related = legalDocs.filter((d) => d.href !== current);
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] font-sans antialiased selection:bg-neutral-200">
      <LegalNav />

      {/* Masthead */}
      <header className="max-w-[760px] mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-12 md:pb-16">
        <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#86868b]">
          {kicker}
        </p>
        <h1 className="mt-5 text-[40px] md:text-[56px] font-semibold tracking-[-0.025em] leading-[1.05] text-[#1d1d1f]">
          {title}
        </h1>
        <p className="mt-6 text-[13px] text-[#86868b]">Effective {effective}</p>
        {lede ? (
          <div className="mt-8 text-[19px] md:text-[21px] leading-[1.55] tracking-[-0.01em] text-[#424245]">
            {lede}
          </div>
        ) : null}
      </header>

      {/* Contents */}
      <section className="max-w-[760px] mx-auto px-6 md:px-10">
        <div className="border-t border-black/8 pt-8">
          <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#86868b] mb-5">
            Contents
          </p>
          <ol className="columns-1 sm:columns-2 gap-x-12 text-[14px] leading-[2.1] text-[#6e6e73]">
            {sections.map((s) => (
              <li key={s.id} className="break-inside-avoid">
                <a href={`#${s.id}`} className="hover:text-[#1d1d1f] transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[760px] mx-auto px-6 md:px-10">
        <div className="legal-body text-[17px] leading-[1.68] text-[#424245]">
          {sections.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-20 border-t border-black/8 py-12 md:py-16"
            >
              <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-6 leading-[1.2]">
                {s.title}
              </h2>
              <div className="space-y-5">{s.body}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Related documents */}
      <section className="max-w-[760px] mx-auto px-6 md:px-10 pt-4 pb-20">
        <div className="border-t border-black/8 pt-10">
          <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#86868b] mb-6">
            Related agreements
          </p>
          <div className="grid gap-3">
            {related.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group flex items-start justify-between gap-6 rounded-2xl border border-black/8 px-6 py-5 hover:border-black/25 transition-colors"
              >
                <span>
                  <span className="block text-[16px] font-medium text-[#1d1d1f]">{d.title}</span>
                  <span className="block text-[14px] text-[#86868b] mt-1 leading-[1.5]">{d.blurb}</span>
                </span>
                <span className="text-[#c7c7cc] group-hover:text-[#1d1d1f] transition-colors mt-1 shrink-0">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>

          {disclaimer ? (
            <p className="mt-10 text-[12px] leading-[1.7] text-[#a1a1a6]">{disclaimer}</p>
          ) : null}
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}
