import Link from 'next/link';
import { PiTriangleBold } from 'react-icons/pi';

export const metadata = {
  title: 'Privacy Policy — Afterlight',
  description:
    'How Afterlight handles personal data, reference photos, and biometric information — including our promise never to sell them.',
};

const LAST_UPDATED = 'May 22, 2026';

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'plain-english',
    title: 'The short version',
    body: (
      <>
        <p>
          Afterlight runs a licensed marketplace where brands generate AI influencer ads with the
          creator&rsquo;s explicit, per-campaign approval. The information we hold about you exists to
          run that workflow and nothing else. The promises below are the ones we treat as
          non-negotiable:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>We do not sell your personal data.</strong> Not to advertisers, not to data brokers, not to model trainers.</li>
          <li><strong>We do not sell, rent, or sublicense your likeness.</strong> Your face is never a product.</li>
          <li><strong>We do not train foundation models on your photos.</strong> Your reference image powers your campaigns only.</li>
          <li><strong>No campaign goes live without your approval.</strong> The approval gate is enforced in code, not policy.</li>
          <li><strong>You can revoke and delete at any time.</strong> One email and your reference assets are removed from active systems.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'who',
    title: '1. Who we are',
    body: (
      <>
        <p>
          This policy is published by Afterlight, Inc., a Delaware corporation operating in San
          Francisco, California (&ldquo;Afterlight,&rdquo; &ldquo;we&rdquo;). Afterlight is the
          data controller for the personal information described below. You can reach our privacy
          team at{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:privacy@tryafterlight.com">
            privacy@tryafterlight.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: '2. What we collect',
    body: (
      <>
        <p>We collect only what the product needs to function:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Account information.</strong> Name, email, role (creator or brand), and the social handles you choose to link.</li>
          <li><strong>Reference photos.</strong> The image(s) creators upload so brands can generate campaigns with their likeness.</li>
          <li><strong>Campaign records.</strong> Briefs, generated drafts, approval timestamps, channel, geography, and active dates. This is the consent ledger.</li>
          <li><strong>Payment information.</strong> Processed by our payments partner (Stripe). We store the last four digits and a token, never the full card or bank number.</li>
          <li><strong>Communications.</strong> Messages between brands, creators, and our team that pass through Afterlight.</li>
          <li><strong>Product telemetry.</strong> Pages visited, features used, errors encountered. Used to debug and improve.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'biometric',
    title: '3. Likeness and biometric information',
    body: (
      <>
        <p>
          A reference photo is not the same as a biometric template. Afterlight processes the photo
          to generate campaign assets for the specific brand approved by the creator. We do not
          extract, derive, or store a portable biometric template that could identify the creator
          across other datasets, and we do not feed reference photos into general-purpose model
          training.
        </p>
        <p>
          In jurisdictions with specific biometric-information statutes (including Illinois BIPA,
          Texas CUBI, Washington H.B. 1493, and applicable provisions of the CCPA/CPRA as amended),
          you are entitled to the rights set out in those laws. We honor them globally.
        </p>
      </>
    ),
  },
  {
    id: 'no-sale',
    title: '4. We do not sell your data',
    body: (
      <>
        <p>
          Afterlight does not sell personal information as that term is defined by the California
          Consumer Privacy Act, nor do we share it with third parties for cross-context behavioral
          advertising. We do not license your likeness to third parties outside the specific
          campaign you approved. If this ever changes, we will give you direct, plain-English
          notice and an explicit opt-in before any such use begins.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '5. How we use information',
    body: (
      <>
        <p>We use the data we collect to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Generate campaign drafts at the brand&rsquo;s request, using only reference photos belonging to the creator who accepted that brief.</li>
          <li>Run the approval gate and store the consent record for audit.</li>
          <li>Process payments and disburse creator earnings.</li>
          <li>Detect fraud, impersonation, and platform abuse.</li>
          <li>Communicate with you about your account and campaigns.</li>
          <li>Improve the product through aggregate, de-identified analytics.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'subprocessors',
    title: '6. Sub-processors',
    body: (
      <>
        <p>
          We use a small set of vetted vendors to operate the platform. Each is bound by a data
          processing agreement that prohibits independent use of your data:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Amazon Web Services</strong> — hosting and storage (United States).</li>
          <li><strong>Cloudflare</strong> — edge delivery and DDoS protection.</li>
          <li><strong>Stripe</strong> — payment processing and payouts.</li>
          <li><strong>Postmark</strong> — transactional email.</li>
          <li><strong>Generation providers</strong> — the AI providers that render approved campaign assets. They process reference images and prompts under contracts that prohibit them from retaining inputs beyond the request lifecycle or training their models on them.</li>
        </ul>
        <p>
          We publish the current list at{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:privacy@tryafterlight.com">
            privacy@tryafterlight.com
          </a>{' '}
          on request and notify customers when a sub-processor is added or removed.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: '7. Retention',
    body: (
      <>
        <p>
          Reference photos and campaign drafts are stored for as long as your account is active or
          a campaign you approved is still running. When you close your account or revoke a
          license, we delete the affected reference assets and generated drafts from active
          systems within thirty (30) days and from backups within ninety (90) days.
        </p>
        <p>
          Consent records (who approved what, when, and for which channel) are retained for seven
          (7) years for audit and regulatory purposes, in de-identified form once the underlying
          assets are deleted.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: '8. Your rights',
    body: (
      <>
        <p>Wherever you live, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Access the personal information we hold about you.</li>
          <li>Correct anything that is inaccurate.</li>
          <li>Delete your reference photos and account on request.</li>
          <li>Revoke any campaign license you previously approved.</li>
          <li>Port your data to another service in a structured, machine-readable format.</li>
          <li>Object to processing or restrict it where applicable law allows.</li>
          <li>File a complaint with your local data-protection authority.</li>
        </ul>
        <p>
          To exercise any right, write to{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:privacy@tryafterlight.com">
            privacy@tryafterlight.com
          </a>
          . We respond within thirty (30) days.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: '9. Security',
    body: (
      <>
        <p>
          Reference photos and consent records are encrypted in transit (TLS 1.2+) and at rest
          (AES-256). Access to production systems requires hardware-key MFA and is logged. We run
          regular vulnerability scans and a responsible-disclosure program. Report suspected
          vulnerabilities to{' '}
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:security@tryafterlight.com">
            security@tryafterlight.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'transfers',
    title: '10. International transfers',
    body: (
      <>
        <p>
          Afterlight is operated from the United States. If you access the platform from outside
          the US, your information is transferred to and processed in the US under Standard
          Contractual Clauses (for EEA, UK, and Swiss residents) or equivalent safeguards.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: '11. Children',
    body: (
      <>
        <p>
          Afterlight is not for anyone under 18. We do not knowingly collect information from
          children. If you believe a minor has created an account, contact us and we will remove it.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '12. Changes to this policy',
    body: (
      <>
        <p>
          We will update this policy as the product evolves. Material changes will be announced by
          email at least fourteen (14) days before they take effect. The &ldquo;Last updated&rdquo;
          date at the top of this page always reflects the current version.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '13. Contact',
    body: (
      <>
        <p>
          Afterlight, Inc.
          <br />
          San Francisco, California
          <br />
          <a className="underline underline-offset-4 hover:text-neutral-900" href="mailto:privacy@tryafterlight.com">
            privacy@tryafterlight.com
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
