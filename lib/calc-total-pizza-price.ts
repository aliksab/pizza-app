import { Ingredient, ProductItem } from '@prisma/client'

/**
 * Функция для вычисления общей стоимости пиццы
 *
 * @param items - список вариаций
 * @param size - размер выбранной пиццы
 * @param type - тип теста выбранной пиццы
 * @param selectedIngredients - выбранные ингредиенты
 * @param ingredients - список ингредиентов
 * @returns - numbers - общая стоимость
 */
export const calcTotalPizzaPrice = (
    items: ProductItem[],
    size: number,
    type: number,
    selectedIngredients: Set<number>,
    ingredients: Ingredient[]
) => {
    const pizzaPrice =
        items.find((item) => item.size === size && item.pizzaType === type)
            ?.price || 0
    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, item) => acc + item.price, 0)
    return pizzaPrice + totalIngredientsPrice
}
