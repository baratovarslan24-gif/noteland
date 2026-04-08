'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'

export default function LoginPage() {
  const { setUser } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setErrors({
          general: data?.errors?.[0]?.message || 'Invalid credentials',
        })
        return
      }

      // ⬇️ получаем актуального пользователя
      const meRes = await fetch('/api/users/me', {
        credentials: 'include',
      })
      const meData = await meRes.json()

      setUser(meData.user)

      router.push('/')
    } catch {
      setErrors({ general: 'Network error' })
    }

    setLoading(false)
  }
  return (
    <div className="max-w-125 mx-8 my-20 md:mx-auto flex flex-col gap-y-8 border shadow-lg p-8 rounded-sm">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-cyan-400">Авторизоваться</h1>
      {errors.general && (
        <span className="text-xs text-red-600 font-semibold tracking-widest">{errors.general}</span>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
        <input
          className="border p-2 rounded-sm"
          type="email"
          placeholder="Ваш email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors({})
          }}
        />

        <input
          className="border p-2 rounded-sm"
          type="password"
          placeholder="Ваш пароль"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrors({})
          }}
        />

        <button disabled={loading} className="py-2 px-8 rounded-sm bg-cyan-500 text-white">
          {loading ? 'Вход...' : 'Войти'}
        </button>

        <p className="font-light text-center">
          Не зарегистрированы?{' '}
          <Link
            className="font-semibold text-cyan-500 hover:text-cyan-700 transition-colors"
            href="/auth/register"
          >
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  )
}
