import { generateBabyTryOn, isSupportedTryOnImageType } from '@/lib/virtual-try-on'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const productSlug = getStringValue(formData.get('productSlug'))
    const babyName = getStringValue(formData.get('babyName'))
    const babyAge = getStringValue(formData.get('babyAge'))
    const babyPhoto = formData.get('babyPhoto')

    if (!productSlug) {
      return Response.json({ error: 'Missing product selection.' }, { status: 400 })
    }

    if (!(babyPhoto instanceof File)) {
      return Response.json({ error: 'Upload a baby photo to continue.' }, { status: 400 })
    }

    if (!babyPhoto.type || !isSupportedTryOnImageType(babyPhoto.type)) {
      return Response.json(
        { error: 'Use a JPG, PNG, or WEBP image for the baby photo.' },
        { status: 400 },
      )
    }

    if (babyPhoto.size > MAX_UPLOAD_SIZE_BYTES) {
      return Response.json(
        { error: 'The baby photo must be 10MB or smaller.' },
        { status: 400 },
      )
    }

    const generatedImage = await generateBabyTryOn({
      babyAge: babyAge || undefined,
      babyName: babyName || undefined,
      babyPhoto: {
        buffer: Buffer.from(await babyPhoto.arrayBuffer()),
        mimeType: babyPhoto.type,
      },
      productSlug,
    })

    return Response.json(
      {
        image: {
          dataUrl: `data:${generatedImage.mimeType};base64,${generatedImage.buffer.toString('base64')}`,
          mimeType: generatedImage.mimeType,
          model: generatedImage.model,
        },
      },
      {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
      },
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'The try-on image could not be generated.'

    return Response.json({ error: message }, { status: 500 })
  }
}
