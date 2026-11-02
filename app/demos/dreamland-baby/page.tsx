import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: 'Dreamland Baby',
  logo: '/logos/dreamland-baby.png',
  logoH: 30,
  headline: 'Catalog flat lays into nursery moments.',
  lede:
    'Turning DTC catalog product shots into warm nursery scenes that fit Dreamland Baby’s brand — without booking a baby model or a photoshoot.',
  scope: '2 SKUs',
  output: '6 lifestyle scenes',
  timeline: '2-day sprint',
  status: 'Complete',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Dream Baby Blanket — Navy',
      inputs: ['/dreamland-baby/2024_navy_blanket_webwhite.webp'],
      outputs: [
        '/dreamland-baby/Generated Image March 25, 2026 - 10_44PM.jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_44PM (1).jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_48PM.jpg',
      ],
    },
    {
      id: 'sku2',
      displayName: 'Dream Weighted Sack Swaddle',
      inputs: ['/dreamland-baby/03.23_PDP_SW_1GreyStar_795b33a8-c952-432a-ad9b-ca3f0671c151.webp'],
      outputs: [
        '/dreamland-baby/Generated Image March 25, 2026 - 10_32PM.jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_34PM.jpg',
        '/dreamland-baby/Generated Image March 25, 2026 - 10_35PM.jpg',
      ],
    },
  ],
};

export default function DreamlandBabyPilotPage() {
  return <CasePilotPage data={data} />;
}
