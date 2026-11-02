import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdminClient() {
  if (supabaseAdmin) return supabaseAdmin

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  return supabaseAdmin
}

type JoinRequest = {
  email?: unknown
  tiktok?: unknown
  instagram?: unknown
  brands?: unknown
}

/** Normalize a social handle: strip URLs, leading @, and surrounding whitespace. */
function normalizeHandle(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  let value = raw.trim()
  if (!value) return null

  // Pull the handle out of a pasted profile URL.
  const urlMatch = value.match(/(?:tiktok\.com|instagram\.com)\/@?([A-Za-z0-9._]+)/i)
  if (urlMatch) value = urlMatch[1]

  value = value.replace(/^@+/, '').trim()
  if (!value) return null

  return value.slice(0, 120)
}

function normalizeText(raw: unknown, max: number): string | null {
  if (typeof raw !== 'string') return null
  const value = raw.trim()
  if (!value) return null
  return value.slice(0, max)
}

export async function POST(request: Request) {
  let body: JoinRequest

  try {
    body = (await request.json()) as JoinRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const record = {
    email,
    tiktok: normalizeHandle(body.tiktok),
    instagram: normalizeHandle(body.instagram),
    brands: normalizeText(body.brands, 2000),
  }

  try {
    const supabase = getSupabaseAdminClient()
    const { error } = await supabase
      .from('creator_signups')
      .upsert(record, { onConflict: 'email' })

    if (error) {
      console.error('Failed to insert creator signup:', error.message)
      return NextResponse.json({ error: 'Could not save your details right now.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Join API error:', error)
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }
}
