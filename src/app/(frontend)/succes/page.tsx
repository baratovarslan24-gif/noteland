'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'

export default function SuccessPage() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
    console.log('SESSION ID:', sessionId)
  }, [sessionId])

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Платеж успешен 🎉</h1>

      <p className="mt-4 text-sm text-gray-500">Сессия: {sessionId}</p>
    </div>
  )
}
