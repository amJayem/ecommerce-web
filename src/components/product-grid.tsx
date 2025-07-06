'use client'

import { Button } from '@/components/ui/button'
import { fetchAllProducts } from '@/lib/api/product'
import { addToCart } from '@/store/cartSlice'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type Product = {
  id: number
  name: string
  price: number
  imageUrl: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((err) => console.error('Failed to load products', err))
  }, [])

  return (
    <section className='py-8 max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products.map((product) => (
        <div
          key={product?.id}
          className='border rounded-xl p-4 shadow-sm hover:shadow-md transition'>
          <Image
            // src={'/hero-image.png'}
            src={product?.imageUrl || '/hero-image.png'}
            alt={product?.name}
            width={300}
            height={300}
            className='w-full h-48 object-cover rounded-md'
          />
          <h3 className='mt-2 text-lg font-semibold text-gray-800'>
            {product?.name}
          </h3>
          <p className='text-green-600 font-bold'>৳ {product?.price}</p>
          {/* <Button >Add to Cart</Button> */}
          <Button
            className='mt-2 w-full'
            onClick={() => {
              console.log('Clicked!', product)
              dispatch(addToCart(product))
            }}>
            <ShoppingCart className='h-4 w-4 mr-2' />
            Add to Cart
          </Button>
        </div>
      ))}
    </section>
  )
}
