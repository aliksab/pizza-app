import { Product } from '@prisma/client'
import { instance } from './instance'
import { ApiRoutes } from './constans'

export const search = async (query: string): Promise<Product[]> => {
    const { data } = await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
        params: { query }
    })

    return data
}
