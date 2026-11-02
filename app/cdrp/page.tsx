import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata = {
  title: 'Data Rights Policy — Afterlight',
  description:
    'The guarantees Afterlight makes to every brand on the platform: you own your uploads, you own the generated images, and your images never train models for anyone else.',
};

const EFFECTIVE = 'August 3, 2026';

const sections: LegalSection[] = [
  {
    id: 'guarantees',
    title: 'The five guarantees',
    body: (
      <>
        <p>
          These are the promises we make to every brand on the platform. Each one is a term of the{' '}
          <a href="/terms">Brand Services Agreement</a> or the{' '}
          <a href="/privacy">Privacy Policy</a>, not a marketing claim.
        </p>
        <ul>
          <li>
            <strong>You own what you upload.</strong> Product images, logos, and brand assets remain
            entirely yours.
          </li>
          <li>
            <strong>You own what we generate.</strong> The AI-generated images produced for your
            account belong to you.
          </li>
          <li>
            <strong>Your images never train a model anyone else can use.</strong> Not without your
            explicit consent.
          </li>
          <li>
            <strong>We do not sell your personal information.</strong> To anyone.
          </li>
          <li>
            <strong>You can leave with your work.</strong> On termination you may request a copy of
            your generated images.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'ownership',
    title: '1. Who owns what',
    body: (
      <>
        <p>
          Ownership on Afterlight splits cleanly in three, and the split is written into the{' '}
          <a href="/terms">Brand Services Agreement</a>:
        </p>
        <ul>
          <li>
            <strong>Your brand content.</strong> You retain all ownership rights to the product
            images, logos, and brand assets you upload to the platform.
          </li>
          <li>
            <strong>Your generated images.</strong> You own the rights to the AI-generated images
            produced for your account during the term of the Agreement.
          </li>
          <li>
            <strong>Our technology.</strong> Afterlight retains all rights to its underlying AI
            models, algorithms, software, and platform technology.
          </li>
        </ul>
        <p className="callout">
          Nothing you upload becomes ours, and nothing we generate for you stays ours.
        </p>
      </>
    ),
  },
  {
    id: 'training',
    title: '2. What your images are used for',
    body: (
      <>
        <p>
          Afterlight may use your uploaded product images to train and improve AI models{' '}
          <strong>solely for your own account</strong> — so that generation gets better at your
          products, your lighting, and your visual guidelines.
        </p>
        <p>
          Your product images will not be used to train general AI models accessible to other
          customers without your explicit consent. There is no shared pool that quietly absorbs your
          catalog.
        </p>
      </>
    ),
  },
  {
    id: 'no-sale',
    title: '3. We do not sell your data',
    body: (
      <p>
        We do not sell your personal information to third parties. We share information only with
        the vendors needed to run the service — payment processors such as Stripe, cloud storage and
        hosting providers, and analytics providers — and with legal authorities when required by law
        or to protect our rights. Your confidential information is not shared with third parties
        except as necessary to provide the service.
      </p>
    ),
  },
  {
    id: 'security',
    title: '4. How your data is protected',
    body: (
      <p>
        We implement industry-standard security measures including encryption (AES-256 at rest, TLS
        1.2+ in transit), access controls, and regular security assessments. Your information may be
        processed in the United States or other countries where our service providers operate, with
        appropriate safeguards in place for international transfers.
      </p>
    ),
  },
  {
    id: 'retention',
    title: '5. How long we keep it',
    body: (
      <p>
        We retain your personal information for as long as your account is active or as needed to
        provide our services. Certain data may be retained longer to comply with legal obligations,
        resolve disputes, and enforce agreements. Upon termination of the Brand Services Agreement,
        you may request a copy of your generated images within thirty (30) days.
      </p>
    ),
  },
  {
    id: 'rights',
    title: '6. Rights you can exercise',
    body: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Delete your personal information</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Port your data to another service</li>
        </ul>
        <p>
          One email exercises any of them:{' '}
          <a href="mailto:privacy@tryafterlight.com">privacy@tryafterlight.com</a>.
        </p>
      </>
    ),
  },
  {
    id: 'not-exclusive',
    title: '7. You are never locked in',
    body: (
      <p>
        Your agreement with Afterlight is non-exclusive. You remain free to work with other service
        providers, photographers, and studios at any time. Either party may terminate for material
        breach not cured within thirty (30) days of written notice, and you leave with your
        generated images.
      </p>
    ),
  },
  {
    id: 'why',
    title: '8. Why we publish this',
    body: (
      <p>
        A brand handing its entire product catalog to an AI platform is taking a real risk, and the
        answers to &ldquo;who owns this&rdquo; and &ldquo;what are you training on&rdquo; should not
        be buried in a contract nobody reads. This page states them plainly. Where this summary and
        the underlying agreements differ, the{' '}
        <a href="/terms">Brand Services Agreement</a> and{' '}
        <a href="/privacy">Privacy Policy</a> govern.
      </p>
    ),
  },
];

export default function DataRightsPage() {
  return (
    <LegalPage
      kicker="Trust"
      title="Data Rights Policy"
      effective={EFFECTIVE}
      lede={
        <p>
          Afterlight generates product photography from the images and brand assets you upload. This
          page states, in plain English, what happens to them: you own your uploads, you own what we
          generate, and your catalog never trains a model anyone else can use.
        </p>
      }
      sections={sections}
      disclaimer={
        <>
          This page summarizes the Brand Services Agreement and Privacy Policy for convenience and
          does not constitute legal advice. Where this summary and those documents differ, those
          documents govern.
        </>
      }
    />
  );
}
