import { cache } from 'react'

export const getCompany = cache(async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined')
  }

  const res = await fetch(`${baseUrl}/api/globals/website`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  return res.json()
})
