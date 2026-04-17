'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import type { Product, Category } from '@/payload-types'
import ProductCard from './ProductCard'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

interface Props {
  products: Product[]
  totalDocs: number
  totalPages: number
  currentPage: number
  categories: Category[]
}

export default function ProductsClient({
  products,
  totalDocs,
  totalPages,
  currentPage,
  categories,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      // сбрасываем страницу если меняются фильтры
      if (!('page' in updates)) {
        params.delete('page')
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  // ===== состояние цен =====
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '')
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '')

  // синхронизация с URL (например resetFilters)
  useEffect(() => {
    setPriceMin(searchParams.get('priceMin') || '')
    setPriceMax(searchParams.get('priceMax') || '')
  }, [searchParams])

  const applyPrice = () => {
    updateParams({
      priceMin: priceMin.trim() || undefined,
      priceMax: priceMax.trim() || undefined,
    })
  }

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyPrice()
  }

  // ===== остальные фильтры =====

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ sort: e.target.value })
  }

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ category: e.target.value })
  }

  const handleInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ inStock: e.target.checked ? 'true' : undefined })
  }

  const handleSale = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ sale: e.target.checked ? 'true' : undefined })
  }

  const handlePage = (page: number) => {
    updateParams({ page: String(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilters = () => {
    router.push(pathname)
  }

  const perPage = 12
  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalDocs)

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-cyan-600">Список продуктов</h1>

        <select
          value={searchParams.get('sort') || ''}
          onChange={handleSort}
          className="text-sm border rounded-md px-3 py-1.5 bg-white"
        >
          <option value="">Сначала новые</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="date-asc">Сначала старые</option>
        </select>
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 hidden md:block">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-medium">
            Фильтры
          </p>

          <div className="space-y-5">
            {/* Category */}
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">По категориям</label>
              <select
                value={searchParams.get('category') || ''}
                onChange={handleCategory}
                className="w-full text-sm border rounded-md px-2.5 py-1.5 bg-white"
              >
                <option value="">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE FILTER */}
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">По цене</label>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  onKeyDown={handlePriceKeyDown}
                  className="w-full text-sm border rounded-md px-2.5 py-1.5"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  onKeyDown={handlePriceKeyDown}
                  className="w-full text-sm border rounded-md px-2.5 py-1.5"
                />
              </div>

              <button
                onClick={applyPrice}
                className="mt-2 w-full text-xs bg-gray-100 hover:bg-gray-200 rounded-md py-1.5"
              >
                Применять
              </button>
            </div>

            {/* чекбоксы */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchParams.get('inStock') === 'true'}
                  onChange={handleInStock}
                />
                В наличии
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchParams.get('sale') === 'true'}
                  onChange={handleSale}
                />
                В продаже
              </label>
            </div>

            <button onClick={resetFilters} className="text-xs text-gray-400 hover:text-gray-600">
              Очистить фильтры
            </button>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400 mb-4">
            Показаны{' '}
            <b>
              {startItem}-{endItem}
            </b>{' '}
            из <b>{totalDocs}</b>
          </p>

          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Товары не найдены</p>
              <button onClick={resetFilters} className="underline">
                Очистить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              {/* LEFT */}
              <button
                onClick={() => handlePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full transition-colors ${
                  currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-cyan-100'
                }`}
              >
                <FaLongArrowAltLeft className="w-4 h-4 text-cyan-600" />
              </button>

              {/* PAGES */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isActive = p === currentPage

                return (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-sm transition-colors
                      ${
                        isActive
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'hover:bg-cyan-100 text-gray-700'
                      }
                    `}
                  >
                    {p}
                  </button>
                )
              })}

              {/* RIGHT */}
              <button
                onClick={() => handlePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full transition-colors ${
                  currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-cyan-100'
                }`}
              >
                <FaLongArrowAltRight className="w-4 h-4 text-cyan-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
