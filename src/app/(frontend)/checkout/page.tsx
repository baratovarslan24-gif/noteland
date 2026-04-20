'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)

  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const { user } = useAuth()

  const handleCheckout = async () => {
    try {
      // простая валидация
      if (!address || !phone) {
        alert('Заполни адрес и телефон')
        return
      }

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingAddress: address,
          phone,
          userId: user?.id, // 👈 ВАЖНО
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('Ошибка оплаты:', data.error)
        alert('Ошибка оплаты')
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (items.length === 0) {
    return <div className="p-10 text-center">Корзина пуста</div>
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
      {/* LEFT — ITEMS */}
      <div className="w-full lg:w-2/3 space-y-4">
        <h2 className="text-2xl font-bold mb-4"> Ваш заказ</h2>

        {items.map((item) => (
          <div key={item.id} className="flex justify-between border p-4 rounded">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {formatPrice(item.price)} сом × {item.quantity}
              </p>
            </div>

            <div className="font-semibold">{formatPrice(item.price * item.quantity)} сом</div>
          </div>
        ))}
      </div>

      {/* RIGHT — FORM + SUMMARY */}
      <div className="w-full lg:w-1/3 border p-6 rounded bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Оформление заказа</h2>

        <input
          type="text"
          placeholder="Адрес доставки"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 mb-3 w-full"
        />

        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        {/* SUMMARY */}
        <div className="flex justify-between mb-4">
          <span>Итого</span>
          <span className="font-bold">{formatPrice(total)} сом</span>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-3 rounded"
        >
          Оплатить сейчас
        </button>
      </div>
    </div>
  )
}
