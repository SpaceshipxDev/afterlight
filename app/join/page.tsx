import type { Metadata } from 'next'
import JoinClient from './JoinClient'

export const metadata: Metadata = {
  title: 'Join Afterlight — Get paid for brand campaigns',
  description:
    'Generate AI versions of yourself that sells products without you having to film. Join the Afterlight creator network.',
}

export default function JoinPage() {
  return <JoinClient />
}
