import { headers } from 'next/headers'
import LandingPageClient from './LandingPageClient'

type Locale = 'en' | 'zh-CN'
type QueryLocale = Locale | 'zh'

function isChinaRegion(headerStore: Headers) {
  const country =
    headerStore.get('x-vercel-ip-country') ??
    headerStore.get('cf-ipcountry') ??
    headerStore.get('x-country-code') ??
    headerStore.get('x-geo-country') ??
    ''

  if (country.toUpperCase() === 'CN') {
    return true
  }

  const acceptLanguage = headerStore.get('accept-language')?.toLowerCase() ?? ''
  return acceptLanguage.includes('zh-cn') || acceptLanguage.includes('zh-hans-cn')
}

function getLocaleOverride(langParam: string | string[] | undefined): Locale | null {
  if (!langParam) return null
  const raw = Array.isArray(langParam) ? langParam[0] : langParam
  const normalized = raw.toLowerCase() as Lowercase<QueryLocale>
  if (normalized === 'zh-cn' || normalized === 'zh') return 'zh-CN'
  if (normalized === 'en') return 'en'
  return null
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = searchParams ? await searchParams : {}
  const localeOverride = getLocaleOverride(params.lang)
  const headerStore = await headers()
  const locale: Locale = localeOverride ?? (isChinaRegion(headerStore) ? 'zh-CN' : 'en')

  return <LandingPageClient locale={locale} />
}
