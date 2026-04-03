import React from 'react'
import './globals.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <header className="bg-teal-700">Header</header>
        <main>{children}</main>
        <footer className="bg-teal-700">Footer</footer>
      </body>
    </html>
  )
}
