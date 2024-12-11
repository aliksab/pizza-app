import { Ingredient } from '@prisma/client'
import { instance } from './instance'
import { ApiRoutes } from './constans'

export const getAll = async (): Promise<Ingredient[]> => {
    return (await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data
        .ingredients
}
