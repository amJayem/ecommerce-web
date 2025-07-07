import { CategorySection } from '@/components/category-section'
import { HeroSection } from '@/components/hero-section'
import ProductGrid from '@/components/product-grid'

export const metadata = {
  title: 'Buy Organic Products Online - GroceryFresh',
  description: 'Shop fresh, organic groceries delivered to your door.'
}

export default function HomePage() {
  return (
    <main className='p-4'>
      <HeroSection />
      <CategorySection />
      <ProductGrid />
    </main>
  )
}
