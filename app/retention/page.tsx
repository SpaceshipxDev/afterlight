import type { Metadata } from 'next'
import RetentionPageClient from './RetentionPageClient'

export const metadata: Metadata = {
  title: 'Afterlight — Retention',
  description:
    'We generate personalized emails with your customers wearing your new product drops.',
}

export default function RetentionPage() {
  return <RetentionPageClient />
}
