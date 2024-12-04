import { CartStateItem, getCartItemDetails } from '@/lib/get-cart-details'
import { Api } from '@/services/api-clients'
import { CreateCartItemsValues } from '@/services/dto/cart.dto'
import { create } from 'zustand'

export interface CartState {
    loading: boolean
    error: boolean
    totalAmount: number
    items: CartStateItem[]

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>

    /* Запрос на добавление товара в корзину */
    addCartItem: (values: CreateCartItemsValues) => Promise<void>

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.fetchCart()
            set(getCartItemDetails(data))
        } catch (error) {
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.updateItemQuantity(id, quantity)
            set(getCartItemDetails(data))
        } catch (error) {
            console.error(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set((state) => ({
                loading: true,
                error: false,
                items: state.items.map((item) =>
                    item.id === id ? { ...item, disabled: true } : item
                )
            }))
            const data = await Api.cart.removeCartItem(id)
            set(getCartItemDetails(data))
        } catch (error) {
            console.error(error)
            set({ error: true })
        } finally {
            set((state) => ({
                loading: false,
                items: state.items.map((item) => ({ ...item, disabled: false }))
            }))
        }
    },

    addCartItem: async (values: CreateCartItemsValues) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.addCartItem(values)
            set(getCartItemDetails(data))
        } catch (error) {
            console.error(error)
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    }
}))
