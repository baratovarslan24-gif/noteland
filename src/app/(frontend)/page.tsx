// app/(frontend)/page.tsx

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-9xl text-red-600 font-bold">Это главная страница</h1>
    </div>
  )
}
