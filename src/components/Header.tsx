'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, User, Search, Menu, X, PencilLine } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import Logo from './Logo'

// TODO: нужно заменить на zustand store позже
const useCartCount = () => 2

const NAV_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/catalog?sort=new', label: 'Новинки' },
]

export default function Header({ company }: { company: any }) {
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = useCartCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(search.trim())}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-green-400 bg-green-200  ">
      <div className="container mx-auto flex h-14 items-center gap-4 px-4">
        {/* Лого */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo src={company.logo.url} alt={company.logo.name} />
        </Link>

        {/* Навигация — только десктоп */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {NAV_LINKS.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Поиск */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-sm mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск товаров..."
            className="pl-9 h-9 bg-white"
          />
        </form>

        {/* Правые кнопки */}
        <div className="flex items-center gap-1 ml-auto shrink-0">
          {/* Корзина */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Профиль — десктоп */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/profile">Профиль</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">Мои заказы</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/login">Авторизоваться</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Мобильное меню */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-6">
                {/* Навигация */}
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-start"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </nav>

                <div className="border-t pt-4 flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Профиль
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/orders">Мои заказы</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link href="/auth/login">Авторизоваться</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
