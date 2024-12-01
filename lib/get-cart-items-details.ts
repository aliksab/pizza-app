import { mapPizzaType, PizzaSize, PizzaType } from '@/constans/pizza'
import { Ingredient } from '@prisma/client'
import { CartStateItem } from './get-cart-details'

export const getCartItemsDetails = (
    ingredients: CartStateItem['ingredients'] | Ingredient[],
    pizzaType: PizzaType,
    pizzaSize: PizzaSize
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
