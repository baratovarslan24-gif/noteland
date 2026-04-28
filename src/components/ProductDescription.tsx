'use client'
import { useState } from 'react'

interface Props {
  description: string
}

export function ProductDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <p className={`text-sm leading-6 ${expanded ? '' : 'line-clamp-3'}`}>{description}</p>

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-linear-to-r from-blue-800 to-cyan-400 bg-clip-text text-transparent  mt-1"
      >
        {expanded ? 'Показать меньше' : 'Читать далее...'}
      </button>
    </div>
  )
}
