// components/category-section.tsx

import { categories } from '@/lib/data/categories'
import { Button } from '@/components/ui/button'
import {
  LucideIcon,
  Apple,
  Carrot,
  Milk,
  Cookie,
  Fish,
  Drumstick,
  Croissant,
  Candy
} from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, LucideIcon> = {
  Apple,
  Carrot,
  Milk,
  Cookie,
  Fish,
  Drumstick,
  Croissant,
  Candy
}

export function CategorySection() {
  return (
    <section className='w-full py-10 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Shop by Category
          </h2>
          <Link href='/categories'>
            <Button
              variant='outline'
              className='text-green-700 border-green-500'>
              See All
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4'>
          {categories.map(({ name, icon }) => {
            const IconComponent = iconMap[icon]
            if (!IconComponent) return null

            return (
              <Link href={`/categories/${name.toLowerCase()}`} key={name}>
                <div className='flex flex-col items-center p-4 bg-green-50 rounded-xl hover:shadow-md transition'>
                  <IconComponent size={32} className='text-green-600 mb-2' />
                  <span className='text-sm font-medium text-gray-700'>
                    {name}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
