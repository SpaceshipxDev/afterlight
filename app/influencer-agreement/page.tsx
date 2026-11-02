import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata = {
  title: 'Influencer Agreement & Campaign Terms — Afterlight',
  description:
    'The agreement between Afterlight and influencers participating in marketing campaigns for its AI-powered product photography platform.',
};

const EFFECTIVE = 'August 3, 2026';

const sections: LegalSection[] = [
  {
    id: 'compensation',
    title: '1. Campaign selection and compensation',
    body: (
      <ol className="alpha">
        <li>
          The Company may select the Influencer to participate in marketing campaigns at rates
          predetermined by the Company or communicated to the Influencer on a per-request basis.
        </li>
        <li>
          For each campaign, the Company will provide the scope of work, deliverables, and
          compensation terms. The Influencer may accept the offered rate or, at the Company&rsquo;s
          discretion, request an alternative rate for consideration.
        </li>
        <li>
          The Influencer agrees to set a reasonable price for their services and acknowledges that
          if offered a below-market rate, they have the option to accept or decline such rate at
          their sole discretion.
        </li>
      </ol>
    ),
  },
  {
    id: 'approval',
    title: '2. Campaign approval and contact information',
    body: (
      <ol className="alpha">
        <li>
          The Influencer agrees to provide a valid phone number or email address for the purpose of
          campaign approval and coordination.
        </li>
        <li>
          All campaigns must be approved through the contact information provided. The Company will
          not be responsible for campaigns that are not approved in accordance with this section.
        </li>
      </ol>
    ),
  },
  {
    id: 'privacy-compliance',
    title: '3. Privacy compliance',
    body: (
      <ol className="alpha">
        <li>
          The Influencer agrees to include a link to Afterlight&rsquo;s privacy page (
          <a href="https://tryafterlight.com/privacy">tryafterlight.com/privacy</a>) in any campaign
          content that involves data collection or directs users to Afterlight&rsquo;s platform.
        </li>
        <li>
          The Influencer shall comply with all applicable privacy laws and regulations when
          promoting Afterlight products or services.
        </li>
      </ol>
    ),
  },
  {
    id: 'content-ip',
    title: '4. Content and intellectual property',
    body: (
      <ol className="alpha">
        <li>
          Content created under this Agreement shall be used by the Company for marketing purposes
          unless otherwise agreed in writing.
        </li>
        <li>
          The Company retains all rights to its brand assets, logos, and trademarks. The Influencer
          retains ownership of their original content subject to the license granted herein.
        </li>
        <li>
          The Influencer grants the Company a worldwide, non-exclusive, royalty-free license to use,
          reproduce, and distribute campaign content for marketing purposes.
        </li>
      </ol>
    ),
  },
  {
    id: 'warranties',
    title: '5. Representations and warranties',
    body: (
      <>
        <p>The Influencer represents and warrants that:</p>
        <ol className="alpha">
          <li>They have the right and authority to enter into this Agreement;</li>
          <li>Their content will not infringe upon any third-party rights;</li>
          <li>
            They will disclose their influencer relationship with the Company in accordance with FTC
            guidelines.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'termination',
    title: '6. Termination',
    body: (
      <p>
        Either party may terminate this Agreement upon written notice. Upon termination, the
        Influencer shall be compensated for completed work accepted by the Company.
      </p>
    ),
  },
  {
    id: 'liability',
    title: '7. Limitation of liability',
    body: (
      <p>
        The Company shall not be liable for any indirect, incidental, or consequential damages
        arising from this Agreement.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '8. Governing law',
    body: <p>This Agreement shall be governed by the laws of the United States.</p>,
  },
];

export default function InfluencerAgreementPage() {
  return (
    <LegalPage
      kicker="Legal"
      current="/influencer-agreement"
      title="Influencer Agreement"
      effective={EFFECTIVE}
      lede={
        <p>
          This Agreement is entered into between Afterlight, Inc. (&ldquo;Company&rdquo;) and the
          influencer (&ldquo;Influencer&rdquo;) participating in marketing campaigns for
          Afterlight&rsquo;s AI-powered product photography platform.
        </p>
      }
      sections={sections}
      disclaimer={
        <>
          This document is provided for informational purposes only and does not constitute legal
          advice. You should consult with a licensed attorney before entering into any agreement.
        </>
      }
    />
  );
}
