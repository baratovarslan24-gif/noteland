import { getPayloadClient } from '@/lib/payloadClient'
import { Tag } from 'lucide-react'
import type { Product } from '@/payload-types'
import { formatPrice } from '@/lib/utils'
import { ProductGallery } from '@/components/ProductGallery'
import { AddToCartButton } from '@/components/AddToCartBtn'
import { ProductDescription } from '@/components/ProductDescription'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayloadClient()

  const product = (await payload.findByID({
    collection: 'products',
    id,
    depth: 2,
  })) as Product

  // Derived values
  const mainImageUrl =
    product.mainPhoto && typeof product.mainPhoto === 'object' && product.mainPhoto.url
      ? product.mainPhoto.url
      : null

  const photos = Array.isArray(product.photos)
    ? (product.photos as { url?: string }[]).filter((p) => p?.url)
    : []

  const allImages = Array.from(
    new Set([...(mainImageUrl ? [mainImageUrl] : []), ...photos.map((p) => p.url as string)]),
  )

  const brand = product.brand

  const category =
    product.category && typeof product.category === 'object'
      ? (product.category as { name?: string; slug?: string })
      : null

  const hasDiscount = typeof product.salePrice === 'number' && product.salePrice < product.price

  const displayPrice = hasDiscount ? product.salePrice! : product.price

  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: Images */}
            <div className="p-8 bg-linear-to-br from-cyan-50/60 to-white border-b lg:border-b-0 lg:border-r border-gray-100">
              <ProductGallery images={allImages} />
            </div>

            {/* RIGHT: Info */}
            <div className="p-8 flex flex-col gap-6">
              <div>
                {category && (
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
                      {category.name}
                    </span>
                  </div>
                )}

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>

                {brand && (
                  <p className="mt-2 text-base text-gray-500">
                    {brand.length === 1 ? 'Бренд:' : 'Бренды:'}{' '}
                    {product.brand?.map((brand) => {
                      if (typeof brand === 'number') return null

                      return (
                        <span key={brand.id} className="text-gray-400 text-sm">
                          {brand.name}
                        </span>
                      )
                    })}
                  </p>
                )}
              </div>

              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-gray-900">
                  ${formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through mb-1">
                    ${formatPrice(product.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${
                    product.stock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      product.stock ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  {product.stock ? 'В наличии' : 'Нет в наличии'}
                </span>

                {product.stock ? (
                  <AddToCartButton id={product.id} title={product.name} price={product.price} />
                ) : null}
              </div>
              <div>
                <ProductDescription description={product.description || ''} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
