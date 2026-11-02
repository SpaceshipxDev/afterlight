import type { Metadata } from 'next'
import ExperimentsClient from './ExperimentsClient'

export const metadata: Metadata = {
  title: 'Afterlight — The Editorial Engine',
  description: 'Generate photoreal campaign imagery in your brand voice. No crew. No studio. No compromise.',
}

export default function ExperimentsPage() {
  return <ExperimentsClient />
}
