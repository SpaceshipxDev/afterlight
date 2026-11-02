import { GoogleGenAI } from '@google/genai'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { catalogProducts, type CatalogProduct, getCatalogProduct } from '@/lib/catalog'

export const TRY_ON_MODEL = process.env.GEMINI_TRY_ON_MODEL ?? 'gemini-3-pro-image-preview'
export const CATALOG_RECOMMENDATION_MODEL =
  process.env.GEMINI_RECOMMENDATION_MODEL ?? 'gemini-3.1-pro-preview'

const SUPPORTED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

type ImageInput = {
  buffer: Buffer
  mimeType: string
}

type GenerateBabyTryOnInput = {
  babyAge?: string
  babyName?: string
  babyPhoto: ImageInput
  productSlug: string
  stylingNote?: string
}

type GeneratedTryOnImage = {
  buffer: Buffer
  mimeType: string
  model: string
}

type RecommendCatalogFollowUpInput = {
  babyAge?: string
  babyName?: string
  babyPhoto: ImageInput
  currentProductSlug: string
}

type CatalogFollowUpPlan = {
  detectedBabyName: string
  detectedBabyAgeLabel: string
  detectedBabyAgeMonths: number
  ageSource: 'provided' | 'visible_text' | 'estimated_from_photo' | 'unknown'
  recommendedProductSlug: string
  recommendedProductReason: string
  timingReason: string
  sendInMonths: number
  futureAgeLabel: string
  futureAgeMonths: number
  emailSubject: string
  emailPreview: string
  emailBody: string
}

export type EncodedTryOnImage = {
  base64Data: string
  dataUrl: string
  mimeType: string
  model: string
}

export type BabyProfile = {
  ageLabel: string
  ageMonths: number
  ageSource: 'provided' | 'visible_text' | 'estimated_from_photo' | 'unknown'
  name: string | null
}

export type RecommendedEmailPlan = {
  body: string
  preview: string
  sendInMonths: number
  sendOn: string
  subject: string
  timingReason: string
}

export type RecommendedCatalogProductPlan = {
  futureAgeLabel: string
  futureAgeMonths: number
  product: CatalogProduct
  reason: string
  tryOnImage: EncodedTryOnImage
}

export type GeneratedTryOnExperience = {
  babyProfile: BabyProfile
  currentProduct: CatalogProduct
  currentTryOnImage: EncodedTryOnImage
  emailPlan: RecommendedEmailPlan
  recommendedProduct: RecommendedCatalogProductPlan
}

export type GeneratedFollowUpExperience = {
  babyProfile: BabyProfile
  currentProduct: CatalogProduct
  emailPlan: RecommendedEmailPlan
  recommendedProduct: RecommendedCatalogProductPlan
}

let client: GoogleGenAI | null = null

function getApiKey() {
  return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? ''
}

function getClient() {
  if (client) {
    return client
  }

  const apiKey = getApiKey()

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY or GOOGLE_API_KEY.')
  }

  client = new GoogleGenAI({ apiKey })
  return client
}

function getMimeTypeFromPath(filePath: string) {
  if (filePath.endsWith('.png')) {
    return 'image/png'
  }

  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
    return 'image/jpeg'
  }

  if (filePath.endsWith('.webp')) {
    return 'image/webp'
  }

  return 'application/octet-stream'
}

