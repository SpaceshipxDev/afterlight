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

type WaitlistRequest = {
  email?: unknown
}

export async function POST(request: Request) {
  let body: WaitlistRequest

  try {
    body = (await request.json()) as WaitlistRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const emailInput = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!emailInput || !EMAIL_REGEX.test(emailInput)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    const supabase = getSupabaseAdminClient()
    const { error } = await supabase
      .from('waitlist_signups')
      .upsert({ email: emailInput }, { onConflict: 'email', ignoreDuplicates: true })

    if (error) {
      console.error('Failed to insert waitlist signup:', error.message)
      return NextResponse.json({ error: 'Could not save your email right now.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }
}
