"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  Download,
  Image as ImageIcon,
  Layers,
  Library,
  MousePointerSquareDashed,
  PenLine,
  Play,
  Plus,
  SendHorizontal,
  Settings2,
  Trash2,
  Type,
  UploadCloud,
  X,
} from "lucide-react";

import {
  ASPECT_RATIOS,
  createDemoSkus,
  DEFAULT_ACTIVE_SKU_ID,
  REFERENCE_LIBRARY,
  RESOLUTIONS,
  type DemoAsset,
  type DemoSku,
} from "@/lib/machine/baby-braithwaite/demo-library";
import {
  DEFAULT_IMAGE_MODEL,
  type ClientAssetDescriptor,
} from "@/lib/machine/baby-braithwaite/generation";

function toAssetSrc(src: string) {
  return src.startsWith("data:") ? src : encodeURI(src);
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripExtension(value: string) {
  return value.replace(/\.[^/.]+$/, "");
}

function getAssetExtension(asset: DemoAsset) {
  if (asset.mimeType === "image/png") return "png";
  if (asset.mimeType === "image/webp") return "webp";
  if (asset.mimeType === "image/jpeg") return "jpg";

  const dataUrlMatch = asset.src.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,/);
  if (dataUrlMatch?.[1]) {
    return dataUrlMatch[1] === "jpeg" ? "jpg" : dataUrlMatch[1];
  }

  const pathMatch = asset.src.match(/\.([a-zA-Z0-9]+)(?:$|\?)/);
  return pathMatch?.[1] ?? "png";
}

function createUploadedAsset(file: File) {
  return {
    alt: stripExtension(file.name),
    file,
    fileName: file.name,
    mimeType: file.type || null,
    objectUrl: true,
    source: "upload" as const,
    src: URL.createObjectURL(file),
  };
}

function createRevisionSourceDescriptor(asset: DemoAsset): ClientAssetDescriptor {
  if (asset.src.startsWith("data:")) {
    return {
      alt: asset.alt,
      dataUrl: asset.src,
      fileName: asset.fileName,
      kind: "dataUrl",
      mimeType: asset.mimeType,
    };
  }

  return {
    alt: asset.alt,
    fileName: asset.fileName,
    kind: "path",
    mimeType: asset.mimeType,
    src: asset.src,
  };
}

type GenerateResponse = {
  imageDataUrl: string;
  mimeType: string;
  model: string;
  notes: string | null;
  prompt: string;
};

