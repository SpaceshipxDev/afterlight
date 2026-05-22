import Link from 'next/link';

export const metadata = {
  title: 'Creator Data Rights Policy — Afterlight',
  description:
    'Five guarantees Afterlight makes to every creator on the platform. Your likeness is not for sale. Your data is not for sale. Nothing posts without your approval.',
};

const LAST_UPDATED = 'May 22, 2026';

const guarantees: { id: string; title: string; body: string }[] = [
  {
    id: 'no-likeness-sale',
    title: '1. Your likeness is never sold.',
    body: 'Afterlight does not sell, rent, sublicense, syndicate, or otherwise transfer your face to any third party. Each campaign you approve is a one-time license to a single brand for a defined channel, geography, and date window. Nothing more. There is no aggregate likeness library being assembled in the background.',
  },
  {
    id: 'no-data-sale',
    title: '2. Your data is never sold.',
    body: 'We do not sell personal information. We do not share it with data brokers. We do not pass it to advertisers for cross-context targeting. Afterlight earns from the agencies and brands who pay to use the generation platform — that is the entire business model. There is no second revenue line running on your data.',
  },
  {
    id: 'approval-gate',
    title: '3. Nothing posts without you.',
    body: 'No AI-generated content that depicts you can publish to any platform without your explicit, per-asset approval inside Afterlight. The gate is enforced in code. Any agency or brand that attempts to publish without an approval record is in immediate breach and loses its license.',
  },
  {
    id: 'not-training-data',
    title: '4. Your face is not training data.',
    body: 'Reference photos you upload are used to generate the campaign assets you approve. They are not used to train foundation models, build biometric templates, or fine-tune systems that will later identify you elsewhere. Our generation providers operate under contracts that prohibit them from retaining your image beyond the request lifecycle or training their own models on it.',
  },
  {
    id: 'revoke',
    title: '5. You can pull the plug.',
    body: 'You can revoke any campaign license at any time. You can delete your reference photos at any time. You can close your account at any time. On revocation, the agency or brand running the campaign has 72 hours to take paid placements down and 7 days for organic. On deletion, your reference assets are removed from active systems within 30 days and from backups within 90.',
  },
];

const rights: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'how-consent-works',
    title: '6. How consent actually works on Afterlight',
    body: (
      <>
        <p>
          Every campaign on Afterlight is gated by an approval record. The agency or brand running
          the campaign cannot generate content depicting you until you have accepted their brief
          inside the platform. Once drafts are rendered, they sit in your queue. You can approve,
          request changes, or reject each asset individually. Only assets you have personally
          approved become licensed.
        </p>
        <p>
          The approval record captures: which assets you approved, the date you approved them,
          the channels they can run on, the geographies they can run in, and the date the license
          expires. That record is the entire universe of what the licensee is allowed to do.
          Anything outside it is a breach of our Terms.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-do-not-do',
    title: '7. What we will never do, in plain English',
    body: (
      <>
        <ul className="list-disc pl-6 space-y-3">
          <li>We will not sell your likeness as a stock asset, a template, an avatar, or a model.</li>
          <li>We will not bundle your face into a dataset and sell access to other companies.</li>
          <li>We will not train an internal model on your photos to generate &ldquo;creators like you&rdquo; for someone else.</li>
          <li>We will not run a campaign you have not approved, even if the agency or brand asks nicely.</li>
          <li>We will not retain your reference photos after you delete them, except in the encrypted backup window described above.</li>
          <li>We will not surprise you with a policy change that weakens any of these guarantees. Material changes are announced by email 14 days before they take effect, and we will not apply them retroactively to campaigns you already approved.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'where-afterlight-sits',
    title: '8. Where Afterlight sits in the deal',
    body: (
      <>
        <p>
          Afterlight is the generation and consent layer. We make it possible for an agency or
          brand to produce licensed AI content, and we make sure nothing reaches your audience
          without your explicit approval. We are not the party hiring you, paying you, or running
          your campaigns end-to-end.
        </p>
        <p>
          Your compensation for any campaign is set by the agency or brand running it, on whatever
          terms you negotiated directly with them. Afterlight is not a party to that arrangement,
          does not hold or disburse your earnings, and does not take a cut of what you are paid.
          Our revenue comes from the agencies and brands who pay to use the platform — that is
          the whole business model.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-exercise',
    title: '9. How to exercise your rights',
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
            . The licensee has 72 hours to take paid placements down.
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
            . We enforce takedowns within 72 hours and pursue the licensee for breach.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'why',
    title: '10. Why we publish this',
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
            <Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link>
            <Link href="/api" className="hover:text-neutral-900 transition-colors">API</Link>
            <Link href="/cdrp" className="text-neutral-900">Trust</Link>
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
        <div className="max-w-[720px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-10 md:pb-14">
          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.1]">
            Creator Data Rights Policy
          </h1>
          <p className="text-[13px] text-neutral-500 mt-4 italic">Effective {LAST_UPDATED}</p>
          <p className="text-[15px] text-neutral-600 leading-[1.75] mt-8">
            Afterlight is the generation and consent layer for licensed AI influencer content.
            Agencies and brands use it to produce short-form ads; creators consent before anything
            is generated, and again before anything is published. Below are five guarantees we
            make to every creator on the platform, followed by the mechanics behind each promise.
            Your face is not a product.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <nav aria-label="Section navigation" className="mb-2 pb-10 border-b border-neutral-100">
            <ol className="text-[13px] leading-[1.9] text-neutral-500 columns-1 sm:columns-2 gap-x-10">
              {[...guarantees, ...rights].map((s) => (
                <li key={s.id} className="break-inside-avoid">
                  <a href={`#${s.id}`} className="hover:text-neutral-900 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="text-[15px] leading-[1.75] text-neutral-700">
            {guarantees.map((s, idx) => (
              <article
                key={s.id}
                id={s.id}
                className={
                  'scroll-mt-24 py-10 md:py-12 ' +
                  (idx === 0 ? 'pt-10 md:pt-12' : 'border-t border-neutral-100')
                }
              >
                <h2 className="text-[17px] font-semibold tracking-tight text-neutral-900 mb-5">
                  {s.title}
                </h2>
                <p>{s.body}</p>
              </article>
            ))}

            {rights.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-24 py-10 md:py-12 border-t border-neutral-100"
              >
                <h2 className="text-[17px] font-semibold tracking-tight text-neutral-900 mb-5">
                  {s.title}
                </h2>
                <div className="space-y-4">{s.body}</div>
              </article>
            ))}
          </div>

          <p className="mt-14 pt-10 border-t border-neutral-100 text-[13px] text-neutral-500 leading-[1.75]">
            See also the{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-neutral-900">
              Terms of Service
            </Link>{' '}
            for the underlying contract and the{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-neutral-900">
              Privacy Policy
            </Link>{' '}
            for the broader data practices that apply to brands, employees, and visitors.
          </p>
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
