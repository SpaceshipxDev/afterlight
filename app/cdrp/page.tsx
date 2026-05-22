import Link from 'next/link';
import { PiTriangleBold } from 'react-icons/pi';

export const metadata = {
  title: 'Creator Data Rights Policy — Afterlight',
  description:
    'Five guarantees Afterlight makes to every creator on the platform. Your likeness is not for sale. Your data is not for sale. Nothing posts without your approval.',
};

const LAST_UPDATED = 'May 22, 2026';

const pillars: { kicker: string; title: string; body: string }[] = [
  {
    kicker: '01',
    title: 'Your likeness is never sold.',
    body: 'Afterlight does not sell, rent, sublicense, syndicate, or otherwise transfer your face to any third party. Each campaign you approve is a one-time license to a single brand for a defined channel, geography, and date window. Nothing more. There is no aggregate likeness library being assembled in the background.',
  },
  {
    kicker: '02',
    title: 'Your data is never sold.',
    body: 'We do not sell personal information. We do not share it with data brokers. We do not pass it to advertisers for cross-context targeting. We earn our 30% from the campaigns you approve — that is the entire business model. There is no second revenue line running on your data.',
  },
  {
    kicker: '03',
    title: 'Nothing posts without you.',
    body: 'No AI-generated content that depicts you can publish to any platform without your explicit, per-asset approval inside Afterlight. The gate is enforced in code. A brand that attempts to publish without an approval record is in immediate breach and loses its license.',
  },
  {
    kicker: '04',
    title: 'Your face is not training data.',
    body: 'Reference photos you upload are used to generate the campaign assets you approve. They are not used to train foundation models, build biometric templates, or fine-tune systems that will later identify you elsewhere. Our generation providers operate under contracts that prohibit them from retaining your image beyond the request lifecycle or training their own models on it.',
  },
  {
    kicker: '05',
    title: 'You can pull the plug.',
    body: 'You can revoke any campaign license at any time. You can delete your reference photos at any time. You can close your account at any time. On revocation, brands have 72 hours to take paid campaigns down and 7 days for organic. On deletion, your reference assets are removed from active systems within 30 days and from backups within 90.',
  },
];

