'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

type Order = {
  id: string
  total: number
  status: string
  createdAt: string
  items: {
    product: {
      name: string
    }
    quantity: number
    price: number
  }[]
}
const statusMap: Record<string, { label: string; color: string }> = {
  pending: {
    label: 'В ожидании',
    color: 'text-yellow-600',
  },
  processing: {
    label: 'В обработке',
    color: 'text-blue-600',
  },
  shipped: {
    label: 'Отправлен',
    color: 'text-purple-600',
  },
  delivered: {
    label: 'Доставлен',
    color: 'text-green-700',
  },
  cancelled: {
    label: 'Отменен',
    color: 'text-red-600',
  },
}

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          credentials: 'include',
        })

        const data = await res.json()

        // Payload возвращает { docs: [...] }
        setOrders(data.docs || [])
      } catch (err) {
        console.error('Ошибка при получении заказов', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">Вы не вошли в систему</p>
        <Link href="/auth/login" className="text-cyan-600 underline">
          Войти
        </Link>
      </div>
    )
  }

  if (loading) {
    return <div className="p-10 text-center">Загрузка...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">У вас нет заказов</h1>
        <Link
          href="/products"
          className="inline-block px-6 py-2 bg-gray-700 text-white rounded-full"
        >
          Перейти к покупкам
        </Link>
      </div>
    )
  }

  // пагинация заказов если их больше 10
  const totalPages = Math.ceil(orders.length / ordersPerPage)

  const startIndex = (currentPage - 1) * ordersPerPage
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage)

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Мои заказы</h1>

        <div className="space-y-6">
          {currentOrders.map((order) => (
            <div key={order.id} className="border border-gray-300 rounded-xl p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">Заказ #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">{formatPrice(order.total)} сом</p>
                  <p className={`text-sm font-medium ${statusMap[order.status]?.color}`}>
                    {statusMap[order.status]?.label || order.status}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)} сом</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/*пагинация*/}
        <div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* LEFT */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
                    onClick={() => setCurrentPage(p)}
                    className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-sm transition-colors
                      ${
                        isActive
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-cyan-100'
                      }
                    `}
                  >
                    {p}
                  </button>
                )
              })}

              {/* RIGHT */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
