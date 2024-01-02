import { Product, productsApi } from '..'

interface GetProductosOptions {
  filterKey?: string
}

export const getProducts = async ({ filterKey }: GetProductosOptions): Promise<Product[]> => {
  const filter = filterKey ? `category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products?${filter}`)
  return data
}

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}
