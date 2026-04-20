'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(images[0] || null)

  if (!images.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-cyan-50">
        Нет изображения
      </div>
    )
  }

  return (
    <>
      {/* Основное изображение */}
      <div className="group relative w-full aspect-3/4 max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5">
        <Image
          src={activeImage!}
          alt="Product image"
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
      </div>

      {/* Превью */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-5 justify-center flex-wrap">
          {images.map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(img)}
              className={`relative w-16 h-20 rounded-lg overflow-hidden ring-2 transition ${
                activeImage === img ? 'ring-cyan-500' : 'ring-gray-200'
              }`}
            >
              <Image src={img} alt="Photo" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
