// Temporary debug component to check product data
"use client";

import { useEffect } from "react";

export function ProductDebugger({ products }: { products: any[] }) {
  useEffect(() => {
    if (products && products.length > 0) {
      console.log("=== PRODUCT DEBUG INFO ===");
      console.log("Total products:", products.length);
      console.log("First product:", products[0]);
      console.log("First product has slug?", !!products[0]?.slug);
      console.log("First product slug value:", products[0]?.slug);
      console.log("First product ID:", products[0]?.id);
      console.log("All product keys:", Object.keys(products[0] || {}));
      console.log("========================");
    }
  }, [products]);

  return null;
}
