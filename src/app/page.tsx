import { CategorySection } from '@/components/category-section'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { Navbar } from '@/components/navbar'
import ProductGrid from '@/components/product-grid'

export default function HomePage() {
  return (
    <main className='p-4'>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <ProductGrid />
      <Footer />
    </main>
  )
}
