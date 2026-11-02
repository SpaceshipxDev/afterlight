import CasePilotPage, { type CasePilotData } from '@/components/CasePilotPage';

const data: CasePilotData = {
  brand: 'VOID Cycling',
  headline: 'Cycling kit on real riders, on the road.',
  lede:
    'Turning flat product shots of VOID’s cycling kit into riding action photography — through Nix United, no shoot day, no athlete bookings.',
  scope: '2 SKUs',
  output: '6 action shots',
  timeline: '2-day sprint',
  status: 'Complete',
  inputStyle: 'flat',
  skus: [
    {
      id: 'sku1',
      displayName: 'Core Powerstretch Cycling Jersey, Women',
      inputs: ['/nix-united/VOID_POWER_STRETCH_W_BLACK_001.webp', '/nix-united/sku1_in_2.jpeg'],
      outputs: [
        '/nix-united/sku1_out_1.jpg',
        '/nix-united/sku1_out_2.jpg',
        '/nix-united/sku1_out_3.jpg',
      ],
    },
    {
      id: 'sku2',
      displayName: 'Core Cycling Bib Shorts, Women',
      inputs: ['/nix-united/sku2_in_1.webp'],
      outputs: [
        '/nix-united/sku2_out_1.jpg',
        '/nix-united/sku2_out_2.jpg',
        '/nix-united/sku2_out_3.jpg',
      ],
    },
  ],
};

export default function VoidCyclingPilotPage() {
  return <CasePilotPage data={data} />;
}
