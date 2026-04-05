import { cache } from 'react'

export const getCompany = cache(async () => {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  // 👇 fallback только для build-time
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:3000'
    } else {
      // 👇 во время билда просто не дергаем API
      return null
    }
  }

  try {
    const res = await fetch(`${baseUrl}/api/globals/website`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Ошибка загрузки данных')
    }

    return res.json()
  } catch (e) {
    console.error('getCompany error:', e)
    return null // 👈 не роняем билд
  }
})
