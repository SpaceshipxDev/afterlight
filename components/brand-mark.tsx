import Link from 'next/link'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <Link
      href="/architecture"
      aria-label="Dreamland Baby"
      className={`inline-flex items-baseline gap-2 text-[#201d1a] ${className}`.trim()}
    >
      <span className="font-editorial text-[34px] leading-none tracking-[-0.05em]">Dreamland</span>
      <span className="text-[16px] font-medium uppercase tracking-[0.24em]">Baby</span>
    </Link>
  )
}