function getProductImagePath(product: CatalogProduct) {
  return path.join(process.cwd(), 'public', product.image.src.replace(/^\//, ''))
}

function buildTryOnPrompt({
  babyAge,
  babyName,
  product,
  stylingNote,
}: {
  babyAge?: string
  babyName?: string
  product: CatalogProduct
  stylingNote?: string
}) {
  const profileNotes = [
    babyName ? `The baby's name is ${babyName}.` : null,
    babyAge ? `The baby is ${babyAge} old.` : null,
    stylingNote?.trim() ? stylingNote.trim() : null,
  ].filter(Boolean)

  return [
    'Create a photorealistic ecommerce baby try-on image.',
    'The first reference image is the baby photo. The second reference image is the product reference.',
    `Use the exact product from the second image: "${product.title}" in category "${product.category}".`,
    'Preserve the baby identity exactly: same face, skin tone, hair, and core facial features.',
    'Make the baby look natural, cute, relaxed, and candid, with the eyes looking slightly away from the camera.',
    'Keep the pose believable and age-appropriate.',
    'Preserve the original product design exactly as shown in the product reference: same print, pattern placement, fabric color, trim, stitching, graphics, and surface details.',
    'Do not simplify, recolor, restyle, or invent new garment details.',
    'If the product is wearable clothing, dress the baby in that exact item.',
    'If the product is a blanket, lovey, pillow, or other non-wearable textile, style it naturally with the child instead of forcing it into clothing.',
    'Keep the final image realistic, premium, softly lit, and suitable for a storefront try-on preview.',
    'Use a clean, unobtrusive background. No text, no watermark, no extra accessories, no identity changes.',
    ...profileNotes,
  ].join('\n')
}

function extractImagePartData(response: Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>) {
  const parts =
    response.candidates?.flatMap((candidate) => candidate.content?.parts ?? []) ?? []

  const imagePart = parts.find((part) => part.inlineData?.data)

  if (!imagePart?.inlineData?.data) {
    const modelMessage = parts.find((part) => part.text?.trim())?.text?.trim()
    throw new Error(modelMessage || 'The model did not return an image.')
  }

  return {
    buffer: Buffer.from(imagePart.inlineData.data, 'base64'),
    mimeType: imagePart.inlineData.mimeType ?? 'image/png',
  }
}

function encodeImage(image: GeneratedTryOnImage): EncodedTryOnImage {
  const base64Data = image.buffer.toString('base64')

  return {
    base64Data,
    dataUrl: `data:${image.mimeType};base64,${base64Data}`,
    mimeType: image.mimeType,
    model: image.model,
  }
}

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10)
}

function clampWholeMonths(value: number) {
  if (!Number.isFinite(value)) {
    return 3
  }

  return Math.max(0, Math.min(18, Math.round(value)))
}

function clampAgeMonths(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return 9
  }

  return Math.max(0, Math.min(48, Math.round(value)))
}

function addMonths(dateString: string, months: number) {
  const [year, month, day] = dateString.split('-').map(Number)
  const nextDate = new Date(Date.UTC(year, month - 1, day))
  const targetMonthIndex = nextDate.getUTCMonth() + months
  const targetYear = nextDate.getUTCFullYear() + Math.floor(targetMonthIndex / 12)
  const normalizedMonthIndex = ((targetMonthIndex % 12) + 12) % 12
  const lastDay = new Date(Date.UTC(targetYear, normalizedMonthIndex + 1, 0)).getUTCDate()

  nextDate.setUTCFullYear(targetYear)
  nextDate.setUTCMonth(normalizedMonthIndex, Math.min(day, lastDay))

  return nextDate.toISOString().slice(0, 10)
}

