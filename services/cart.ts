import { instance } from './instance'
import { CartDTO } from './dto/cart.dto'

export const fetchCart = async (): Promise<CartDTO> => {
    const { data } = await instance.get<CartDTO>('/cart')
    return data
}

export const updateItemQuantity = async (
    id: number,
    quantity: number
): Promise<CartDTO> => {
    const { data } = await instance.patch<CartDTO>(`/cart/` + id, { quantity })
    return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    const { data } = await instance.delete<CartDTO>(`/cart/` + id)
    return data
}

export const addCartItem = async (values: any): Promise<CartDTO> => {
    const { data } = await instance.post<CartDTO>('/cart', values)
    return data
}
