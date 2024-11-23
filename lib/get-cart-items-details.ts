import { mapPizzaType, PizzaSize, PizzaType } from '@/constans/pizza'
import { Ingredient } from '@prisma/client'

export const getCartItemsDetails = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingredients: Ingredient[]
): string => {
    const details = []

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType]
        details.push(`${pizzaSize} см, тесто ${typeName}`)
    }
    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name))
    }
    return details.join(', ')
}
