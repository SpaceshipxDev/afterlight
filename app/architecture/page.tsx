import { FloatingUi } from '@/components/floating-ui'
import { ProductPageView } from '@/components/product-page'
import { SiteHeader } from '@/components/site-header'
import { defaultCatalogProduct, getCatalogProduct } from '@/lib/catalog'

type ArchitecturePageProps = {
  searchParams: Promise<{
    slug?: string | string[]
  }>
}

export default async function ArchitecturePage({ searchParams }: ArchitecturePageProps) {
  const { slug } = await searchParams
  const selectedSlug = Array.isArray(slug) ? slug[0] : slug
  const selectedProduct = getCatalogProduct(selectedSlug) ?? defaultCatalogProduct

  if (!selectedProduct) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#2b2622]">
      <SiteHeader />
      <ProductPageView product={selectedProduct} />
      <FloatingUi />
    </main>
  )
}
