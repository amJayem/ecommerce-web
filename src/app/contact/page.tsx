// Contact page placeholder with modern UX
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Contact Us</h1>
      <p className="text-gray-600 mb-6">We’d love to hear from you! (Contact form coming soon.)</p>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <Input placeholder="Your Name" disabled />
        <Input placeholder="Your Email" disabled />
        <textarea placeholder="Your Message" disabled className="h-24 w-full rounded-md border border-gray-300 p-2 resize-none bg-gray-100" />
        <Button className="bg-green-600 hover:bg-green-700 text-white" disabled>Send Message</Button>
      </form>
    </div>
  );
} 