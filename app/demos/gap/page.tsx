import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: 'Gap',
  logo: '/logos/gap.svg',
  logoH: 56,
  headline: 'Reshot in four days.',
  lede:
    'Turning Gap product flat lays into campaign-ready editorial photography in their own brand aesthetic — no studio, no booked models, no reshoot.',
  scope: '3 SKUs',
  output: '12 frames',
  timeline: '4-day sprint',
  status: 'Active',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Waxed Canvas Baseball Hat',
      inputs: ['/gap/IMG_3678.jpeg', '/gap/IMG_3679.jpeg'],
      outputs: ['/gap/IMG_3680.jpeg', '/gap/IMG_3681.jpeg'],
    },
    {
      id: 'sku2',
      displayName: 'Braided Leather Belt',
      inputs: ['/gap/IMG_3656.jpeg', '/gap/IMG_3658.jpeg'],
      outputs: ['/gap/IMG_3673.jpeg', '/gap/IMG_3674.jpeg'],
    },
    {
      id: 'sku3',
      displayName: 'Waxed Canvas Tote Bag',
      inputs: ['/gap/IMG_3663.jpeg', '/gap/IMG_3664.jpeg'],
      outputs: ['/gap/IMG_3675.jpeg', '/gap/IMG_3676.jpeg'],
    },
  ],
};

export default function GapPilotPage() {
  return <CasePilotPage data={data} />;
}
