'use client'
import { toast } from 'react-hot-toast'
import { useCartStore } from '@/store/useCartStore'
import { Media } from '@/payload-types'

export function AddToCartButton({
  id,
  title,
  price,
  mainPhoto,
}: {
  id: number
  title: string
  price: number
  mainPhoto?: number | Media
}) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = () => {
    addItem({ id, title, price, mainPhoto })
    toast.success('Добавлено в корзину')
  }

  return (
    <button
      onClick={handleAddToCart}
      className="py-2 px-5 bg-linear-to-br from-gray-800 to-gray-500 hover:bg-linear-to-br hover:from-gray-500 hover:to-gray-800  transition-colors duration-300 rounded-full text-white text-sm cursor-pointer"
    >
      В корзину
    </button>
  )
}
