import {
  ASPECT_RATIOS,
  RESOLUTIONS,
  type DemoAspectRatio,
  type DemoResolution,
} from "@/lib/machine/baby-braithwaite/demo-library";

export const DEFAULT_IMAGE_MODEL = "gpt-image-2";

export const DEFAULT_IMAGE_QUALITY = "low" as const;

const RESOLUTION_LONG_EDGE: Record<DemoResolution, number> = {
  "1K": 1024,
  "2K": 2048,
  "4K": 3840,
};

const ASPECT_RATIO_VALUES: Record<DemoAspectRatio, [number, number]> = {
  "1:1": [1, 1],
  "4:3": [4, 3],
  "3:2": [3, 2],
  "16:9": [16, 9],
  "9:16": [9, 16],
  "2:3": [2, 3],
};

const SIZE_MIN_PIXELS = 655_360;
const SIZE_MAX_PIXELS = 8_294_400;
const SIZE_MAX_EDGE = 3840;
const SIZE_STEP = 16;

function snapToStep(value: number) {
  return Math.max(SIZE_STEP, Math.round(value / SIZE_STEP) * SIZE_STEP);
}

function snapToStepCeil(value: number) {
  return Math.max(SIZE_STEP, Math.ceil(value / SIZE_STEP) * SIZE_STEP);
}

function snapToStepFloor(value: number) {
  return Math.max(SIZE_STEP, Math.floor(value / SIZE_STEP) * SIZE_STEP);
}

export function resolveImageSize(
  aspectRatio: DemoAspectRatio,
  resolution: DemoResolution,
): string {
  const [w, h] = ASPECT_RATIO_VALUES[aspectRatio];
  const targetLong = RESOLUTION_LONG_EDGE[resolution];
  const isLandscape = w >= h;

  let width = isLandscape ? targetLong : Math.round((targetLong * w) / h);
  let height = isLandscape ? Math.round((targetLong * h) / w) : targetLong;

  width = snapToStep(width);
  height = snapToStep(height);

  if (width > SIZE_MAX_EDGE) {
    height = snapToStep((height * SIZE_MAX_EDGE) / width);
    width = SIZE_MAX_EDGE;
  }
  if (height > SIZE_MAX_EDGE) {
    width = snapToStep((width * SIZE_MAX_EDGE) / height);
    height = SIZE_MAX_EDGE;
  }

  let total = width * height;
  if (total > SIZE_MAX_PIXELS) {
    const scale = Math.sqrt(SIZE_MAX_PIXELS / total);
    width = snapToStepFloor(width * scale);
    height = snapToStepFloor(height * scale);
    while (width * height > SIZE_MAX_PIXELS) {
      if (width >= height) width -= SIZE_STEP;
      else height -= SIZE_STEP;
    }
    total = width * height;
  }
  if (total < SIZE_MIN_PIXELS) {
    const scale = Math.sqrt(SIZE_MIN_PIXELS / total);
    width = snapToStepCeil(width * scale);
    height = snapToStepCeil(height * scale);
    while (width * height < SIZE_MIN_PIXELS) {
      if (width <= height) width += SIZE_STEP;
      else height += SIZE_STEP;
    }
  }

  return `${width}x${height}`;
}

export const DEFAULT_GENERATION_PROMPT = `create a lifestyle imagery of a baby/toddler trying on this clothing piece for my ecommerce product page. I want premium ecommerce product photo vibes. Use image 1 as the exact original design, geometry of the clothing piece; put it on a child of appropriate age and sex that this is designed for, in an environment similar to the ones provided in the reference images. shoot the toddler wearing the clothing piece like how we shot our try on pieces in reference images 2-n. similar backgrounds, and happy expressions.`;

export type ClientAssetDescriptor =
  | {
      alt: string;
      dataUrl?: string;
      fileName?: string | null;
      kind: "dataUrl";
      mimeType?: string | null;
    }
  | {
      alt: string;
      kind: "file";
      key: string;
      fileName?: string | null;
      mimeType?: string | null;
    }
  | {
      alt: string;
      kind: "path";
      src: string;
      fileName?: string | null;
      mimeType?: string | null;
    };

type BuildPromptInput = {
  aspectRatio: DemoAspectRatio;
  inputImageCount: number;
  productSpecs: string;
  referenceCount: number;
  referenceName: string | null;
  resolution: DemoResolution;
  revisionPrompt?: string;
  skuName: string;
};

export function isSupportedAspectRatio(value: string): value is DemoAspectRatio {
  return ASPECT_RATIOS.includes(value as DemoAspectRatio);
}

export function isSupportedResolution(value: string): value is DemoResolution {
  return RESOLUTIONS.includes(value as DemoResolution);
}

export function buildRevisionPrompt(userPrompt: string) {
  return `Edit the image and keep everything exactly the same. However, ${userPrompt.trim()}`;
}

export function buildGenerationPrompt({
  aspectRatio,
  inputImageCount,
  productSpecs,
  referenceCount,
  referenceName,
  resolution,
  revisionPrompt,
  skuName,
}: BuildPromptInput) {
  const sections = [
    DEFAULT_GENERATION_PROMPT,
    `SKU: ${skuName}`,
    `Product specs:\n${productSpecs.trim() || "No additional product specs provided."}`,
    `Requested dimensions: ${aspectRatio}`,
    `Requested photo quality: ${resolution}`,
    `The first uploaded product image is the authoritative garment design and geometry reference.`,
    referenceName
      ? `The default reference library is attached automatically. Prioritize the styling cues from the selected primary reference "${referenceName}" first, then use the remaining ${Math.max(referenceCount - 1, 0)} reference images to stay on brand.`
      : `The default reference library is attached automatically and should guide the environment, lighting, and styling.`,
    inputImageCount > 1
      ? `Additional product input images appear after the reference set and provide extra garment detail views for trims, fit, and print accuracy.`
      : `Only one product source image was supplied for the garment.`,
  ];

  if (revisionPrompt?.trim()) {
    sections.push(`Revision request:\n${revisionPrompt.trim()}`);
  }

  return sections.join("\n\n");
}
