// components/navbar.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RootState } from '@/store'
import { toggleCart } from '@/store/cartSlice'
import { Menu, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

export function Navbar() {
  const dispatch = useDispatch()
  const itemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <header className='w-full bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Left: Logo */}
        <Link href='/' className='text-xl font-bold text-green-600'>
          GroceyFresh
        </Link>

        {/* Center: Nav Items */}
        <nav className='hidden md:flex flex-1 mx-6 gap-6 items-center'>
          <Link href='/products' className='text-gray-700 hover:text-green-700 font-medium'>All Products</Link>
          <Link href='/products/categories' className='text-gray-700 hover:text-green-700 font-medium'>Categories</Link>
          <Link href='/about' className='text-gray-700 hover:text-green-700 font-medium'>About</Link>
          <Link href='/contact' className='text-gray-700 hover:text-green-700 font-medium'>Contact</Link>
        </nav>

        {/* Right: Search and Icons */}
        <div className='flex items-center gap-4'>
          <div className='hidden md:block'>
            <Input
              type='text'
              placeholder='Search for products...'
              className='rounded-md border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0'
            />
          </div>
          <Button
            variant='ghost'
            className='relative'
            onClick={() => dispatch(toggleCart())}>
            <ShoppingCart className='h-5 w-5' />
            {itemCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {itemCount}
              </span>
            )}
          </Button>
          <Link href='/account/profile'>
            <Button variant='ghost' size='icon'>
              <User className='w-5 h-5' />
            </Button>
          </Link>
          {/* Optional mobile menu */}
          <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu className='w-5 h-5' />
          </Button>
        </div>
      </div>
    </header>
  )
}
