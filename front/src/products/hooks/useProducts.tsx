import { useQuery } from '@tanstack/react-query'

import { productActions } from '..'

interface Options {
  filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['products', { filterKey }],
    queryFn: () => productActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60
  })

  return { products, isLoading, isError, error, isFetching }
}