export default function Workspace() {
  const [skus, setSkus] = useState<DemoSku[]>(createDemoSkus);
  const [activeSkuId, setActiveSkuId] = useState<string | null>(DEFAULT_ACTIVE_SKU_ID);
  const [expandedAsset, setExpandedAsset] = useState<DemoAsset | null>(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [revisePanelOpen, setRevisePanelOpen] = useState(false);
  const [revisePrompt, setRevisePrompt] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [referencesExpanded, setReferencesExpanded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdObjectUrlsRef = useRef<Set<string>>(new Set());

  const activeSku = skus.find((sku) => sku.id === activeSkuId) ?? null;
  const heroInput = activeSku?.inputImages[0] ?? null;
  const displayedAsset = activeSku?.generatedImage ?? heroInput;
  const visibleReferences = referencesExpanded
    ? REFERENCE_LIBRARY
    : REFERENCE_LIBRARY.slice(0, 4);

  useEffect(() => {
    if (!expandedAsset && !exportMenuOpen && !revisePanelOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedAsset(null);
        setExportMenuOpen(false);
        setRevisePanelOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedAsset, exportMenuOpen, revisePanelOpen]);

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    const createdObjectUrls = createdObjectUrlsRef.current;

    return () => {
      for (const url of createdObjectUrls) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  const revokeAssetUrl = (asset: DemoAsset | null | undefined) => {
    if (!asset?.objectUrl) return;

    URL.revokeObjectURL(asset.src);
    createdObjectUrlsRef.current.delete(asset.src);
  };

  const updateSku = (
    skuId: string,
    updates: Partial<DemoSku> | ((currentSku: DemoSku) => DemoSku),
  ) => {
    setSkus((currentSkus) =>
      currentSkus.map((sku) => {
        if (sku.id !== skuId) return sku;
        return typeof updates === "function" ? updates(sku) : { ...sku, ...updates };
      }),
    );
  };

  const activateSku = (skuId: string) => {
    setExportMenuOpen(false);
    setRevisePanelOpen(false);
    setRevisePrompt("");
    setToastMessage(null);
    setReferencesExpanded(false);
    setActiveSkuId(skuId);
  };

  const handleAddSku = () => {
    const nextIndex = skus.length + 1;
    const newSku: DemoSku = {
      aspectRatio: "1:1",
      attributesText:
        "Target: Toddler girl, 4 years old\nStyle: Matching set\nMaterial: Cotton\nNotes: Add any age, gender, fit, or styling constraints here.",
      errorMessage: null,
      generationNotes: null,
      generatedImage: null,
      id: `sku-${String(nextIndex).padStart(3, "0")}`,
      inputImages: [],
      lastPrompt: null,
      name: `Afterlight SKU ${String(nextIndex).padStart(3, "0")}`,
      resolution: "2K",
      selectedReferenceId: REFERENCE_LIBRARY[0]?.id ?? null,
      status: "idle",
    };

    setSkus((currentSkus) => [...currentSkus, newSku]);
    activateSku(newSku.id);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (!activeSkuId) return;

    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const uploadedAssets = files.map((file) => {
      const asset = createUploadedAsset(file);
      createdObjectUrlsRef.current.add(asset.src);
      return asset;
    });

    updateSku(activeSkuId, (sku) => ({
      ...sku,
      errorMessage: null,
      generationNotes: null,
      generatedImage: null,
      inputImages: [...sku.inputImages, ...uploadedAssets],
      lastPrompt: null,
      status: "idle",
    }));

    event.target.value = "";
  };

  const handleRemoveInput = (index: number) => {
    if (!activeSkuId || !activeSku) return;

    const asset = activeSku.inputImages[index];
    revokeAssetUrl(asset);

    updateSku(activeSkuId, (sku) => ({
      ...sku,
      errorMessage: null,
      generationNotes: null,
      generatedImage: null,
      inputImages: sku.inputImages.filter((_, imageIndex) => imageIndex !== index),
      lastPrompt: null,
      status: "idle",
    }));
  };

  const handleDownloadImage = () => {
    if (!activeSku || !displayedAsset) return;

    const anchor = document.createElement("a");
    anchor.href = toAssetSrc(displayedAsset.src);
    anchor.download = `${slugify(activeSku.name) || "afterlight"}-lifestyle.${getAssetExtension(
      displayedAsset,
    )}`;
    anchor.click();

    setExportMenuOpen(false);
    setToastMessage("Download started.");
  };

  const generateImage = async (revisionText = "") => {
    if (!activeSku || !activeSkuId || activeSku.inputImages.length === 0) return;

    const skuId = activeSkuId;
    const formData = new FormData();
    const descriptors: ClientAssetDescriptor[] = [];

    activeSku.inputImages.forEach((asset, index) => {
      if (asset.file) {
        const key = `input-file-${index}`;
        descriptors.push({
          alt: asset.alt,
          fileName: asset.fileName,
          key,
          kind: "file",
          mimeType: asset.mimeType,
        });
        formData.append(key, asset.file, asset.fileName ?? asset.file.name);
        return;
      }

      descriptors.push({
        alt: asset.alt,
        fileName: asset.fileName,
        kind: "path",
        mimeType: asset.mimeType,
        src: asset.src,
      });
    });

    formData.append("inputDescriptors", JSON.stringify(descriptors));
    formData.append("skuName", activeSku.name);
    formData.append("productSpecs", activeSku.attributesText);
    formData.append("selectedReferenceId", activeSku.selectedReferenceId ?? "");
    formData.append("aspectRatio", activeSku.aspectRatio);
    formData.append("resolution", activeSku.resolution);
    formData.append("revisionPrompt", revisionText);

    if (revisionText.trim()) {
      const revisionSource = activeSku.generatedImage ?? displayedAsset;
      if (revisionSource) {
        formData.append(
          "revisionSourceDescriptor",
          JSON.stringify(createRevisionSourceDescriptor(revisionSource)),
        );
      }
    }

    updateSku(skuId, (sku) => ({
      ...sku,
      errorMessage: null,
      generationNotes: null,
      lastPrompt: null,
      status: "generating",
    }));

    try {
      const response = await fetch("/api/machine/baby-braithwaite/generate", {
        body: formData,
        method: "POST",
      });

      const data = (await response.json()) as GenerateResponse | { error: string };

      if (!response.ok || !("imageDataUrl" in data)) {
        throw new Error("error" in data ? data.error : "Generation failed.");
      }

      updateSku(skuId, (sku) => ({
        ...sku,
        errorMessage: null,
        generationNotes: data.notes,
        generatedImage: {
          alt: `${sku.name} generated lifestyle image`,
          fileName: `${slugify(sku.name) || "afterlight"}-lifestyle.${getAssetExtension({
            alt: "",
            mimeType: data.mimeType,
            source: "generated",
            src: data.imageDataUrl,
          })}`,
          mimeType: data.mimeType,
          objectUrl: false,
          source: "generated",
          src: data.imageDataUrl,
        },
        lastPrompt: data.prompt,
        status: "completed",
      }));

      setToastMessage(revisionText ? "Revision generated." : "Image generated.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error while generating.";

      updateSku(skuId, (sku) => ({
        ...sku,
        errorMessage: message,
        status: "error",
      }));
    }
  };

  const handleRun = () => {
    void generateImage();
  };

  const handleReviseSubmit = () => {
    const revisionText = revisePrompt.trim();
    if (!revisionText) return;

    setRevisePanelOpen(false);
    setExportMenuOpen(false);
    setRevisePrompt("");
    void generateImage(revisionText);
  };

  return (
    <>
      <input
        accept="image/*"
        className="hidden"
        multiple
        onChange={handleFileSelection}
        ref={fileInputRef}
        type="file"
      />

      <div className="flex h-screen w-full overflow-hidden bg-neutral-50 font-sans text-neutral-900 selection:bg-neutral-200">
        <div className="z-10 flex w-72 shrink-0 flex-col border-r border-neutral-200 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
          <div className="flex h-14 items-center justify-between border-b border-neutral-200 bg-neutral-50/50 px-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Pipeline
            </span>
            <Layers className="h-4 w-4 text-neutral-400" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {skus.map((sku) => {
              const thumbnail = sku.generatedImage ?? sku.inputImages[0] ?? null;

              return (
                <div
                  key={sku.id}
                  onClick={() => activateSku(sku.id)}
                  className={`group flex h-20 cursor-pointer items-center border-b border-neutral-200 px-4 transition-all ${
                    activeSkuId === sku.id
                      ? "border-l-4 border-l-black bg-neutral-100"
                      : "border-l-4 border-l-transparent hover:bg-neutral-50"
                  }`}
                >
                  <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-neutral-300 bg-neutral-200">
                    {thumbnail ? (
                      <img
                        alt={thumbnail.alt}
                        className="block h-full w-full object-cover"
                        src={toAssetSrc(thumbnail.src)}
                      />
                    ) : (
                      <MousePointerSquareDashed className="h-4 w-4 text-neutral-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-900">{sku.name}</p>
                    <p className="mt-0.5 truncate text-xs text-neutral-500">
                      {sku.inputImages.length === 0
                        ? "Upload product photos"
                        : `${sku.inputImages.length} product input${sku.inputImages.length === 1 ? "" : "s"}`}
                    </p>
                  </div>

                  {sku.status === "completed" && <Check className="h-4 w-4 text-green-600" />}
                  {sku.status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
              );
            })}

            <div
              onClick={handleAddSku}
              className="flex h-20 cursor-pointer items-center border-b border-neutral-200 px-4 text-neutral-400 transition-all hover:bg-neutral-50 hover:text-neutral-900"
            >
              <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center border border-dashed border-neutral-300 bg-white">
                <Plus className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">New SKU</span>
            </div>
          </div>
        </div>

        {activeSku && (
          <div className="z-10 flex min-h-0 w-[420px] shrink-0 flex-col border-r border-neutral-200 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-50/50 px-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Configuration
                </span>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Demos are loaded. Real uploads are supported.
                </p>
              </div>
              <Settings2 className="h-4 w-4 text-neutral-400" />
            </div>

            <div className="min-h-0 flex-1 space-y-8 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    SKU Identifier
                  </label>
                  <input
                    className="w-full rounded-none border border-neutral-200 bg-white px-3 py-2 text-sm font-medium transition-all focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    onChange={(event) =>
                      updateSku(activeSku.id, { name: event.target.value || activeSku.name })
                    }
                    type="text"
                    value={activeSku.name}
                  />
                </div>

                <button
                  className="group flex w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-neutral-300 bg-neutral-50/50 p-6 transition-all hover:border-black hover:bg-neutral-50"
                  onClick={handleUploadClick}
                  type="button"
                >
                  <UploadCloud className="mb-2 h-6 w-6 text-neutral-400 transition-colors group-hover:text-black" />
                  <p className="text-xs font-medium text-neutral-600 group-hover:text-black">
                    Upload product shots for this SKU
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-400">
                    Image 1 is treated as the garment source. The default reference library is
                    attached automatically on every run.
                  </p>
                </button>

                {heroInput ? (
                  <div className="space-y-2">
                    <div className="group relative overflow-hidden border border-neutral-200 bg-neutral-100">
                      <button
                        className="block w-full text-left transition-colors hover:border-black"
                        onClick={() => setExpandedAsset(heroInput)}
                        type="button"
                      >
                        <img
                          alt={heroInput.alt}
                          className="block h-auto w-full"
                          src={toAssetSrc(heroInput.src)}
                        />
                      </button>
                      <button
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow transition-colors hover:text-red-600"
                        onClick={() => handleRemoveInput(0)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {activeSku.inputImages.slice(1).map((image, index) => (
                        <div
                          key={`${image.src}-${index}`}
                          className="group relative overflow-hidden border border-neutral-200 bg-neutral-100"
                        >
                          <button
                            className="block w-full text-left"
                            onClick={() => setExpandedAsset(image)}
                            type="button"
                          >
                            <img
                              alt={image.alt}
                              className="block aspect-square w-full object-cover"
                              src={toAssetSrc(image.src)}
                            />
                          </button>
                          <button
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow transition-colors hover:text-red-600"
                            onClick={() => handleRemoveInput(index + 1)}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-400">
                    <ImageIcon className="mb-2 h-8 w-8 opacity-50" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em]">
                      No Product Inputs Yet
                    </p>
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-neutral-200" />

              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Type className="h-3 w-3" /> Product Specs
                </h3>
                <textarea
                  className="w-full resize-y rounded-none border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-700 transition-all focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  onChange={(event) =>
                    updateSku(activeSku.id, (sku) => ({
                      ...sku,
                      attributesText: event.target.value,
                      errorMessage: null,
                      generationNotes: null,
                      generatedImage: null,
                      lastPrompt: null,
                      status: "idle",
                    }))
                  }
                  rows={7}
                  value={activeSku.attributesText}
                />
                <p className="text-[11px] leading-5 text-neutral-500">
                  Put age, gender, fit, styling direction, or environment notes here. Example:
                  `Target: Toddler boy, 5 years old`.
                </p>
              </div>

              <div className="h-px w-full bg-neutral-200" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                    <Library className="h-3 w-3" /> Reference Library
                  </h3>
                  {REFERENCE_LIBRARY.length > 4 && (
                    <button
                      className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-neutral-900"
                      onClick={() => setReferencesExpanded((current) => !current)}
                      type="button"
                    >
                      {referencesExpanded ? "Collapse" : "Expand"}
                    </button>
                  )}
                </div>

                <p className="text-[11px] leading-5 text-neutral-500">
                  These references are always supplied to Gemini. Your selected tile is given
                  priority in the prompt.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {visibleReferences.map((reference) => (
                    <button
                      key={reference.id}
                      onClick={() =>
                        updateSku(activeSku.id, (sku) => ({
                          ...sku,
                          errorMessage: null,
                          generationNotes: null,
                          generatedImage: null,
                          lastPrompt: null,
                          selectedReferenceId: reference.id,
                          status: "idle",
                        }))
                      }
                      type="button"
                      className={`group relative aspect-square overflow-hidden border transition-all ${
                        activeSku.selectedReferenceId === reference.id
                          ? "border-black ring-1 ring-black"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <img
                        alt={reference.image.alt}
                        className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={toAssetSrc(reference.image.src)}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-neutral-200" />

              <div className="space-y-4 pb-4">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <Settings2 className="h-3 w-3" /> Output Settings
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Photo Quality
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {RESOLUTIONS.map((resolution) => (
                        <button
                          key={resolution}
                          className={`rounded-none border py-1.5 text-xs font-medium transition-colors ${
                            activeSku.resolution === resolution
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                          }`}
                          onClick={() =>
                            updateSku(activeSku.id, (sku) => ({
                              ...sku,
                              errorMessage: null,
                              generationNotes: null,
                              generatedImage: null,
                              lastPrompt: null,
                              resolution,
                              status: "idle",
                            }))
                          }
                          type="button"
                        >
                          {resolution}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Dimensions
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {ASPECT_RATIOS.map((aspectRatio) => (
                        <button
                          key={aspectRatio}
                          className={`rounded-none border py-1.5 text-xs font-medium transition-colors ${
                            activeSku.aspectRatio === aspectRatio
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                          }`}
                          onClick={() =>
                            updateSku(activeSku.id, (sku) => ({
                              ...sku,
                              aspectRatio,
                              errorMessage: null,
                              generationNotes: null,
                              generatedImage: null,
                              lastPrompt: null,
                              status: "idle",
                            }))
                          }
                          type="button"
                        >
                          {aspectRatio}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeSku.sourceUrl && (
                <>
                  <div className="h-px w-full bg-neutral-200" />
                  <div className="space-y-2 pb-4">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                      <ArrowUpRight className="h-3 w-3" /> Source Link
                    </h3>
                    <a
                      href={activeSku.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-xs text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                      {activeSku.sourceUrl}
                    </a>
                  </div>
                </>
              )}

              {activeSku.errorMessage && (
                <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {activeSku.errorMessage}
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-neutral-200 bg-white p-6">
              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-none bg-black text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500"
                disabled={activeSku.status === "generating" || activeSku.inputImages.length === 0}
                onClick={handleRun}
                type="button"
              >
                {activeSku.status === "generating" ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-white" />
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" /> Generate Lifestyle Image
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="relative flex-1 overflow-hidden bg-[#F5F5F5]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm">
              Canvas <span>100%</span>
            </div>
            {activeSku && (
              <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm">
                <span>{activeSku.aspectRatio}</span>
                <span className="text-neutral-300">/</span>
                <span>{activeSku.resolution}</span>
              </div>
            )}
          </div>

          <div
            className="absolute inset-0 z-0 flex items-center justify-center overflow-auto p-12"
            onClick={() => {
              setExportMenuOpen(false);
              setRevisePanelOpen(false);
            }}
          >
            {displayedAsset && activeSku?.status !== "generating" && (
              <div
                className="absolute right-8 top-8 z-10 flex flex-col items-end gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start gap-2">
                  <div className="relative">
                    <button
                      className={`group flex h-10 items-center gap-2 rounded-full border px-4 text-[11px] font-semibold tracking-[0.16em] text-neutral-700 backdrop-blur-xl transition-all ${
                        exportMenuOpen
                          ? "border-neutral-300 bg-white/96 shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                          : "border-white/65 bg-white/82 shadow-[0_10px_28px_rgba(0,0,0,0.10)] hover:bg-white/96"
                      }`}
                      onClick={() => {
                        setExportMenuOpen((current) => !current);
                        setRevisePanelOpen(false);
                      }}
                      type="button"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 transition-colors group-hover:text-neutral-900" />
                      <span>EXPORT</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${
                          exportMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {exportMenuOpen && (
                      <div className="absolute right-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-[22px] border border-white/70 bg-white/94 p-2 shadow-[0_28px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
                        <button
                          className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-left transition-colors hover:bg-neutral-100"
                          onClick={handleDownloadImage}
                          type="button"
                        >
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900">
                              Download
                            </p>
                            <p className="mt-1 text-xs text-neutral-500">
                              Save the current lifestyle image locally
                            </p>
                          </div>
                          <Download className="h-4 w-4 text-neutral-400" />
                        </button>
                        <button
                          className="mt-1 flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-left transition-colors hover:bg-neutral-100"
                          onClick={() => {
                            setExportMenuOpen(false);
                            setToastMessage(`Model: ${DEFAULT_IMAGE_MODEL}`);
                          }}
                          type="button"
                        >
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-900">
                              Model
                            </p>
                            <p className="mt-1 text-xs text-neutral-500">{DEFAULT_IMAGE_MODEL}</p>
                          </div>
                          <Library className="h-4 w-4 text-neutral-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      className={`group flex h-10 items-center gap-2 rounded-full border px-4 text-[11px] font-semibold tracking-[0.16em] text-neutral-700 backdrop-blur-xl transition-all ${
                        revisePanelOpen
                          ? "border-neutral-300 bg-white/96 shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                          : "border-white/65 bg-white/82 shadow-[0_10px_28px_rgba(0,0,0,0.10)] hover:bg-white/96"
                      }`}
                      onClick={() => {
                        setRevisePanelOpen((current) => !current);
                        setExportMenuOpen(false);
                      }}
                      type="button"
                    >
                      <PenLine className="h-3.5 w-3.5 text-neutral-500 transition-colors group-hover:text-neutral-900" />
                      <span>REVISE</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${
                          revisePanelOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {revisePanelOpen && (
                      <div className="absolute right-0 top-[calc(100%+10px)] w-[320px] overflow-hidden rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
                        <div className="px-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900">
                            Revision Prompt
                          </p>
                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            Add a directional tweak. The original product image plus the default
                            reference library will be resent on regenerate.
                          </p>
                        </div>

                        <textarea
                          className="mt-4 min-h-28 w-full resize-none rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400"
                          onChange={(event) => setRevisePrompt(event.target.value)}
                          placeholder="Make the scene brighter, keep the smile, and move slightly closer to camera."
                          rows={5}
                          value={revisePrompt}
                        />

                        <div className="mt-4 flex items-center justify-between">
                          <button
                            className="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-neutral-900"
                            onClick={() => setRevisePanelOpen(false)}
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            className="flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
                            disabled={!revisePrompt.trim()}
                            onClick={handleReviseSubmit}
                            type="button"
                          >
                            <SendHorizontal className="h-3.5 w-3.5" />
                            Regenerate
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {toastMessage && (
                  <div className="flex items-center gap-2 rounded-full border border-white/65 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700 shadow-[0_10px_28px_rgba(0,0,0,0.10)] backdrop-blur-xl">
                    <CheckCheck className="h-3.5 w-3.5 text-neutral-500" />
                    <span>{toastMessage}</span>
                  </div>
                )}
              </div>
            )}

            {activeSku?.status === "generating" ? (
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-black" />
                <p className="animate-pulse text-sm font-bold uppercase tracking-widest text-neutral-500">
                  Rendering...
                </p>
              </div>
            ) : displayedAsset ? (
              <div className="relative inline-flex max-w-[72vw]">
                {activeSku?.generationNotes && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 border border-white/70 bg-white/90 px-4 py-3 text-left text-sm leading-6 text-neutral-700 shadow-lg backdrop-blur">
                    {activeSku.generationNotes}
                  </div>
                )}
                <div className="relative inline-flex">
                  <button
                    className="cursor-zoom-in border-0 bg-transparent p-0"
                    onClick={() => setExpandedAsset(displayedAsset)}
                    type="button"
                  >
                    <img
                      alt={displayedAsset.alt}
                      className="block h-auto max-h-[76vh] w-auto max-w-[72vw] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
                      src={toAssetSrc(displayedAsset.src)}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-neutral-400">
                <UploadCloud className="mx-auto mb-3 h-8 w-8 opacity-50" />
                <p className="text-sm font-bold uppercase tracking-widest">
                  Awaiting Product Input
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {expandedAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setExpandedAsset(null)}
        >
          <button
            aria-label="Close expanded image"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setExpandedAsset(null)}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="max-h-full max-w-full overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              alt={expandedAsset.alt}
              className="block h-auto max-h-[85vh] w-auto max-w-[85vw]"
              src={toAssetSrc(expandedAsset.src)}
            />
          </div>
        </div>
      )}
    </>
  );
}