function cleanSingleLine(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function cleanParagraphs(value: string) {
  return value
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function formatCatalogForPrompt(currentProductSlug: string) {
  return JSON.stringify(
    catalogProducts.map((product) => ({
      slug: product.slug,
      title: product.title,
      category: product.category,
      description: product.description,
      highlights: product.highlights,
      isCurrentProduct: product.slug === currentProductSlug,
    })),
    null,
    2,
  )
}

function getProductAudienceWindow(product: CatalogProduct) {
  const title = `${product.title} ${product.description}`.toLowerCase()

  if (product.category === 'Pillow') {
    return { min: 24, max: 48 }
  }

  if (title.includes('toddler')) {
    return { min: 18, max: 36 }
  }

  if (product.category === 'Pajama Set') {
    return { min: 15, max: 36 }
  }

  if (product.category === 'Bodysuit') {
    return { min: 0, max: 10 }
  }

  if (product.category === 'Zip Sleeper') {
    return { min: 0, max: 14 }
  }

  if (product.category === 'Sleep Sack' || product.category === 'Wearable Sleep Bag') {
    return { min: 0, max: 16 }
  }

  if (title.includes('lovey') || title.includes('teether')) {
    return { min: 4, max: 14 }
  }

  if (product.category === 'Blanket') {
    return { min: 0, max: 30 }
  }

  return { min: 0, max: 24 }
}

function pickFallbackRecommendedProduct(currentProduct: CatalogProduct, ageMonths: number) {
  const scoredProducts = catalogProducts
    .filter((product) => product.slug !== currentProduct.slug)
    .map((product) => {
      const audience = getProductAudienceWindow(product)
      const midpoint = (audience.min + audience.max) / 2
      const ageDistance = Math.abs(midpoint - ageMonths)
      const futureBias = audience.min >= ageMonths ? 0 : 8
      const sameCategoryPenalty = product.category === currentProduct.category ? 6 : 0

      return {
        product,
        score: ageDistance + futureBias + sameCategoryPenalty,
      }
    })
    .sort((left, right) => left.score - right.score)

  return scoredProducts[0]?.product ?? currentProduct
}

function buildCatalogRecommendationPrompt({
  babyAge,
  babyName,
  currentProduct,
  today,
}: {
  babyAge?: string
  babyName?: string
  currentProduct: CatalogProduct
  today: string
}) {
  return [
    'You are creating a warm follow-up merchandising plan for a baby apparel brand.',
    `Today is ${today}.`,
    `Assume the customer already bought this product: "${currentProduct.title}" (${currentProduct.category}).`,
    'Use only the provided catalog. Recommend exactly one next product from that catalog that the customer is most likely to want next as the baby grows.',
    'You are given a baby photo. Infer the baby age from the photo when needed.',
    'Only use a baby name if it was explicitly provided by the user or is visible as text/context in the image. Never invent a name from facial appearance.',
    'Prefer a future-stage recommendation that feels like the natural next purchase after the current item, not a duplicate of what they already bought.',
    'The email should sound intimate, warm, human, and naturally written by a thoughtful person. It must not sound like corporate CRM copy.',
    'The email body should be plain text, short paragraphs, no markdown, no bullet list, no discount language, and no spammy urgency.',
    'Return structured JSON only. The sendInMonths value must be an integer from 0 to 18.',
    babyName ? `User-provided baby name: ${babyName}.` : 'No user-provided baby name.',
    babyAge ? `User-provided baby age: ${babyAge}.` : 'No user-provided baby age.',
    `Current product slug: ${currentProduct.slug}.`,
    'Catalog:',
    formatCatalogForPrompt(currentProduct.slug),
  ].join('\n')
}

async function recommendCatalogFollowUp({
  babyAge,
  babyName,
  babyPhoto,
  currentProductSlug,
}: RecommendCatalogFollowUpInput): Promise<CatalogFollowUpPlan> {
  const currentProduct = getCatalogProduct(currentProductSlug)

  if (!currentProduct) {
    throw new Error('Selected product was not found.')
  }

  const today = getTodayDateString()
  const response = await getClient().models.generateContent({
    model: CATALOG_RECOMMENDATION_MODEL,
    contents: [
      { text: buildCatalogRecommendationPrompt({ babyAge, babyName, currentProduct, today }) },
      {
        inlineData: {
          mimeType: babyPhoto.mimeType,
          data: babyPhoto.buffer.toString('base64'),
        },
      },
    ],
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: {
        type: 'object',
        additionalProperties: false,
        required: [
          'detectedBabyName',
          'detectedBabyAgeLabel',
          'detectedBabyAgeMonths',
          'ageSource',
          'recommendedProductSlug',
          'recommendedProductReason',
          'timingReason',
          'sendInMonths',
          'futureAgeLabel',
          'futureAgeMonths',
          'emailSubject',
          'emailPreview',
          'emailBody',
        ],
        properties: {
          detectedBabyName: { type: 'string' },
          detectedBabyAgeLabel: { type: 'string' },
          detectedBabyAgeMonths: { type: 'number', minimum: 0, maximum: 48 },
          ageSource: {
            type: 'string',
            enum: ['provided', 'visible_text', 'estimated_from_photo', 'unknown'],
          },
          recommendedProductSlug: { type: 'string' },
          recommendedProductReason: { type: 'string' },
          timingReason: { type: 'string' },
          sendInMonths: { type: 'integer', minimum: 0, maximum: 18 },
          futureAgeLabel: { type: 'string' },
          futureAgeMonths: { type: 'number', minimum: 0, maximum: 60 },
          emailSubject: { type: 'string' },
          emailPreview: { type: 'string' },
          emailBody: { type: 'string' },
        },
      },
    },
  })

  if (!response.text?.trim()) {
    throw new Error('The catalog recommendation model did not return structured output.')
  }

  const parsed = JSON.parse(response.text) as CatalogFollowUpPlan
  const detectedBabyAgeMonths = clampAgeMonths(parsed.detectedBabyAgeMonths)
  const sendInMonths = clampWholeMonths(parsed.sendInMonths)
  const futureAgeMonths = clampAgeMonths(parsed.futureAgeMonths)
  const fallbackProduct = pickFallbackRecommendedProduct(currentProduct, detectedBabyAgeMonths)
  const recommendedProduct =
    getCatalogProduct(parsed.recommendedProductSlug) ??
    (fallbackProduct.slug === currentProduct.slug ? undefined : fallbackProduct)

  const finalRecommendedProduct =
    recommendedProduct && recommendedProduct.slug !== currentProduct.slug
      ? recommendedProduct
      : pickFallbackRecommendedProduct(currentProduct, futureAgeMonths)

  const safeName = cleanSingleLine(parsed.detectedBabyName)
  const safeAgeLabel =
    cleanSingleLine(parsed.detectedBabyAgeLabel) || `${detectedBabyAgeMonths} months`
  const safeFutureAgeLabel =
    cleanSingleLine(parsed.futureAgeLabel) || `${futureAgeMonths} months`

  return {
    ageSource:
      parsed.ageSource === 'provided' ||
      parsed.ageSource === 'visible_text' ||
      parsed.ageSource === 'estimated_from_photo'
        ? parsed.ageSource
        : 'unknown',
    detectedBabyName: safeName,
    detectedBabyAgeLabel: safeAgeLabel,
    detectedBabyAgeMonths,
    emailBody: cleanParagraphs(parsed.emailBody),
    emailPreview: cleanSingleLine(parsed.emailPreview),
    emailSubject: cleanSingleLine(parsed.emailSubject),
    futureAgeLabel: safeFutureAgeLabel,
    futureAgeMonths,
    recommendedProductReason: cleanSingleLine(parsed.recommendedProductReason),
    recommendedProductSlug: finalRecommendedProduct.slug,
    sendInMonths,
    timingReason: cleanSingleLine(parsed.timingReason),
  }
}

export function isSupportedTryOnImageType(mimeType: string) {
  return SUPPORTED_IMAGE_MIME_TYPES.has(mimeType)
}

export async function generateBabyTryOn({
  babyAge,
  babyName,
  babyPhoto,
  productSlug,
  stylingNote,
}: GenerateBabyTryOnInput): Promise<GeneratedTryOnImage> {
  const product = getCatalogProduct(productSlug)

  if (!product) {
    throw new Error('Selected product was not found.')
  }

  const productImagePath = getProductImagePath(product)
  const productImageBuffer = await readFile(productImagePath)
  const productImageMimeType = getMimeTypeFromPath(productImagePath)

  const response = await getClient().models.generateContent({
    model: TRY_ON_MODEL,
    contents: [
      { text: buildTryOnPrompt({ babyAge, babyName, product, stylingNote }) },
      {
        inlineData: {
          mimeType: babyPhoto.mimeType,
          data: babyPhoto.buffer.toString('base64'),
        },
      },
      {
        inlineData: {
          mimeType: productImageMimeType,
          data: productImageBuffer.toString('base64'),
        },
      },
    ],
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: {
        aspectRatio: '1:1',
        imageSize: '2K',
      },
    },
  })

  const image = extractImagePartData(response)

  return {
    ...image,
    model: TRY_ON_MODEL,
  }
}

