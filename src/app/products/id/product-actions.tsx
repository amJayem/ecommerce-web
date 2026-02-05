'use client'

import { Button } from '@/components/ui/button'
import { addToCart, toggleCart } from '@/store/cartSlice'
import { useDispatch } from 'react-redux'

// Product interface matching Prisma schema
interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string // optional as per schema
  category?: string // optional as per schema
  stock: number
  brand?: string // optional as per schema
  discount?: number // optional as per schema
  weight?: number // optional as per schema
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProductActionsProps {
  product: Product
}

export default function ProductActions({ product }: ProductActionsProps) {
  const dispatch = useDispatch()

  return (
    <Button
      className='mt-4'
      onClick={() => {
        // Ensure imageUrl is always a string for cart compatibility
        const cartProduct = {
          ...product,
          imageUrl: product.imageUrl || "/img/placeholder_image.png"
        }
        dispatch(addToCart(cartProduct))
        dispatch(toggleCart())
      }}>
      Add to Cart
    </Button>
  )
} 