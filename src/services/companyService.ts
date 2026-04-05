import { cache } from 'react'

export const getCompany = cache(async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/globals/website`)

  if (!res.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  return res.json()
})
