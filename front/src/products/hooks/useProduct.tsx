import { useQuery } from '@tanstack/react-query'

import { productActions } from '..'

interface Options {
  id: number
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productActions.getProductById(id),
    staleTime: 1000 * 60 * 60
  })

  return { product, isLoading, isError, error, isFetching }
}
