import { Product, productsApi } from '..'

interface GetProductosOptions {
  filterKey?: string
}

// simulación de conexión lenta
const sleep = async (time: number) =>
  await new Promise((resolve) => setTimeout(() => resolve(true), time * 1000))

export const getProducts = async ({ filterKey }: GetProductosOptions): Promise<Product[]> => {
  const filter = filterKey ? `category=${filterKey}` : ''
  const { data } = await productsApi.get<Product[]>(`/products?${filter}`)
  return data
}

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}

interface ProductLike {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const createProduct = async (product: ProductLike) => {
  await sleep(5)
  // throw new Error('Error al crear el producto')
  const { data } = await productsApi.post<Product>('/products', product)
  return data
}
