import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";

import {
  REFERENCE_LIBRARY,
  type DemoAspectRatio,
  type DemoResolution,
} from "@/lib/machine/baby-braithwaite/demo-library";
import {
  DEFAULT_IMAGE_MODEL,
  DEFAULT_IMAGE_QUALITY,
  buildGenerationPrompt,
  buildRevisionPrompt,
  isSupportedAspectRatio,
  isSupportedResolution,
  resolveImageSize,
  type ClientAssetDescriptor,
} from "@/lib/machine/baby-braithwaite/generation";

export const runtime = "nodejs";
export const maxDuration = 300;

const MIME_TYPES: Record<string, string> = {
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type LoadedAsset = {
  alt: string;
  buffer: Buffer;
  mimeType: string;
};

function getTextField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function inferMimeType(fileName: string | null | undefined, fallback = "image/jpeg") {
  if (!fileName) return fallback;
  const extension = path.extname(fileName).toLowerCase();
  return MIME_TYPES[extension] ?? fallback;
}

function resolvePublicAssetPath(assetPath: string) {
  if (!assetPath.startsWith("/")) {
    throw new Error("Only public asset paths are supported.");
  }
  const publicRoot = path.join(process.cwd(), "public");
  const absolutePath = path.join(publicRoot, assetPath.replace(/^\/+/, ""));
  if (!absolutePath.startsWith(publicRoot)) {
    throw new Error("Invalid public asset path.");
  }
  return absolutePath;
}

async function loadPublicAsset(assetPath: string, alt: string): Promise<LoadedAsset> {
  const absolutePath = resolvePublicAssetPath(assetPath);
  const buffer = await fs.readFile(absolutePath);
  return {
    alt,
    buffer,
    mimeType: inferMimeType(absolutePath),
  };
}

async function loadInputAsset(
  descriptor: ClientAssetDescriptor,
  formData: FormData,
): Promise<LoadedAsset> {
  if (descriptor.kind === "dataUrl") {
    if (!descriptor.dataUrl) {
      throw new Error(`Missing data URL for ${descriptor.alt}.`);
    }
    const match = descriptor.dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) {
      throw new Error(`Invalid data URL for ${descriptor.alt}.`);
    }
    return {
      alt: descriptor.alt,
      buffer: Buffer.from(match[2], "base64"),
      mimeType: descriptor.mimeType || match[1],
    };
  }

  if (descriptor.kind === "path") {
    return loadPublicAsset(descriptor.src, descriptor.alt);
  }

  const formValue = formData.get(descriptor.key);
  if (!(formValue instanceof File)) {
    throw new Error(`Missing uploaded file for ${descriptor.alt}.`);
  }
  const buffer = Buffer.from(await formValue.arrayBuffer());
  return {
    alt: descriptor.alt,
    buffer,
    mimeType: descriptor.mimeType || formValue.type || inferMimeType(descriptor.fileName),
  };
}

function getOrderedReferences(selectedReferenceId: string | null) {
  if (!selectedReferenceId) return REFERENCE_LIBRARY;
  const selected = REFERENCE_LIBRARY.find((reference) => reference.id === selectedReferenceId);
  if (!selected) return REFERENCE_LIBRARY;
  return [
    selected,
    ...REFERENCE_LIBRARY.filter((reference) => reference.id !== selectedReferenceId),
  ];
}

function parseInputDescriptors(value: string): ClientAssetDescriptor[] {
  if (!value) return [];
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error("Input descriptors payload is invalid.");
  }
  return parsed as ClientAssetDescriptor[];
}

function parseInputDescriptor(value: string): ClientAssetDescriptor | null {
  if (!value) return null;
  const parsed = JSON.parse(value);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Input descriptor payload is invalid.");
  }
  return parsed as ClientAssetDescriptor;
}

async function toOpenAIFile(asset: LoadedAsset, fallbackName: string) {
  const ext = EXTENSION_BY_MIME[asset.mimeType] ?? "png";
  return toFile(asset.buffer, `${fallbackName}.${ext}`, { type: asset.mimeType });
}

