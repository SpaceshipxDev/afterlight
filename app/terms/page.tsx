import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata = {
  title: 'Brand Services Agreement — Afterlight',
  description:
    'The agreement between Afterlight and the brands using its AI-powered product photography platform.',
};

const EFFECTIVE = 'August 3, 2026';

const sections: LegalSection[] = [
  {
    id: 'services',
    title: '1. Services',
    body: (
      <p>
        Afterlight will provide the Brand with AI-generated product photography services through its
        platform. The scope of services includes automated product image generation that adapts to
        the Brand&rsquo;s visual guidelines.
      </p>
    ),
  },
  {
    id: 'payment',
    title: '2. Payment terms',
    body: (
      <ol className="alpha">
        <li>The Brand agrees to pay fees as set forth in the applicable pricing plan or order form.</li>
        <li>Payment is due in accordance with the terms specified at the time of purchase.</li>
        <li>Late payments may incur additional fees.</li>
      </ol>
    ),
  },
  {
    id: 'ip',
    title: '3. Intellectual property rights',
    body: (
      <ol className="alpha">
        <li>
          <strong>Brand content.</strong> The Brand retains all ownership rights to product images,
          logos, and brand assets uploaded to the platform.
        </li>
        <li>
          <strong>Generated images.</strong> The Brand owns the rights to AI-generated images
          produced for their account during the term of this Agreement.
        </li>
        <li>
          <strong>Afterlight technology.</strong> Afterlight retains all rights to its underlying AI
          models, algorithms, software, and platform technology.
        </li>
      </ol>
    ),
  },
  {
    id: 'data',
    title: '4. Data usage and confidentiality',
    body: (
      <ol className="alpha">
        <li>
          Afterlight may use the Brand&rsquo;s uploaded product images to train and improve AI models
          solely for the Brand&rsquo;s account.
        </li>
        <li>
          Afterlight will not share the Brand&rsquo;s confidential information with third parties
          except as necessary to provide services.
        </li>
        <li>
          Brand product images will not be used to train general AI models accessible to other
          customers without the Brand&rsquo;s explicit consent.
        </li>
      </ol>
    ),
  },
  {
    id: 'warranties',
    title: '5. Representations and warranties',
    body: (
      <ol className="alpha">
        <li>
          The Brand represents that it has the right to use all images and content uploaded to the
          platform.
        </li>
        <li>
          Afterlight warrants that services will be provided in a professional manner consistent
          with industry standards.
        </li>
      </ol>
    ),
  },
  {
    id: 'liability',
    title: '6. Limitation of liability',
    body: (
      <ol className="alpha">
        <li>
          Afterlight&rsquo;s aggregate liability under this Agreement shall not exceed the fees paid
          by the Brand in the twelve (12) months preceding the claim.
        </li>
        <li>Neither party shall be liable for indirect, incidental, or consequential damages.</li>
      </ol>
    ),
  },
  {
    id: 'indemnification',
    title: '7. Indemnification',
    body: (
      <p>
        The Brand agrees to indemnify Afterlight against claims arising from the Brand&rsquo;s use of
        the platform in violation of this Agreement or applicable law.
      </p>
    ),
  },
  {
    id: 'term',
    title: '8. Term and termination',
    body: (
      <ol className="alpha">
        <li>
          This Agreement remains in effect for the term specified in the applicable order or until
          terminated.
        </li>
        <li>
          Either party may terminate for material breach not cured within 30 days of written notice.
        </li>
        <li>Upon termination, the Brand may request a copy of generated images within 30 days.</li>
      </ol>
    ),
  },
  {
    id: 'non-exclusivity',
    title: '9. Non-exclusivity',
    body: (
      <p>
        This Agreement is non-exclusive. Both parties remain free to work with other clients or
        service providers.
      </p>
    ),
  },
  {
    id: 'disputes',
    title: '10. Dispute resolution',
    body: (
      <p>
        Any disputes arising under this Agreement shall be resolved through good-faith negotiations.
        If unresolved, disputes shall be submitted to binding arbitration in accordance with
        American Arbitration Association rules.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '11. Governing law',
    body: (
      <p>
        This Agreement shall be governed by the laws of the State of Delaware, United States.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      current="/terms"
      title="Brand Services Agreement"
      effective={EFFECTIVE}
      lede={
        <p>
          This Agreement is entered into between Afterlight, Inc. (&ldquo;Afterlight&rdquo;), an
          AI-powered product photography platform, and the client brand (&ldquo;Brand&rdquo;) using
          Afterlight&rsquo;s services.
        </p>
      }
      sections={sections}
      disclaimer={
        <>
          This document is provided for informational purposes only and does not constitute legal
          advice. You should consult with a licensed attorney to ensure this agreement meets your
          specific needs.
        </>
      }
    />
  );
}
