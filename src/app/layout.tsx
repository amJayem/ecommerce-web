'use client'

import { CartDrawer } from '@/components/cart-drawer'
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
          <CartDrawer />
          {children}
        </Provider>
      </body>
    </html>
  )
}
