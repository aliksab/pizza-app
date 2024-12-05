import { CartStateItem } from '@/lib/get-cart-details'
import { CreateCartItemsValues } from '@/services/dto/cart.dto'
import { useCartStore } from '@/store/cart'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

type ReturnProps = {
    totalAmount: number
    items: CartStateItem[]
    loading: boolean
    updateItemQuantity: (id: number, quantity: number) => void
    removeCartItem: (id: number) => void
    addCartItem: (values: CreateCartItemsValues) => void
}

export const useCart = (): ReturnProps => {
    const CartState = useCartStore(useShallow((state) => state))

    React.useEffect(() => {
        CartState.fetchCartItems()
    }, [])

    return CartState
}
