import HomepageHeroBlock from '@/components/HomepageHeroBlock'
import ProductCard from '@/components/ProductCard'
import { getHomeProducts, getStoreInfo } from '@/lib/apiServices'

import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'

export default async function HomePage() {
  const store = await getStoreInfo()
  const products = await getHomeProducts()

  console.log(products)
  return (
    <div>
      <HomepageHeroBlock store={store} />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl md:text-4xl text-indigo-600 mb-4 md:mb-8">
            Мы рекомендуем
          </h2>
          <Link href="/shop" className="text-indigo-600 flex items-center gap-2">
            Посмотреть все
            <FaArrowRightLong />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
