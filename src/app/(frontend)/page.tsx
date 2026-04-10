import HomepageHeroBlock from '@/components/HomepageHeroBlock'
import { getStoreInfo } from '@/lib/apiServices'

export default async function HomePage() {
  const store = await getStoreInfo()
  console.log(store)
  return (
    <div>
      <HomepageHeroBlock store={store} />
    </div>
  )
}
