import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: 'GetUrns',
  headline: 'Catalog jewelry, photographed on the body.',
  lede:
    'Turning sterling-silver pendant catalog photos into wear-shots that match GetUrns’ tone — through Mokibasa, no studio, no models.',
  scope: '4 SKUs',
  output: '8 wear-shots',
  timeline: '2-day sprint',
  status: 'Complete',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Leaning Heart Pendant',
      inputs: ['/mobikasa-geturns/PD1530_7883d34d-5f0b-4a29-b3da-2f7fe8e4e770_5000x.webp'],
      outputs: [
        '/mobikasa-geturns/Generated Image March 26, 2026 - 2_50PM.jpg',
        '/mobikasa-geturns/Generated Image March 26, 2026 - 3_16PM.jpg',
      ],
    },
    {
      id: 'sku2',
      displayName: 'Wings of Hope Lavender Pendant',
      inputs: ['/mobikasa-geturns/PD1200a_5000x.webp'],
      outputs: [
        '/mobikasa-geturns/Generated Image March 26, 2026 - 2_55PM.jpg',
        '/mobikasa-geturns/Generated Image March 26, 2026 - 3_16PM (1).jpg',
      ],
    },
    {
      id: 'sku3',
      displayName: 'Mother of Pearl Pendant',
      inputs: ['/mobikasa-geturns/PD1290a_5000x.webp'],
      outputs: [
        '/mobikasa-geturns/Generated Image March 26, 2026 - 2_57PM.jpg',
        '/mobikasa-geturns/Generated Image March 26, 2026 - 3_21PM (1).jpg',
      ],
    },
    {
      id: 'sku4',
      displayName: 'Angel Wings Pendant',
      inputs: ['/mobikasa-geturns/PD1370a_5000x.webp'],
      outputs: [
        '/mobikasa-geturns/Generated Image March 26, 2026 - 3_50PM copy.jpg',
        '/mobikasa-geturns/Generated Image March 26, 2026 - 3_21PM.jpg',
      ],
    },
  ],
};

export default function GetUrnsPilotPage() {
  return <CasePilotPage data={data} />;
}
