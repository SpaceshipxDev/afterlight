export const RESOLUTIONS = ["1K", "2K", "4K"] as const;
export type DemoResolution = (typeof RESOLUTIONS)[number];

export const ASPECT_RATIOS = ["1:1", "4:3", "3:2", "16:9", "9:16", "2:3"] as const;
export type DemoAspectRatio = (typeof ASPECT_RATIOS)[number];

export type DemoAssetSource = "demo" | "upload" | "generated";

export type DemoAsset = {
  alt: string;
  file?: File;
  fileName?: string | null;
  mimeType?: string | null;
  objectUrl?: boolean;
  source: DemoAssetSource;
  src: string;
};

export type DemoStatus = "idle" | "generating" | "completed" | "error";

export type DemoReference = {
  category: string;
  id: string;
  image: DemoAsset;
  name: string;
};

export type DemoSku = {
  aspectRatio: DemoAspectRatio;
  attributesText: string;
  errorMessage: string | null;
  generationNotes: string | null;
  generatedImage: DemoAsset | null;
  id: string;
  inputImages: DemoAsset[];
  lastPrompt: string | null;
  name: string;
  resolution: DemoResolution;
  selectedReferenceId: string | null;
  sourceUrl?: string | null;
  status: DemoStatus;
};

function createDemoAsset(asset: Omit<DemoAsset, "source">): DemoAsset {
  return {
    ...asset,
    fileName: asset.fileName ?? null,
    mimeType: asset.mimeType ?? null,
    objectUrl: false,
    source: "demo",
  };
}

const catalogAssets = {
  floralBubbleBefore: createDemoAsset({
    alt: "Floral Bubble Romper on ghost mannequin",
    src: "/machine/baby-braithwaite/demo/flywheel/before-01-floral-bubble.webp",
  }),
  floralBubbleAfter: createDemoAsset({
    alt: "Floral Bubble Romper lifestyle flatlay",
    src: "/machine/baby-braithwaite/demo/flywheel/after-01-floral-bubble.jpg",
  }),
  tennisShortsBefore: createDemoAsset({
    alt: "Tennis shorts on ghost mannequin",
    src: "/machine/baby-braithwaite/demo/flywheel/before-02-tennis-shorts.webp",
  }),
  tennisShortsAfter: createDemoAsset({
    alt: "Tennis shorts lifestyle photo",
    src: "/machine/baby-braithwaite/demo/flywheel/after-02-tennis-shorts.jpg",
  }),
  floralDressBefore: createDemoAsset({
    alt: "Floral dress on ghost mannequin",
    src: "/machine/baby-braithwaite/demo/flywheel/before-03-floral-dress.webp",
  }),
  floralDressAfterA: createDemoAsset({
    alt: "Floral dress lifestyle pose",
    src: "/machine/baby-braithwaite/demo/flywheel/after-03a-floral-dress.jpg",
  }),
  floralDressAfterB: createDemoAsset({
    alt: "Floral dress alternate lifestyle pose",
    src: "/machine/baby-braithwaite/demo/flywheel/after-03b-floral-dress.jpg",
  }),
  stripePoloBefore: createDemoAsset({
    alt: "Stripe polo shirt ghost mannequin",
    src: "/machine/baby-braithwaite/demo/flywheel/before-04b-stripe-polo.webp",
  }),
  stripePoloAfter: createDemoAsset({
    alt: "Stripe polo lifestyle",
    src: "/machine/baby-braithwaite/demo/flywheel/after-04-stripe-polo.jpg",
  }),
} satisfies Record<string, DemoAsset>;

