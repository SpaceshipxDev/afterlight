import Link from 'next/link'
import { Search, ShoppingCart, UserRound } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { headerLinks } from '@/lib/site-data'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f6f3]">
      <div className="h-[3px] w-full bg-[#25483f]" />
      <div className="mx-auto flex h-[96px] max-w-[1720px] items-center justify-between px-6 md:px-10 xl:px-14">
        <BrandMark className="shrink-0" />

        <nav className="hidden items-center gap-12 lg:flex xl:gap-14">
          {headerLinks.map((item) => (
            <Link
              key={item}
              href={item === 'Sleep Sacks' ? '/architecture' : '#'}
              className="text-[18px] font-medium tracking-[-0.02em] text-[#201d1a] transition-opacity hover:opacity-65"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-[#1f1d1a] md:gap-7">
          <button className="transition-opacity hover:opacity-60" aria-label="Search">
            <Search className="h-7 w-7 stroke-[1.5]" />
          </button>
          <button className="transition-opacity hover:opacity-60" aria-label="Account">
            <UserRound className="h-7 w-7 stroke-[1.5]" />
          </button>
          <button className="transition-opacity hover:opacity-60" aria-label="Cart">
            <ShoppingCart className="h-7 w-7 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </header>
  )
}
