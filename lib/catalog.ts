import catalogData from '@/data/catalog.json'

export type CatalogProduct = {
  id: string
  slug: string
  fileName: string
  title: string
  description: string
  category: string
  releaseYear: number | null
  highlights: string[]
  image: {
    src: string
    alt: string
  }
}

type CatalogData = {
  featuredSlugs: string[]
  products: CatalogProduct[]
}

const catalog = catalogData as CatalogData

function uniqueBySlug(products: CatalogProduct[]) {
  const seen = new Set<string>()

  return products.filter((product) => {
    if (seen.has(product.slug)) {
      return false
    }

    seen.add(product.slug)
    return true
  })
}

export const catalogProducts = catalog.products

const productsBySlug = new Map(catalogProducts.map((product) => [product.slug, product]))

export const featuredCatalogProducts = uniqueBySlug(
  catalog.featuredSlugs
    .map((slug) => productsBySlug.get(slug))
    .filter((product): product is CatalogProduct => Boolean(product)),
)

export const defaultCatalogProduct = featuredCatalogProducts[0] ?? catalogProducts[0]

export function getCatalogProduct(slug?: string | null) {
  if (!slug) {
    return undefined
  }

  return productsBySlug.get(slug)
}

export function getProductGallery(product: CatalogProduct, limit = 6) {
  return uniqueBySlug([
    product,
    ...catalogProducts.filter(
      (candidate) => candidate.slug !== product.slug && candidate.category === product.category,
    ),
    ...featuredCatalogProducts,
    ...catalogProducts,
  ]).slice(0, limit)
}

export function getRelatedCatalogProducts(product: CatalogProduct, limit = 3) {
  return uniqueBySlug([
    ...catalogProducts.filter(
      (candidate) => candidate.slug !== product.slug && candidate.category === product.category,
    ),
    ...catalogProducts.filter(
      (candidate) =>
        candidate.slug !== product.slug &&
        candidate.releaseYear !== null &&
        candidate.releaseYear === product.releaseYear,
    ),
    ...featuredCatalogProducts.filter((candidate) => candidate.slug !== product.slug),
    ...catalogProducts.filter((candidate) => candidate.slug !== product.slug),
  ]).slice(0, limit)
}
