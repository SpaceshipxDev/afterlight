import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: 'JR Cigars',
  headline: 'One group photo. A full SKU catalog.',
  lede:
    'Turning a single multi-cigar group shot into individual product photography for every SKU — at full PDP resolution, in JR’s catalog style.',
  scope: '2 samplers',
  output: '10+ SKU shots',
  timeline: '2-day sprint',
  status: 'Complete',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Montecristo Lovers Edition II',
      inputs: ['/jr/IMG_3773.jpeg'],
      outputs: [
        '/jr/Generated Image March 28, 2026 - 5_13PM.jpeg',
        '/jr/IMG_3747.png',
        '/jr/IMG_3750.png',
        '/jr/Generated Image March 28, 2026 - 5_27PM (1).jpeg',
        '/jr/Generated Image March 28, 2026 - 5_30PM.jpeg',
        '/jr/IMG_3776.jpeg',
      ],
    },
    {
      id: 'sku2',
      displayName: 'Boneshaker Lunatic 3 Cigar Sampler',
      inputs: ['/jr/IMG_3772.jpeg'],
      outputs: [
        '/jr/Generated Image March 28, 2026 - 5_37PM.jpeg',
        '/jr/Generated Image March 28, 2026 - 5_43PM.jpeg',
        '/jr/Generated Image March 28, 2026 - 5_38PM.jpeg',
        '/jr/IMG_3777.jpeg',
      ],
    },
  ],
};

export default function JrCigarsPilotPage() {
  return <CasePilotPage data={data} />;
}
