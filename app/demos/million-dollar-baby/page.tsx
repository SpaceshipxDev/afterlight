import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: "Carter's by DaVinci",
  headline: 'A crib catalog photo, restaged.',
  lede:
    'Turning a single Carter’s by DaVinci product shot into nursery lifestyle imagery — same crib, three rooms, no studio time.',
  scope: '1 SKU',
  output: '3 nursery scenes',
  timeline: '1-day sprint',
  status: 'Complete',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Colby 4-in-1 Low-Profile Convertible Crib',
      inputs: ['/million-dollar-baby/IMG_3689.webp'],
      outputs: [
        '/million-dollar-baby/IMG_3695.jpeg',
        '/million-dollar-baby/IMG_3696.jpeg',
        '/million-dollar-baby/IMG_3700.jpeg',
      ],
    },
  ],
};

export default function MdbPilotPage() {
  return <CasePilotPage data={data} />;
}