// Edit this file to swap demo names, source images, attributes, render state, or
// the reference library used across the workspace UI.
export const REFERENCE_LIBRARY: DemoReference[] = [
  {
    category: "Lifestyle",
    id: "ref-apron-bubble",
    image: createDemoAsset({
      alt: "Apron bubble lifestyle reference",
      src: "/machine/baby-braithwaite/demo/flywheel/ref-apron-bubble-lifestyle.webp",
    }),
    name: "Apron Bubble",
  },
  {
    category: "Lifestyle",
    id: "ref-barrington-bubble",
    image: createDemoAsset({
      alt: "Barrington bubble lifestyle reference",
      src: "/machine/baby-braithwaite/demo/flywheel/ref-barrington-bubble-lifestyle.webp",
    }),
    name: "Barrington Bubble",
  },
  {
    category: "Lifestyle",
    id: "ref-polo-shorts",
    image: createDemoAsset({
      alt: "Polo and shorts duo reference",
      src: "/machine/baby-braithwaite/demo/flywheel/ref-polo-shorts-duo.webp",
    }),
    name: "Polo Shorts Duo",
  },
  {
    category: "Lifestyle",
    id: "ref-savannah-stripe",
    image: createDemoAsset({
      alt: "Savannah stripe group reference",
      src: "/machine/baby-braithwaite/demo/flywheel/ref-savannah-stripe-group.webp",
    }),
    name: "Savannah Stripe",
  },
];

export const DEMO_SKUS: DemoSku[] = [
  {
    aspectRatio: "4:3",
    attributesText:
      "Style: Floral Bubble Romper\nTarget: Baby girl, around 18 months\nFit: Relaxed\nMaterial: Cotton blend\nDetails: Ruffled sleeves, snap closure.",
    errorMessage: null,
    generationNotes: null,
    generatedImage: catalogAssets.floralBubbleAfter,
    id: "sku-001",
    inputImages: [catalogAssets.floralBubbleBefore],
    lastPrompt: null,
    name: "Floral Bubble Romper",
    resolution: "4K",
    selectedReferenceId: "ref-apron-bubble",
    sourceUrl: "https://babybraithwaite.com/products/english-garden-woven-spring-bubble",
    status: "completed",
  },
  {
    aspectRatio: "1:1",
    attributesText:
      "Style: Tennis Shorts\nTarget: Toddler boy, around 4 years old\nFit: Active\nMaterial: Moisture-wicking\nDetails: Elastic waistband.",
    errorMessage: null,
    generationNotes: null,
    generatedImage: catalogAssets.tennisShortsAfter,
    id: "sku-002",
    inputImages: [catalogAssets.tennisShortsBefore],
    lastPrompt: null,
    name: "Athletic Tennis Shorts",
    resolution: "2K",
    selectedReferenceId: "ref-polo-shorts",
    sourceUrl: "https://babybraithwaite.com/products/applique-court-short-tennis",
    status: "completed",
  },
  {
    aspectRatio: "4:3",
    attributesText:
      "Style: Floral Dress\nTarget: Toddler girl, around 3 years old\nFit: Flowy\nMaterial: Lightweight crepe\nDetails: Tiered hem, short sleeves.",
    errorMessage: null,
    generationNotes: null,
    generatedImage: catalogAssets.floralDressAfterA,
    id: "sku-003",
    inputImages: [catalogAssets.floralDressBefore],
    lastPrompt: null,
    name: "Spring Floral Dress",
    resolution: "2K",
    selectedReferenceId: "ref-barrington-bubble",
    sourceUrl: null,
    status: "completed",
  },
  {
    aspectRatio: "1:1",
    attributesText:
      "Style: Stripe Polo\nTarget: Toddler boy, around 5 years old\nFit: Classic\nMaterial: Pique cotton\nDetails: Contrast collar, button placket.",
    errorMessage: null,
    generationNotes: null,
    generatedImage: catalogAssets.stripePoloAfter,
    id: "sku-004",
    inputImages: [catalogAssets.stripePoloBefore],
    lastPrompt: null,
    name: "Classic Stripe Polo",
    resolution: "4K",
    selectedReferenceId: "ref-savannah-stripe",
    sourceUrl: null,
    status: "completed",
  },
];

export const DEFAULT_ACTIVE_SKU_ID = DEMO_SKUS[0]?.id ?? null;

export function createDemoSkus(): DemoSku[] {
  return DEMO_SKUS.map((sku) => ({
    ...sku,
    generatedImage: sku.generatedImage ? { ...sku.generatedImage } : null,
    inputImages: sku.inputImages.map((image) => ({ ...image })),
  }));
}
