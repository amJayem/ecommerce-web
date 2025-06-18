// components/footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className='bg-green-100 text-gray-800 mt-12'>
      <div className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div>
          <h4 className='font-bold text-lg mb-2 text-green-600'>
            GroceryFresh
          </h4>
          <p className='text-sm'>
            Delivering fresh groceries to your doorstep with love.
          </p>
        </div>
        <div>
          <h5 className='font-semibold mb-2'>Company</h5>
          <ul className='text-sm space-y-1'>
            <li>
              <Link href='/about'>About Us</Link>
            </li>
            <li>
              <Link href='/careers'>Careers</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className='font-semibold mb-2'>Support</h5>
          <ul className='text-sm space-y-1'>
            <li>
              <Link href='/help'>Help Center</Link>
            </li>
            <li>
              <Link href='/returns'>Returns</Link>
            </li>
            <li>
              <Link href='/terms'>Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className='font-semibold mb-2'>Follow Us</h5>
          <ul className='text-sm space-y-1'>
            <li>
              <a href='#'>Facebook</a>
            </li>
            <li>
              <a href='#'>Instagram</a>
            </li>
            <li>
              <a href='#'>Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
