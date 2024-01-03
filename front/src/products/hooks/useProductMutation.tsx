import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Product, productActions } from '..'

export const useProductMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      // optimistic update
      const tempProduct = { id: Math.random(), ...product }
      // pasando el producto temporal a la cache del queryclient
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldState) => {
          if (!oldState) return [tempProduct]
          return [...oldState, tempProduct]
        }
      )
      return { tempProduct }
    },
    // el segundo valor corresponde a las variables
    onSuccess: (product, _, context) => {
      // eliminando el id temporal del producto del context
      queryClient.removeQueries({ queryKey: ['products', context?.tempProduct.id] })

      // esto permitirá que cuando se ingresa a una categoría despúes de haber agregado un nuevo producto
      // la sección este actualizada con todos su productos (incluyendo la nueva inserción)
      // queryClient.invalidateQueries({ queryKey: ['products', { filterKey: product.category }] })

      // permite actualizar la seccion de productos pero solo agregando el nuevo producto
      // y no haciendo un nuevo fetch para todos los productos
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldState) => {
          if (!oldState) return [product]
          // dejando los productos más el producto que se dejo en el contexto (paso anterior)
          return oldState.map((cacheProduct) =>
            cacheProduct.id === context?.tempProduct.id ? product : cacheProduct
          )
        }
      )
    },
    // primer valor es error
    onError: (_, variables, context) => {
      queryClient.removeQueries({ queryKey: ['products', context?.tempProduct.id] })
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (oldState) => {
          if (!oldState) return []
          return oldState.filter((cacheProduct) => cacheProduct.id !== context?.tempProduct.id)
        }
      )
    }
  })

  return mutation
}
