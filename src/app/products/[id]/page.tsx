// app/products/[id]/page.tsx

'use client'

import { Button } from '@/components/ui/button'
import { fetchProductById } from '@/lib/api/product'
import { addToCart, toggleCart } from '@/store/cartSlice'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
  brand: string
  discount?: number
  weight?: number
}

const sanitizeProduct = (data: Partial<Product>): Product => {
  return {
    id: data.id ?? Date.now(), // fallback ID
    name: data.name ?? 'Unknown Product',
    price: data.price ?? 0,
    imageUrl: data.imageUrl ?? '/img/placeholder_image.png',
    description: data.description ?? 'No description available.',
    category: data.category ?? 'Misc',
    stock: data.stock ?? 0,
    brand: data.brand ?? 'Unknown Brand',
    discount: data.discount ?? 0,
    weight: data.weight ?? 0
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params?.id
  const dispatch = useDispatch()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // fetchSuggestedProducts().then(setSuggested)
    if (!id) return
    fetchProductById(+id)
      .then((rawData) => {
        const cleaned = sanitizeProduct(rawData)
        setProduct(cleaned)
      })
      .catch(console.error)


  }, [id])

  if (!product) return <div className='p-6'>Loading product...</div>

  return (
    <div className='max-w-7xl mx-auto p-4 grid md:grid-cols-2 gap-8'>
      {/* Product Image */}
      <div className='w-full h-[400px] relative'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className='object-contain rounded-xl  bg-gray-50'
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className='text-2xl font-bold text-green-700'>{product.name}</h1>
        <p className='text-gray-600 text-sm mt-2'>{product.description}</p>

        <div className='mt-4 text-xl text-green-800 font-bold'>৳{product.price}</div>
        {product.discount && (
          <div className='mt-1 text-red-500 text-sm'>-{product.discount}% OFF</div>
        ) || '  '}

        <div className='mt-2 text-sm text-gray-500'>Brand: {product.brand}</div>
        <div className='text-sm text-gray-500'>Weight: {product.weight}g</div>
        <div className='text-sm text-gray-500'>Stock: {product.stock}</div>

        <Button
          className='mt-4'
          onClick={() => {
            dispatch(addToCart(product))
            dispatch(toggleCart())
          }}>
          Add to Cart
        </Button>
      </div>

      {/* Suggested Products */}
      <div className='md:col-span-2 mt-10'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>You may also like</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {/* {suggested.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`} className='block'>
              <div className='border p-2 rounded-xl hover:shadow-md transition'>
                <div className='relative h-32 w-full'>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className='object-contain rounded-md'
                  />
                </div>
                <div className='text-sm mt-2 font-medium text-gray-700'>{item.name}</div>
                <div className='text-green-600 font-bold text-sm'>৳{item.price}</div>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  )
}
