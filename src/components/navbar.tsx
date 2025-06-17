// components/navbar.tsx

'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, Menu } from 'lucide-react'

export function Navbar() {
  return (
    <header className='w-full bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Left: Logo */}
        <Link href='/' className='text-xl font-bold text-green-600'>
          GroceyFresh
        </Link>

        {/* Center: Search Bar */}
        <div className='hidden md:flex flex-1 mx-6'>
          <Input
            type='text'
            placeholder='Search for products...'
            className='rounded-md border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0'
          />
        </div>

        {/* Right: Icons */}
        <div className='flex items-center gap-4'>
          <Link href='/cart'>
            <Button variant='ghost' size='icon' className='relative'>
              <ShoppingCart className='w-5 h-5' />
              <span className='absolute top-0 right-0 h-4 w-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center'>
                2
              </span>
            </Button>
          </Link>

          <Link href='/profile'>
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
