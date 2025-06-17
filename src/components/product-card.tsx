'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  discount?: number
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className='bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-4 relative'>
      {product?.discount && (
        <div className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded'>
          {product?.discount}% OFF
        </div>
      )}

      <div className='w-full h-40 relative mb-4'>
        <Image
          src={product?.image}
          alt={product?.name}
          fill
          className='object-contain'
        />
      </div>

      <h3 className='font-semibold text-lg text-gray-800'>{product?.name}</h3>
      <p className='text-green-600 text-md font-bold mb-2'>৳{product?.price}</p>

      <Button className='w-full' variant='default'>
        <ShoppingCart className='h-4 w-4 mr-2' />
        Add to Cart
      </Button>
    </div>
  )
}
