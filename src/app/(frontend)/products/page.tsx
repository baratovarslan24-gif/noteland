import { getPayloadClient } from '@/lib/payloadClient'
import ProductsClient from '@/components/ProductsClient'
import type { Where } from 'payload'

interface SearchParams {
  page?: string
  sort?: string
  category?: string
  priceMin?: string
  priceMax?: string
  inStock?: string
  sale?: string
}

const LIMIT = 9

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const sort =
    params.sort === 'price-asc'
      ? 'price'
      : params.sort === 'price-desc'
        ? '-price'
        : params.sort === 'date-asc'
          ? 'publishedYear'
          : '-publishedYear'

  const where: Record<string, unknown> = {
    isPublished: { equals: true },
  }

  if (params.category) where.category = { equals: params.category }
  if (params.inStock === 'true') where.inStock = { equals: true }
  if (params.sale === 'true') where.salePrice = { exists: true }
  if (params.priceMin || params.priceMax) {
    where.price = {
      ...(params.priceMin && { greater_than_equal: Number(params.priceMin) }),
      ...(params.priceMax && { less_than_equal: Number(params.priceMax) }),
    }
  }

  const payload = await getPayloadClient()

  const [productsData, categoriesData] = await Promise.all([
    payload.find({
      collection: 'products',
      page,
      limit: LIMIT,
      sort,
      where: where as Where,
      depth: 1,
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
    }),
  ])

  return (
    <div className="min-h-117.5">
      <ProductsClient
        products={productsData.docs}
        totalDocs={productsData.totalDocs}
        totalPages={productsData.totalPages}
        currentPage={page}
        categories={categoriesData.docs}
      />
    </div>
  )
}
