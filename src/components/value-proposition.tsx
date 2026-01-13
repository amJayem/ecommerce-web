// components/value-proposition.tsx

import { Shield, Truck, DollarSign, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";

export function ValueProposition() {
  const trustBadges = [
    {
      icon: Shield,
      title: "100% Organic",
      description: "Certified organic products from trusted farmers",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery within city limits",
    },
    {
      icon: DollarSign,
      title: "Fair Prices",
      description: "Competitive prices with no hidden costs",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable packaging and practices",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose GroceryFresh?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We&apos;re committed to delivering the best shopping experience with
            quality products and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                <badge.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {badge.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
