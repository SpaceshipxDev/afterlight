import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: 'Blindsgalore',
  logo: '/logos/blindsgalore.svg',
  logoH: 30,
  headline: 'One product photo. Three lifestyle scenes.',
  lede:
    'Turning a flat motorized-shade catalog photo into editorial interiors that match Blindsgalore’s brand — no set build, no location shoot.',
  scope: '1 SKU',
  output: '3 lifestyle scenes',
  timeline: '1-day sprint',
  status: 'Complete',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Essential Motorized Woven Wood Shades',
      inputs: ['/blindsgalore/0749866l0%20(1).jpeg'],
      outputs: [
        '/blindsgalore/Generated%20Image%20March%2027,%202026%20-%203_32PM.jpeg',
        '/blindsgalore/Generated%20Image%20March%2027,%202026%20-%203_29PM.jpeg',
        '/blindsgalore/Generated%20Image%20March%2027,%202026%20-%203_41PM.jpeg',
      ],
    },
  ],
};

export default function BlindsgalorePilotPage() {
  return <CasePilotPage data={data} />;
}