const OPENAI_REFERENCE_LIMIT = 10;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing OPENAI_API_KEY. Add it to your server environment before generating.",
      },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const descriptors = parseInputDescriptors(getTextField(formData, "inputDescriptors"));
    const skuName = getTextField(formData, "skuName") || "Afterlight SKU";
    const productSpecs = getTextField(formData, "productSpecs");
    const selectedReferenceId = getTextField(formData, "selectedReferenceId") || null;
    const revisionPrompt = getTextField(formData, "revisionPrompt");
    const revisionSourceDescriptor = parseInputDescriptor(
      getTextField(formData, "revisionSourceDescriptor"),
    );

    const requestedAspectRatio = getTextField(formData, "aspectRatio");
    const requestedResolution = getTextField(formData, "resolution");

    const aspectRatio: DemoAspectRatio = isSupportedAspectRatio(requestedAspectRatio)
      ? requestedAspectRatio
      : "1:1";
    const resolution: DemoResolution = isSupportedResolution(requestedResolution)
      ? requestedResolution
      : "2K";

    if (descriptors.length === 0 && !revisionSourceDescriptor) {
      return NextResponse.json(
        { error: "Upload at least one product image before generating." },
        { status: 400 },
      );
    }

    const size = resolveImageSize(aspectRatio, resolution);
    const model = process.env.OPENAI_IMAGE_MODEL?.trim() || DEFAULT_IMAGE_MODEL;
    const openai = new OpenAI({ apiKey });

    let prompt = "";
    let imageFiles: Awaited<ReturnType<typeof toOpenAIFile>>[] = [];

    if (revisionPrompt.trim() && revisionSourceDescriptor) {
      const revisionSource = await loadInputAsset(revisionSourceDescriptor, formData);
      prompt = buildRevisionPrompt(revisionPrompt);
      imageFiles = [await toOpenAIFile(revisionSource, "revision-source")];
    } else {
      const inputAssets = await Promise.all(
        descriptors.map((descriptor) => loadInputAsset(descriptor, formData)),
      );
      const orderedReferences = getOrderedReferences(selectedReferenceId);
      const loadedReferences = await Promise.all(
        orderedReferences.map((reference) =>
          loadPublicAsset(reference.image.src, reference.image.alt),
        ),
      );
      const selectedReferenceName =
        orderedReferences.find((reference) => reference.id === selectedReferenceId)?.name ?? null;

      prompt = buildGenerationPrompt({
        aspectRatio,
        inputImageCount: inputAssets.length,
        productSpecs,
        referenceCount: loadedReferences.length,
        referenceName: selectedReferenceName,
        resolution,
        revisionPrompt,
        skuName,
      });

      const orderedAssets: LoadedAsset[] = [
        inputAssets[0],
        ...loadedReferences,
        ...inputAssets.slice(1),
      ].slice(0, OPENAI_REFERENCE_LIMIT);

      imageFiles = await Promise.all(
        orderedAssets.map((asset, index) => toOpenAIFile(asset, `input-${index + 1}`)),
      );
    }

    const editParams = {
      model,
      image: imageFiles,
      prompt,
      size,
      quality: DEFAULT_IMAGE_QUALITY,
      n: 1,
    } as unknown as Parameters<typeof openai.images.edit>[0];

    const response = (await openai.images.edit(editParams)) as {
      data?: Array<{ b64_json?: string | null }>;
    };

    const imageEntry = response.data?.[0];
    const b64 = imageEntry?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { error: "The model returned no image data. Adjust the prompt or inputs and try again." },
        { status: 502 },
      );
    }

    const mimeType = "image/png";

    return NextResponse.json({
      imageDataUrl: `data:${mimeType};base64,${b64}`,
      mimeType,
      model,
      notes: null,
      prompt,
      size,
      quality: DEFAULT_IMAGE_QUALITY,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while generating the image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
