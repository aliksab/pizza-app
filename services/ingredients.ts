import { Ingredient } from '@prisma/client'
import { instance } from './instance'
import { ApiRoutes } from './constans'

export const getAll = async (): Promise<Ingredient[]> => {
    const { data } = await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)
    // console.log(data)
    return data.ingredients
}