export async function generateBabyTryOnExperience({
  babyAge,
  babyName,
  babyPhoto,
  productSlug,
}: Omit<GenerateBabyTryOnInput, 'stylingNote'>): Promise<GeneratedTryOnExperience> {
  const currentProduct = getCatalogProduct(productSlug)

  if (!currentProduct) {
    throw new Error('Selected product was not found.')
  }

  const [currentTryOnImage, followUpPlan] = await Promise.all([
    generateBabyTryOn({
      babyAge,
      babyName,
      babyPhoto,
      productSlug,
    }),
    recommendCatalogFollowUp({
      babyAge,
      babyName,
      babyPhoto,
      currentProductSlug: productSlug,
    }),
  ])

  const scheduledSendOn = addMonths(getTodayDateString(), followUpPlan.sendInMonths)
  const resolvedBabyName = cleanSingleLine(babyName ?? '') || followUpPlan.detectedBabyName
  const resolvedBabyAge = cleanSingleLine(babyAge ?? '') || followUpPlan.detectedBabyAgeLabel
  const recommendedTryOnImage = await generateBabyTryOn({
    babyAge: followUpPlan.futureAgeLabel || resolvedBabyAge,
    babyName: resolvedBabyName || undefined,
    babyPhoto,
    productSlug: followUpPlan.recommendedProductSlug,
    stylingNote:
      followUpPlan.futureAgeMonths > followUpPlan.detectedBabyAgeMonths
        ? `Show the same child a little older, around ${followUpPlan.futureAgeLabel}, while preserving their identity clearly and naturally.`
        : 'Keep the child at a believable age for the recommended product.',
  })

  const recommendedProduct = getCatalogProduct(followUpPlan.recommendedProductSlug)

  if (!recommendedProduct) {
    throw new Error('The recommended product was not found in the catalog.')
  }

  return {
    babyProfile: {
      ageLabel: followUpPlan.detectedBabyAgeLabel,
      ageMonths: followUpPlan.detectedBabyAgeMonths,
      ageSource: followUpPlan.ageSource,
      name: resolvedBabyName ? resolvedBabyName : null,
    },
    currentProduct,
    currentTryOnImage: encodeImage(currentTryOnImage),
    emailPlan: {
      body: followUpPlan.emailBody,
      preview: followUpPlan.emailPreview,
      sendInMonths: followUpPlan.sendInMonths,
      sendOn: scheduledSendOn,
      subject: followUpPlan.emailSubject,
      timingReason: followUpPlan.timingReason,
    },
    recommendedProduct: {
      futureAgeLabel: followUpPlan.futureAgeLabel,
      futureAgeMonths: followUpPlan.futureAgeMonths,
      product: recommendedProduct,
      reason: followUpPlan.recommendedProductReason,
      tryOnImage: encodeImage(recommendedTryOnImage),
    },
  }
}

