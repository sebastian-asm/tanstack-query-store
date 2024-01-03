import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Product, productActions } from '..'

export const useProductMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      // optimistic update
      const tempProduct = { id: Math.random(), ...product }
      console.log({ tempProduct })
      // pasando el producto temporal a la cache del queryclient
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldState) => {
          if (!oldState) return [tempProduct]
          return [...oldState, tempProduct]
        }
      )
    },
    onSuccess: (product) => {
      console.log('Producto creado')
      // esto permitirá que cuando se ingresa a una categoría despúes de haber agregado un nuevo producto
      // la sección este actualizada con todos su productos (incluyendo la nueva inserción)
      // queryClient.invalidateQueries({ queryKey: ['products', { filterKey: product.category }] })

      // permite actualizar la seccion de productos pero solo agregando el nuevo producto
      // y no haciendo un nuevo fetch para todos los productos
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldState) => {
          if (!oldState) return [product]
          return [...oldState, product]
        }
      )
    }
  })

  return mutation
}
