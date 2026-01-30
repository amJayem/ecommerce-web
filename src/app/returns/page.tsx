// Returns & Refund Policy page
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
} from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Returns & Refund Policy
        </h1>
        <p className="text-gray-600 text-lg">
          We want you to be completely satisfied with your purchase. If you're
          not happy, we're here to help.
        </p>
      </div>

      {/* Return Window */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <Clock className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              30-Day Return Window
            </h2>
            <p className="text-gray-700">
              You have 30 days from the date of delivery to return most items
              for a full refund. Items must be unused and in their original
              packaging.
            </p>
          </div>
        </div>
      </div>

      {/* Eligible vs Non-Eligible Items */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Eligible */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Eligible for Return
            </h3>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Unopened packaged goods</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Non-perishable items in original condition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Defective or damaged products</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Wrong items delivered</span>
            </li>
          </ul>
        </div>

        {/* Non-Eligible */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Not Eligible for Return
            </h3>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Fresh produce and perishable items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Opened food packages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Items without original packaging</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Sale or clearance items (unless defective)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Return Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          How to Return an Item
        </h2>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Contact Customer Service
                </h3>
                <p className="text-gray-600">
                  Reach out to us via email or phone to initiate your return
                  request. Have your order number ready.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Receive Return Authorization
                </h3>
                <p className="text-gray-600">
                  We'll review your request and provide a Return Authorization
                  Number (RAN) and return instructions.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Package and Ship
                </h3>
                <p className="text-gray-600">
                  Securely package the item with all original materials and
                  include your RAN. Ship to the address provided.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Receive Your Refund
                </h3>
                <p className="text-gray-600">
                  Once we receive and inspect your return, we'll process your
                  refund within 5-7 business days to your original payment
                  method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Information */}
      <div className="bg-gray-50 border rounded-2xl p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Refund Information
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Processing Time:</strong> Refunds are typically processed
            within 5-7 business days after we receive your return.
          </p>
          <p>
            <strong>Refund Method:</strong> Refunds will be issued to your
            original payment method. For cash on delivery orders, we'll process
            a bank transfer or mobile payment.
          </p>
          <p>
            <strong>Shipping Costs:</strong> Original shipping charges are
            non-refundable unless the return is due to our error (wrong item,
            defective product, etc.).
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <Package className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Need Help with a Return?
          </h2>
          <p className="text-gray-600">
            Our customer service team is here to assist you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
              <a
                href="mailto:returns@groceryfresh.com"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                returns@groceryfresh.com
              </a>
              <p className="text-sm text-gray-500 mt-1">
                Response within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
              <a
                href="tel:+8801234567890"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                +880 1234-567890
              </a>
              <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          This policy was last updated on January 30, 2026. We reserve the right
          to update this policy at any time.
        </p>
      </div>
    </div>
  );
}
