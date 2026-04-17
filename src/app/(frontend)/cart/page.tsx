'use client'

import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import Link from 'next/link'
import { IoMdCloseCircle } from 'react-icons/io'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const addItem = useCartStore((s) => s.addItem)
  const clearCart = useCartStore((s) => s.clearCart)

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <section className="py-20 text-center min-h-120">
        <h1 className="text-3xl font-bold mb-4 text-cyan-600">Ваша корзина пуста</h1>
        <Link
          href="/products"
          className="inline-block mt-4 px-6 py-3 bg-orange-600 text-white rounded-full"
        >
          Перейти к покупкам
        </Link>
      </section>
    )
  }

  return (
    <section className="py-15 min-h-150">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl text-cyan-600 font-bold mb-6">
          Ваша корзина ({totalItems})
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[70%] space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div className="w-1/2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(item.price)} сом каждый</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem(item.id)
                        : useCartStore.setState({
                            items: items.map((i) =>
                              i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
                            ),
                          })
                    }
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>

                  <span className="min-w-5 text-center">{item.quantity}</span>

                  <button
                    onClick={() =>
                      addItem({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                      })
                    }
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* PRICE */}
                <div className="font-semibold w-30 text-right">
                  {formatPrice(item.price * item.quantity)} сом
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-lg cursor-pointer"
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            ))}

            {/* CLEAR */}
            <button
              onClick={clearCart}
              className="text-sm text-white py-2 px-4 rounded-full border cursor-pointer mt-4 bg-red-400"
            >
              Очистить корзину
            </button>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="w-full lg:w-[30%] border rounded-lg p-6 bg-indigo-50 h-fit">
            <h3 className="font-bold text-xl mb-6">Сводка заказа</h3>

            <div className="flex justify-between mb-3">
              <span>Товары</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Цена</span>
              <span>{formatPrice(total)} сом</span>
            </div>

            <div className="flex justify-between mb-6">
              <span>Доставка</span>
              <span className="text-green-600">Бесплатно</span>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Итого</span>
              <span>{formatPrice(total)} сом</span>
            </div>

            <Link
              href="/checkout"
              className="block text-center py-3 bg-orange-600 hover:bg-orange-700 transition text-white rounded-full"
            >
              Оформить заказ
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
