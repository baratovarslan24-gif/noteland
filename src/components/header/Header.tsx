'use client'

import Link from 'next/link'
import Logo from './Logo'
import { LuShoppingCart } from 'react-icons/lu'
import { LuUser } from 'react-icons/lu'
import { IoIosClose } from 'react-icons/io'
import { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'

function Header({ storeName, logoUrl }: { storeName: string; logoUrl: string }) {
  const [user, setUser] = useState(true)
  const [userBlockOpen, setUserBlockOpen] = useState(false)

  const handleUserBlockClick = () => {
    setUserBlockOpen((prev) => !prev)
  }

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 xl:px-8 py-4 border-b flex justify-between items-center flex-wrap md:hidden">
        <Link href="/">
          <Logo src={logoUrl} alt={storeName} width={100} height={100} classes="object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <LuShoppingCart className="w-5 h-5" />
            <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] p-1 absolute -top-2 -right-3 flex items-center justify-center">
              0
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
          className={`fixed w-[70%] min-h-screen top-0 right-0 bg-indigo-50 px-8 py-12 flex flex-col gap-y-6 z-20 transition-transform duration-300 ${userBlockOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {user ? (
            <>
              <Link href="/profile" className="flex items-center gap-2">
                <LuUser className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <LuShoppingCart className="w-5 h-5" />
                <span>My Orders</span>
              </Link>
              <hr />
              <button className="bg-indigo-500 text-white rounded-full inline-block py-2">
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center justify-center py-4">
              <Link className="bg-indigo-300 px-8 py-2 rounded-full text-white" href="/auth/login">
                Login
              </Link>
              <Link
                className="bg-indigo-500 px-8 py-2 rounded-full text-white"
                href="/auth/register"
              >
                Register
              </Link>
            </div>
          )}

          <button
            className="w-6 h-6 bg-indigo-500 text-white absolute top-4 right-4 flex justify-center items-center text-sm font-bold p-1 rounded-full"
            onClick={() => setUserBlockOpen(false)}
          >
            <IoIosClose className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full my-6 relative">
          <MdOutlineSearch className="absolute top-3 left-3 w-4 h-4" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full bg-gray-50 border rounded-full py-2 px-2 pl-8"
          />
        </div>

        <div className="w-full flex items-center justify-center gap-4">
          <Link className="bg-indigo-400 px-8 py-2 rounded-full text-white" href="/shop">
            Shop
          </Link>
          <Link className="bg-indigo-400 px-8 py-2 rounded-full text-white" href="/new-arrivals">
            New Arrivals
          </Link>
        </div>
      </header>
      <header className="hidden md:flex">Big Header</header>
    </>
  )
}

export default Header
