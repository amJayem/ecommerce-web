'use client'

import { CartDrawer } from '@/components/cart-drawer'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { store } from '@/store'
import { Provider } from 'react-redux'
import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
