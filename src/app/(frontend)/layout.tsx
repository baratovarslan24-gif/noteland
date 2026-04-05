import React from 'react'
import './globals.css'
import Header from '@/components/Header'
import { getCompany } from '@/services/companyService'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany()

  return {
    title: company?.name || 'Next Company',
    description: company?.description || '',
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const company = await getCompany()

  return (
    <html lang="en">
      <body>
        <Header company={company ?? {}} />
        <main>{children}</main>
        <footer className="bg-teal-700">Footer</footer>
      </body>
    </html>
  )
}
