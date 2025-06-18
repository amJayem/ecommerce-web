// lib/products.ts
export const fetchDummyProducts = async () => {
  return [
    {
      id: 1,
      name: 'Fresh Apples',
      price: 120,
      image: 'https://source.unsplash.com/300x300/?apple,fruit'
    },
    {
      id: 2,
      name: 'Organic Bananas',
      price: 80,
      image: 'https://source.unsplash.com/300x300/?banana,fruit'
    },
    {
      id: 3,
      name: 'Green Vegetables',
      price: 200,
      image: 'https://source.unsplash.com/300x300/?vegetable,organic'
    }
  ]
}
