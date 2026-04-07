import { cache } from 'react'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export const getStoreInfo = cache(async () => {
  const res = await payload.findGlobal({
    slug: 'website',
    depth: 2,
  })

  return res
})
