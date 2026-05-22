import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Terms of Service — Afterlight',
  description:
    'The agreement that governs how brands and creators use Afterlight to produce licensed influencer ads.',
};

const LAST_UPDATED = 'May 22, 2026';

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'agreement',
    title: '1. The agreement',
    body: (
      <>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) form a binding contract between you and
          Afterlight, Inc., a Delaware corporation with offices in San Francisco, California
          (&ldquo;Afterlight,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By creating an account,
          uploading content, or generating a campaign, you accept these Terms. If you are accepting
          on behalf of a company, you represent that you have authority to bind it.
        </p>
        <p>
          Afterlight is a generation and consent platform for licensed AI influencer content.
          Agencies and brands use Afterlight to produce short-form video ads with creator
          likenesses. Creators upload a reference photo and approve every asset before it leaves
          the platform. Afterlight provides the generation, approval, and recordkeeping workflow;
          the underlying campaign relationship — including any compensation paid to the creator —
          sits between the licensee running the campaign and the creator themselves. These Terms
          protect that workflow.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    body: (
      <>
        <p>
          You must be at least 18 years old to use Afterlight. Creators must be able to lawfully
          grant rights in their own likeness. Brands must be authorized to enter advertising
          contracts on behalf of the products they promote. We may refuse service to anyone, at any
          time, for any lawful reason.
        </p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: '3. Accounts and access',
    body: (
      <>
        <p>
          You are responsible for everything that happens under your account. Keep your credentials
          confidential. Do not share an account between multiple individuals. If you suspect
          unauthorized access, notify us immediately at{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:security@tryafterlight.com">
            security@tryafterlight.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'creator-license',
    title: '4. Creator license — what you actually grant',
    body: (
      <>
        <p>
          When a creator uploads a reference photo and approves a specific campaign, they grant
          the licensee identified in that campaign brief — typically the agency or brand running
          the campaign — a <strong>limited, revocable, campaign-specific license</strong> to use
          the resulting AI-generated content in the channels, geographies, and dates listed in
          that campaign&rsquo;s approval record. That license covers{' '}
          <em>that campaign and nothing else</em>.
        </p>
        <p>
          A creator never grants Afterlight or any licensee the right to: sell or sublicense
          their likeness, build a biometric profile, train a foundation model on their face,
          generate new content without their per-campaign approval, or run a campaign after the
          approved window expires. Those rights are not for sale. See our{' '}
          <Link className="underline underline-offset-4 hover:text-neutral-900" href="/cdrp">
            Creator Data Rights Policy
          </Link>{' '}
          for the full guarantee.
        </p>
      </>
    ),
  },
  {
    id: 'approval',
    title: '5. The approval gate is binding',
    body: (
      <>
        <p>
          No AI-generated content that depicts a creator may be published to any platform without
          that creator&rsquo;s explicit, per-asset approval recorded inside Afterlight. Licensees
          agree to treat the approval record as the sole authority on what is licensed. Posting
          an asset that has not been approved through Afterlight is a material breach of these
          Terms and terminates the licensee&rsquo;s license immediately.
        </p>
      </>
    ),
  },
  {
    id: 'customer-responsibilities',
    title: '6. Customer responsibilities',
    body: (
      <>
        <p>
          Customers — the agencies, brands, and other licensees who run campaigns on Afterlight —
          agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Disclose AI-generated content according to the rules of each platform you post to (including FTC endorsement guides and platform-specific AI-disclosure requirements).</li>
          <li>Only generate content depicting creators who have actively accepted your campaign brief inside Afterlight.</li>
          <li>Not use generated content to make claims the creator has not personally approved (medical, financial, political, or otherwise).</li>
          <li>Honor the channel, geography, and date window in each approval record.</li>
          <li>Pay Afterlight&rsquo;s platform fees on the schedule set out in your order form, and handle any compensation owed to the creator directly with that creator.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'creator-responsibilities',
    title: '7. Creator responsibilities',
    body: (
      <>
        <p>Creators using Afterlight agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Only upload reference photos that depict you and that you have the right to use.</li>
          <li>Review each campaign honestly. Approve only what you are genuinely comfortable posting to your audience.</li>
          <li>Comply with platform disclosure rules when posting approved campaigns to your channels.</li>
          <li>Not impersonate another person or upload material you do not own.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'prohibited',
    title: '8. Prohibited uses',
    body: (
      <>
        <p>You may not use Afterlight to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Generate content depicting a real person who has not granted you a license through Afterlight.</li>
          <li>Produce sexual content, content depicting minors, content that incites violence, or content that violates the law of any jurisdiction where it is published.</li>
          <li>Create political deepfakes, election misinformation, or impersonation of public officials.</li>
          <li>Train any machine-learning model on output you obtained through Afterlight, except internal analytics about your own campaigns.</li>
          <li>Circumvent the approval gate, scrape creator content from the platform, or attempt to extract biometric data from generated assets.</li>
          <li>Resell, redistribute, or license to any third party the generated content beyond the scope granted in the campaign approval record.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'fees',
    title: '9. Fees and payment',
    body: (
      <>
        <p>
          Afterlight charges customers for access to and use of the generation platform. Fees are
          set out in each customer&rsquo;s order form, statement of work, or applicable service
          agreement, and may be structured as subscription, usage, or per-asset pricing. Customers
          authorize Afterlight (or our payments partner) to charge the payment method on file for
          amounts owed. Disputes about a specific charge must be raised within thirty (30) days of
          the invoice date.
        </p>
        <p>
          Afterlight does not collect, hold, disburse, or take a cut of any compensation paid by a
          licensee to a creator. Those arrangements sit entirely between the licensee running the
          campaign and the creator participating in it.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: '10. Intellectual property',
    body: (
      <>
        <p>
          The creator retains all rights in their underlying likeness and any reference photos
          they upload. The customer owns the campaign brief, product imagery, and product
          trademarks they supply. Afterlight owns the platform itself: the software, the workflow,
          the trained orchestration systems, the approval ledger, and all derivative analytics.
        </p>
        <p>
          Generated campaign assets are used under the campaign license described in Section 4.
          Neither the licensee nor any third party may exploit those assets outside that license
          without written consent from the creator.
        </p>
      </>
    ),
  },
  {
    id: 'revocation',
    title: '11. Revocation',
    body: (
      <>
        <p>
          A creator may revoke the license to any specific campaign at any time. On revocation,
          the licensee must cease running the affected assets across all paid channels within
          seventy-two (72) hours and remove organic posts depicting the creator within seven (7)
          days. Afterlight will support enforcement on request and may terminate customer accounts
          that fail to comply.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: '12. Termination',
    body: (
      <>
        <p>
          You may close your account at any time by writing to{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:harry@tryafterlight.com">
            harry@tryafterlight.com
          </a>
          . We may suspend or terminate accounts that breach these Terms, abuse the approval gate,
          or expose creators to harm. On termination, all outstanding campaign licenses immediately
          revert to the creator unless the licensee and creator agree otherwise in writing.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimers',
    title: '13. Disclaimers',
    body: (
      <>
        <p>
          Afterlight is provided &ldquo;as is.&rdquo; We do not warrant that the platform will be
          uninterrupted, error-free, or that generated content will achieve any particular
          performance result on any platform. AI-generated output may contain imperfections; the
          approval gate is your safeguard. Use it.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '14. Limitation of liability',
    body: (
      <>
        <p>
          To the maximum extent permitted by law, Afterlight&rsquo;s total liability arising out of
          or relating to these Terms is limited to the fees you paid Afterlight in the twelve (12)
          months preceding the event giving rise to the claim. We are not liable for indirect,
          incidental, consequential, special, or punitive damages.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    title: '15. Indemnity',
    body: (
      <>
        <p>
          Customers indemnify Afterlight against any third-party claim arising from a campaign
          brief, product representation, or use of generated content outside the approved license.
          Creators indemnify Afterlight against any claim that a reference photo they uploaded
          was not theirs to use.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '16. Governing law and disputes',
    body: (
      <>
        <p>
          These Terms are governed by the laws of the State of California, without regard to its
          conflicts-of-law rules. The exclusive forum for any dispute that is not subject to
          arbitration is the state and federal courts located in San Francisco County, California.
          Both parties consent to personal jurisdiction there.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '17. Changes',
    body: (
      <>
        <p>
          We may update these Terms. If the change is material, we will notify account holders by
          email and post a notice on this page at least fourteen (14) days before it takes effect.
          Continued use of Afterlight after the effective date constitutes acceptance.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '18. Contact',
    body: (
      <>
        <p>
          Afterlight, Inc.
          <br />
          San Francisco, California
          <br />
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:harry@tryafterlight.com">
            harry@tryafterlight.com
          </a>{' '}
          ·{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:lorin@tryafterlight.com">
            lorin@tryafterlight.com
          </a>
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200">
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Afterlight home" className="flex items-center">
            <Image
              src="/afterlight-wordmark.png"
              alt="Afterlight"
              width={920}
              height={195}
              priority
              className="h-6 w-auto select-none"
            />
          </Link>
          <div className="flex items-center gap-7 text-[14px] font-medium text-neutral-600">
            <Link href="/use-cases" className="hover:text-neutral-900 transition-colors">Use Cases</Link>
            <Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link>
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
        <div className="max-w-[720px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-10 md:pb-14">
          <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.1]">
            Terms of Service
          </h1>
          <p className="text-[13px] text-neutral-500 mt-4 italic">Effective {LAST_UPDATED}</p>
        </div>
      </section>

      <section>
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <nav aria-label="Section navigation" className="mb-2 pb-10 border-b border-neutral-100">
            <ol className="text-[13px] leading-[1.9] text-neutral-500 columns-1 sm:columns-2 gap-x-10">
              {sections.map((s) => (
                <li key={s.id} className="break-inside-avoid">
                  <a href={`#${s.id}`} className="hover:text-neutral-900 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="text-[15px] leading-[1.75] text-neutral-700">
            {sections.map((s, idx) => (
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
                <div className="space-y-4">{s.body}</div>
              </article>
            ))}
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
