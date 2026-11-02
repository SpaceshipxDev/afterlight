import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata = {
  title: 'Privacy Policy — Afterlight',
  description:
    'How Afterlight collects, uses, and safeguards your information when you use tryafterlight.com and our AI product photography platform.',
};

const EFFECTIVE = 'August 3, 2026';

const sections: LegalSection[] = [
  {
    id: 'introduction',
    title: '1. Introduction',
    body: (
      <p>
        Afterlight, Inc. (&ldquo;Afterlight,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) provides an AI-powered platform that generates professional product
        photography for e-commerce brands, marketing agencies, and retail companies. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your information when you
        visit our website{' '}
        <a href="https://tryafterlight.com">tryafterlight.com</a> (the &ldquo;Site&rdquo;) and use
        our services.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    title: '2. Information we collect',
    body: (
      <>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal information.</strong> Name, email address, billing address, payment
            information, phone number, and company name when you register for an account or make a
            purchase.
          </li>
          <li>
            <strong>Product images and content.</strong> Product photos, brand assets, and visual
            guidelines you upload to our platform for processing.
          </li>
          <li>
            <strong>Usage data.</strong> Information about how you interact with our Site and
            services, including pages visited, time spent, and features used.
          </li>
          <li>
            <strong>Cookies and tracking technologies.</strong> We use cookies, pixels, and similar
            technologies to enhance your experience and analyze Site traffic.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How we use your information',
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Provide, operate, and maintain our AI-powered product photography platform</li>
          <li>Process transactions and send related communications</li>
          <li>Improve and personalize our services</li>
          <li>Communicate with you about updates, promotions, and support</li>
          <li>Enforce our terms and protect against fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: 'sharing',
    title: '4. Data sharing and disclosure',
    body: (
      <>
        <p>We may share your information with:</p>
        <ul>
          <li>Payment processors (e.g., Stripe) to process transactions</li>
          <li>Cloud storage and hosting providers to store your data</li>
          <li>Analytics providers to help us improve our services</li>
          <li>Legal authorities when required by law or to protect our rights</li>
        </ul>
        <p className="callout">We do not sell your personal information to third parties.</p>
      </>
    ),
  },
  {
    id: 'retention',
    title: '5. Data retention',
    body: (
      <p>
        We retain your personal information for as long as your account is active or as needed to
        provide our services. We may retain certain data for longer periods to comply with legal
        obligations, resolve disputes, and enforce agreements.
      </p>
    ),
  },
  {
    id: 'rights',
    title: '6. Your rights and choices',
    body: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Delete your personal information</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Data portability</li>
        </ul>
        <p>
          To exercise these rights, contact us at{' '}
          <a href="mailto:privacy@tryafterlight.com">privacy@tryafterlight.com</a>.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '7. Cookies',
    body: (
      <p>
        We use essential cookies for Site functionality, analytics cookies to understand usage
        patterns, and optional marketing cookies. You can manage cookie preferences through your
        browser settings.
      </p>
    ),
  },
  {
    id: 'children',
    title: "8. Children's privacy",
    body: (
      <p>
        Our services are not directed to individuals under the age of 13. We do not knowingly
        collect personal information from children. If you believe a child has provided us with
        personal data, please contact us immediately.
      </p>
    ),
  },
  {
    id: 'security',
    title: '9. Data security',
    body: (
      <p>
        We implement industry-standard security measures including encryption (AES-256 at rest, TLS
        1.2+ in transit), access controls, and regular security assessments to protect your data.
      </p>
    ),
  },
  {
    id: 'transfers',
    title: '10. International data transfers',
    body: (
      <p>
        Your information may be processed in the United States or other countries where our service
        providers operate. We ensure appropriate safeguards are in place for international data
        transfers.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '11. Changes to this policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. We will notify you of material changes
        by posting the updated policy on our Site with a revised effective date.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '12. Contact us',
    body: (
      <>
        <p>For questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>
          Afterlight, Inc.
          <br />
          <a href="mailto:privacy@tryafterlight.com">privacy@tryafterlight.com</a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      current="/privacy"
      title="Privacy Policy"
      effective={EFFECTIVE}
      lede={
        <p>
          Afterlight generates professional product photography for e-commerce brands, agencies, and
          retailers. This policy explains what we collect, how we use it, and the rights you keep.
        </p>
      }
      sections={sections}
      disclaimer={
        <>
          This document is provided for informational purposes only and does not constitute legal
          advice. You should consult with a licensed attorney to ensure compliance with applicable
          laws.
        </>
      }
    />
  );
}
