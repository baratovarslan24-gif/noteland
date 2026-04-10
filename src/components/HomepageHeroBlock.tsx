import { Website } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  store: Website
}

export default function HomepageHeroBlock({ store }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 xl:px-8 py-4">
      <div className="border rounded-lg p-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-[40%]">
          <h1 className="text-2xl font-bold mb-4 text-cyan-500">{store.name}</h1>
          <p className="font-light mb-4">{store.description}</p>
          <p className="flex flex-col gap-2 md:flex-row">
            <Link
              className="py-2 px-4 text-center bg-cyan-400 text-white rounded-full"
              href="/shop"
            >
              Просмотреть каталог
            </Link>
            <Link
              className="py-2 px-4 text-center bg-cyan-300 text-white rounded-full"
              href="/about"
            >
              О нас
            </Link>
          </p>
        </div>
        <div className="w-full h-50 md:w-[70%] md:h-100 relative rounded-lg overflow-hidden">
          {typeof store.heroImage !== 'number' && store.heroImage?.url && (
            <Image src={store.heroImage.url} alt={store.name} fill />
          )}
        </div>
      </div>
    </section>
  )
}
