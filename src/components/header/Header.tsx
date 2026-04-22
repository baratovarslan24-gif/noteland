'use client'

import Link from 'next/link'
import Logo from './Logo'
import { LuShoppingCart } from 'react-icons/lu'
import { LuUser } from 'react-icons/lu'
import { IoIosClose } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { useCartStore } from '@/store/useCartStore'
import { useSearchParams } from 'next/navigation'

type Props = {
  storeName: string
  logoUrl?: string
}

function Header({ storeName, logoUrl }: Props) {
  const { user, setUser } = useAuth()
  const [userBlockOpen, setUserBlockOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const searchParams = useSearchParams()

  const router = useRouter()
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const value = search.trim()
    if (!value) return

    const params = new URLSearchParams(searchParams.toString())

    params.set('search', value)
    params.set('page', '1')

    router.push(`/products?${params.toString()}`)
  }

  useEffect(() => {
    const querySearch = searchParams.get('search') || ''
    setSearch(querySearch)
  }, [searchParams])

  // Если нужно показать общее количество уникальных товаров
  // const totalItems = useCartStore((state) => state.items.length)

  // Общее количество товаров с учетом их количества
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  )

  const handleLogout = async () => {
    try {
      setLoading(true)

      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setUser(null)
      router.push('/')
      setUserBlockOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const handleUserBlockClick = () => {
    setUserBlockOpen((prev) => !prev)
  }

  if (!logoUrl) return null

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 xl:px-8 py-4 border-b flex justify-between items-center flex-wrap md:hidden">
        <Link href="/">
          <Logo src={logoUrl} alt={storeName} width={100} height={100} classes="object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <LuShoppingCart className="w-5 h-5" />
            <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] p-1 absolute -top-2 -right-3 flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
          <button aria-label="Open User Menu" onClick={handleUserBlockClick}>
            <LuUser className="w-5 h-5" />
          </button>
        </div>

        {userBlockOpen && (
          <div
            className="fixed w-full h-screen bg-black/40 top-0 left-0 backdrop-blur-sm z-10"
            onClick={() => setUserBlockOpen(false)}
          ></div>
        )}

        <div
          className={`fixed w-[70%] min-h-screen top-0 right-0 bg-cyan-50 px-8 py-12 flex flex-col gap-y-6 z-20 transition-transform duration-300 ${userBlockOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2"
                onClick={() => setUserBlockOpen(false)}
              >
                <LuUser className="w-5 h-5" />
                <span>Профиль</span>
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-2"
                onClick={() => setUserBlockOpen(false)}
              >
                <LuShoppingCart className="w-5 h-5" />
                <span>Мои заказы</span>
              </Link>
              <hr />
              <button
                className="bg-cyan-500 text-white rounded-full inline-block py-2"
                disabled={loading}
                onClick={handleLogout}
              >
                {loading ? 'Выход...' : 'Выйти'}
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center justify-center py-4">
              <Link className="bg-cyan-300 px-8 py-2 rounded-full text-white" href="/auth/login">
                Вход
              </Link>
              <Link
                className="bg-cyan-500 px-8 py-2 rounded-full text-white"
                href="/auth/register"
                onClick={() => setUserBlockOpen(false)}
              >
                Регистрация
              </Link>
            </div>
          )}

          <button
            className="w-6 h-6 bg-cyan-500 text-white absolute top-4 right-4 flex justify-center items-center text-sm font-bold p-1 rounded-full"
            onClick={() => setUserBlockOpen(false)}
          >
            <IoIosClose className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="w-full my-6 relative">
          <MdOutlineSearch className="absolute top-3 left-3 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти товар..."
            className="w-full bg-gray-50 border rounded-full py-2 px-2 pl-8"
          />
        </form>

        <div className="w-full flex items-center justify-center gap-4 flex-wrap">
          <Link className="bg-orange-400 px-8 py-2 rounded-full text-white" href="/products">
            Магазин
          </Link>
          <Link className="bg-indigo-400 px-8 py-2 rounded-full text-white" href="/categories">
            Категории
          </Link>
          <Link className="bg-indigo-400 px-8 py-2 rounded-full text-white" href="/about">
            About us
          </Link>
          <Link className="bg-indigo-400 px-8 py-2 rounded-full text-white" href="/contacts">
            Contacts
          </Link>
        </div>
      </header>
      <header className="hidden max-w-7xl mx-auto px-4 xl:px-8 py-4 border-b md:flex justify-between items-center gap-8">
        <Link href="/">
          <Logo src={logoUrl} alt={storeName} width={100} height={100} classes="object-contain" />
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link
            className="text-orange-500 hover:text-orange-700 transition-colors"
            href="/products"
          >
            Магазин
          </Link>
          <Link className="text-cyan-500 hover:text-cyan-700 transition-colors" href="/categories">
            Категории
          </Link>
          <Link className="text-indigo-500 hover:text-indigo-700 transition-colors" href="/about">
            About us
          </Link>
          <Link
            className="text-indigo-500 hover:text-indigo-700 transition-colors"
            href="/contacts"
          >
            Contacts
          </Link>
        </div>
        <form onSubmit={handleSearch} className="flex-1 my-6 relative">
          <MdOutlineSearch className="absolute top-3 left-3 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти товар..."
            className="w-full bg-gray-50 border rounded-full py-2 px-2 pl-8"
          />
        </form>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <LuShoppingCart className="w-5 h-5" />
            <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] p-1 absolute -top-2 -right-3 flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
          <button aria-label="Open User Menu" onClick={handleUserBlockClick}>
            <LuUser className="w-5 h-5" />
          </button>
        </div>

        {userBlockOpen && (
          <div
            className="fixed w-full h-screen bg-black/40 top-0 left-0 backdrop-blur-sm z-10"
            onClick={() => setUserBlockOpen(false)}
          ></div>
        )}

        <div
          className={`fixed w-[30%] min-h-screen top-0 right-0 bg-indigo-50 px-8 py-12 flex flex-col gap-y-6 z-20 transition-transform duration-300 ${userBlockOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2"
                onClick={() => setUserBlockOpen(false)}
              >
                <LuUser className="w-5 h-5" />
                <span>Профиль</span>
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-2"
                onClick={() => setUserBlockOpen(false)}
              >
                <LuShoppingCart className="w-5 h-5" />
                <span>Мои заказы</span>
              </Link>
              <hr />
              <button
                className="bg-cyan-500 text-white rounded-full inline-block py-2"
                disabled={loading}
                onClick={handleLogout}
              >
                {loading ? 'Выход...' : 'Выйти'}
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center justify-center py-4">
              <Link
                className="bg-cyan-300 px-8 py-2 rounded-full text-white"
                href="/auth/login"
                onClick={() => setUserBlockOpen(false)}
              >
                Вход
              </Link>
              <Link
                className="bg-cyan-500 px-8 py-2 rounded-full text-white"
                href="/auth/register"
                onClick={() => setUserBlockOpen(false)}
              >
                Регистрация
              </Link>
            </div>
          )}

          <button
            className="w-6 h-6 bg-cyan-500 text-white absolute top-4 right-4 flex justify-center items-center text-sm font-bold p-1 rounded-full"
            onClick={() => setUserBlockOpen(false)}
          >
            <IoIosClose className="w-4 h-4" />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
