// lib/api/product.ts
import { Product } from '@/types/product'
import { get, post, put, del } from './client'

export const fetchAllProducts = () => get<Product[]>('/products')
export const fetchSuggestedProducts = () => get<Product[]>('/products')
export const fetchProductById = (id: number) => get<Product>(`/products/${id}`)
export const createProduct = (data: Partial<Product>) =>
  post<Product>('/products', data)
export const updateProduct = (id: number, data: Partial<Product>) =>
  put<Product>(`/products/${id}`, data)
export const deleteProduct = (id: number) => del(`/products/${id}`)
