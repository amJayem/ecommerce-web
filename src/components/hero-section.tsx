// components/hero-section.tsx

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className='bg-green-50 w-full py-10'>
      <div className='max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center'>
        {/* Left Text Section */}
        <div className='space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-green-700 leading-tight'>
            Fresh Groceries Delivered <br /> At Your Doorstep
          </h1>
          <p className='text-lg text-gray-600'>
            Shop daily essentials, organic items, and everything in between.
            Fast, reliable delivery at your convenience.
          </p>
          <Link href='/products'>
            <Button
              size='lg'
              className='bg-green-600 hover:bg-green-700 text-white'>
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Right Image */}
        <div className='flex justify-center md:justify-end'>
          <Image
            src='/hero-image.png' // Replace with your own image under /public
            alt='Grocery delivery illustration'
            width={500}
            height={400}
            className='object-contain rounded-xl'
            priority
          />
        </div>
      </div>
    </section>
  )
}