const rights: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'how-consent-works',
    title: 'How consent actually works on Afterlight',
    body: (
      <>
        <p>
          Every campaign on Afterlight is gated by an approval record. A brand cannot generate
          content depicting you until you have accepted their brief inside the platform. Once
          drafts are rendered, they sit in your queue. You can approve, request changes, or
          reject each asset individually. Only assets you have personally approved become licensed.
        </p>
        <p>
          The approval record captures: which assets you approved, the date you approved them, the
          channels they can run on, the geographies they can run in, and the date the license
          expires. That record is the entire universe of what the brand is allowed to do. Anything
          outside it is a breach of our Terms.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-do-not-do',
    title: 'What we will never do, in plain English',
    body: (
      <>
        <ul className="list-disc pl-6 space-y-3">
          <li>We will not sell your likeness as a stock asset, a template, an avatar, or a model.</li>
          <li>We will not bundle your face into a dataset and sell access to other companies.</li>
          <li>We will not train an internal model on your photos to generate &ldquo;creators like you&rdquo; for someone else.</li>
          <li>We will not run a campaign you have not approved, even if the brand asks nicely.</li>
          <li>We will not retain your reference photos after you delete them, except in the encrypted backup window described above.</li>
          <li>We will not surprise you with a policy change that weakens any of these guarantees. Material changes are announced by email 14 days before they take effect, and we will not apply them retroactively to campaigns you already approved.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'compensation',
    title: 'Compensation, transparency, and the 30%',
    body: (
      <>
        <p>
          Afterlight takes a flat 30% platform fee on the gross budget of each paid AI-generated
          campaign you approve. The remaining 70% goes to you. The fee is visible inside the
          campaign brief before you accept it. There is no markup we hide, no second cut routed
          through an opaque subsidiary, and no clause that lets us claim more if the campaign
          performs well.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-exercise',
    title: 'How to exercise your rights',
    body: (
      <>
        <p>
          You can do most of this directly from your account. For anything you cannot, one email
          is enough:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <strong>Revoke a campaign:</strong> from the campaign page, or by writing to{' '}
            <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:rights@tryafterlight.com">
              rights@tryafterlight.com
            </a>
            . Brands have 72 hours to take paid placements down.
          </li>
          <li>
            <strong>Delete reference photos:</strong> from the account page, or by writing to the
            same address. Affected campaigns are paused.
          </li>
          <li>
            <strong>Close your account:</strong> write to{' '}
            <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:rights@tryafterlight.com">
              rights@tryafterlight.com
            </a>
            . All active licenses revert immediately.
          </li>
          <li>
            <strong>Audit your record:</strong> request a copy of every campaign license, approval
            timestamp, and asset associated with your account. We send it within 30 days.
          </li>
          <li>
            <strong>Report misuse:</strong> if you find content depicting you that you did not
            approve, write to{' '}
            <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:rights@tryafterlight.com">
              rights@tryafterlight.com
            </a>
            . We enforce takedowns within 72 hours and pursue the brand for breach.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'why',
    title: 'Why we publish this',
    body: (
      <>
        <p>
          The honest reason: AI generation has made it trivial to create video of anyone doing
          anything. Most platforms in this space treat creator consent as a checkbox. We have built
          the company around treating it as the product. If we ever weaken these guarantees,
          creators should leave — and that pressure is the point.
        </p>
        <p>
          If you have questions or want to challenge anything written here, write to the founders
          directly:{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:harry@tryafterlight.com">
            harry@tryafterlight.com
          </a>{' '}
          ·{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:lorin@tryafterlight.com">
            lorin@tryafterlight.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function CdrpPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center text-black" style={{ gap: '0.25em', fontSize: '18px' }}>
            <PiTriangleBold style={{ width: '1.25em', height: '1.25em' }} />
            <span className="font-semibold tracking-tight leading-none">Afterlight</span>
          </Link>
          <div className="flex items-center gap-7 text-[14px] font-medium text-neutral-600">
            <Link href="/use-cases" className="hover:text-neutral-900 transition-colors">Use Cases</Link>
            <Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link>
            <Link href="/api" className="hover:text-neutral-900 transition-colors">API</Link>
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
        <div className="max-w-[900px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-14 md:pb-20">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-5">
            Creator Data Rights Policy
          </p>
          <h1 className="text-[44px] md:text-[68px] lg:text-[76px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.04]">
            Your face is not a product.
          </h1>
          <p className="text-[17px] md:text-[19px] text-neutral-500 leading-relaxed max-w-2xl mt-6 tracking-[-0.005em]">
            Afterlight is built on per-campaign creator consent. Below is everything we promise
            creators on the platform, written plainly, and the mechanics behind each promise.
          </p>
          <p className="text-[14px] text-neutral-400 mt-7">Last updated {LAST_UPDATED}.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-neutral-100">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-10">
            Five guarantees
          </p>
          <div className="grid gap-5 md:gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.kicker}
                className="rounded-[24px] border border-neutral-200 bg-white p-7 md:p-9"
              >
                <p className="text-[12px] font-semibold tracking-[0.22em] text-neutral-400 mb-5">
                  {p.kicker}
                </p>
                <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-neutral-900 leading-[1.2]">
                  {p.title}
                </h3>
                <p className="text-[15px] text-neutral-600 leading-relaxed mt-4">{p.body}</p>
              </article>
            ))}
            <article className="rounded-[24px] bg-neutral-900 text-white p-7 md:p-9 flex flex-col justify-between">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.22em] text-white/55 mb-5">
                  Enforcement
                </p>
                <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.015em] leading-[1.2]">
                  The approval gate is the product.
                </h3>
                <p className="text-[15px] text-white/70 leading-relaxed mt-4">
                  If a brand ever runs a campaign depicting you without an approval record on
                  file, write to us. We treat it as a material breach, force a takedown within 72
                  hours, and terminate the brand&rsquo;s account.
                </p>
              </div>
              <a
                href="mailto:rights@tryafterlight.com"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-white mt-8 hover:opacity-80 transition-opacity"
              >
                rights@tryafterlight.com
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-[820px] mx-auto px-6 md:px-12">
          <nav aria-label="Section navigation" className="mb-12 md:mb-16 border-l-2 border-neutral-100 pl-5">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-4">Contents</p>
            <ol className="space-y-1.5 text-[14px] text-neutral-500">
              {rights.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-neutral-900 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-14 text-[16px] leading-[1.75] text-neutral-700">
            {rights.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.01em] text-neutral-900 mb-4">
                  {s.title}
                </h2>
                <div className="space-y-4">{s.body}</div>
              </article>
            ))}
          </div>

          <div className="mt-20 rounded-[24px] border border-neutral-200 bg-neutral-50 p-7 md:p-9">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-4">
              Related
            </p>
            <p className="text-[15px] text-neutral-600 leading-relaxed">
              This policy is the creator-facing summary. For the underlying contract see the{' '}
              <Link href="/terms" className="underline underline-offset-4 text-neutral-900 hover:text-black">
                Terms of Service
              </Link>
              . For the broader data practices that apply to brands, employees, and visitors,
              see the{' '}
              <Link href="/privacy" className="underline underline-offset-4 text-neutral-900 hover:text-black">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-y-4 text-[12px] text-neutral-400">
          <span>&copy; {new Date().getFullYear()} Afterlight, Inc.</span>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/use-cases" className="hover:text-neutral-700 transition-colors">Use Cases</Link>
            <Link href="/pricing" className="hover:text-neutral-700 transition-colors">Pricing</Link>
            <Link href="/api" className="hover:text-neutral-700 transition-colors">API</Link>
            <Link href="/terms" className="hover:text-neutral-700 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-neutral-700 transition-colors">Privacy</Link>
            <Link href="/cdrp" className="hover:text-neutral-700 transition-colors">Creator Rights</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
