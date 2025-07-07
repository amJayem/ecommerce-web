'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from '@/store/cartSlice'
import { RootState } from '@/store'
import Image from 'next/image'
import Link from 'next/link'

export function CartDrawer() {
  const dispatch = useDispatch()
  const { isOpen, items } = useSelector((state: RootState) => state.cart)
  const currency = '৳'

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Drawer open={isOpen} onOpenChange={() => dispatch(toggleCart())}>
      <DrawerContent className='w-full max-w-md ml-auto mr-0 h-full rounded-none'>
        <DrawerHeader>
          <DrawerTitle className='text-xl'>Your Cart</DrawerTitle>
          <DrawerDescription className='text-sm text-gray-500'>
            You have {items.length} item(s) in your cart.
          </DrawerDescription>
        </DrawerHeader>

        <Separator />

        <ScrollArea className='px-4 flex-1 overflow-y-auto h-[60vh]'>
          {items.length === 0 ? (
            <p className='text-center text-gray-500 mt-10'>
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item?.id}
                className='flex items-start justify-between gap-4 py-4 border-b'>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={500}
                  height={500}
                  className='w-15 h-15 rounded-md object-cover'
                />
                <div className='flex-1'>
                  <h4 className='font-medium text-base'>{item?.name}</h4>
                  <p className='text-sm text-gray-500'>
                    {currency}
                    {item?.price.toFixed(2)} × {item?.quantity}
                  </p>
                  <div className='flex items-center gap-2 mt-1'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => dispatch(decreaseQuantity(item?.id))}>
                      –
                    </Button>
                    <span>{item?.quantity}</span>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => dispatch(increaseQuantity(item?.id))}>
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-500'
                  onClick={() => dispatch(removeFromCart(item?.id))}>
                  ✕
                </Button>
              </div>
            ))
          )}
        </ScrollArea>

        <Separator />

        <DrawerFooter className='px-4'>
          <div className='flex items-center justify-between font-medium text-lg'>
            <span>Total:</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>
          <Link
            hidden={items.length === 0}
            href={'/checkout'}
            onClick={() => {
              dispatch(toggleCart())
            }}>
            <Button className='w-full bg-green-600 hover:bg-green-700'>
              Proceed to Checkout
            </Button>
          </Link>
          <DrawerClose asChild>
            <Button variant='outline'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