export async function generateBabyFollowUpExperience({
  babyAge,
  babyName,
  babyPhoto,
  productSlug,
}: Omit<GenerateBabyTryOnInput, 'stylingNote'>): Promise<GeneratedFollowUpExperience> {
  const currentProduct = getCatalogProduct(productSlug)

  if (!currentProduct) {
    throw new Error('Selected product was not found.')
  }

  const followUpPlan = await recommendCatalogFollowUp({
    babyAge,
    babyName,
    babyPhoto,
    currentProductSlug: productSlug,
  })

  const scheduledSendOn = addMonths(getTodayDateString(), followUpPlan.sendInMonths)
  const resolvedBabyName = cleanSingleLine(babyName ?? '') || followUpPlan.detectedBabyName
  const resolvedBabyAge = cleanSingleLine(babyAge ?? '') || followUpPlan.detectedBabyAgeLabel
  const recommendedTryOnImage = await generateBabyTryOn({
    babyAge: followUpPlan.futureAgeLabel || resolvedBabyAge,
    babyName: resolvedBabyName || undefined,
    babyPhoto,
    productSlug: followUpPlan.recommendedProductSlug,
    stylingNote:
      followUpPlan.futureAgeMonths > followUpPlan.detectedBabyAgeMonths
        ? `Show the same child a little older, around ${followUpPlan.futureAgeLabel}, while preserving their identity clearly and naturally.`
        : 'Keep the child at a believable age for the recommended product.',
  })

  const recommendedProduct = getCatalogProduct(followUpPlan.recommendedProductSlug)

  if (!recommendedProduct) {
    throw new Error('The recommended product was not found in the catalog.')
  }

  return {
    babyProfile: {
      ageLabel: followUpPlan.detectedBabyAgeLabel,
      ageMonths: followUpPlan.detectedBabyAgeMonths,
      ageSource: followUpPlan.ageSource,
      name: resolvedBabyName ? resolvedBabyName : null,
    },
    currentProduct,
    emailPlan: {
      body: followUpPlan.emailBody,
      preview: followUpPlan.emailPreview,
      sendInMonths: followUpPlan.sendInMonths,
      sendOn: scheduledSendOn,
      subject: followUpPlan.emailSubject,
      timingReason: followUpPlan.timingReason,
    },
    recommendedProduct: {
      futureAgeLabel: followUpPlan.futureAgeLabel,
      futureAgeMonths: followUpPlan.futureAgeMonths,
      product: recommendedProduct,
      reason: followUpPlan.recommendedProductReason,
      tryOnImage: encodeImage(recommendedTryOnImage),
    },
  }
}
