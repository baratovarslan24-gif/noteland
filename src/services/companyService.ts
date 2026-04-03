import { cache } from 'react'

export const getCompany = cache(async () => {
  const res = await fetch(`${process.env.API_URL}/globals/website`)

  if (!res.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  return res.json()
})
