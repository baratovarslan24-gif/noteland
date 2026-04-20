'use client'
import { toast } from 'react-hot-toast'
import { useCartStore } from '@/store/useCartStore'

export function AddToCartButton({
  id,
  title,
  price,
}: {
  id: string
  title: string
  price: number
}) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = () => {
    addItem({ id, title, price })
    toast.success('Добавлено в корзину')
  }

  return (
    <button
      onClick={handleAddToCart}
      className="py-2 px-5 bg-gray-700 hover:bg-gray-800 transition-colors duration-300 rounded-full text-white text-sm cursor-pointer"
    >
      В корзину
    </button>
  )
}
