import { cn } from '@/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui/button'
import { GroupVariants } from './group-variants'
import {
    mapPizzaType,
    PizzaSize,
    pizzaSizes,
    PizzaType,
    pizzaTypes
} from '@/constans/pizza'
import { Ingredient, ProductItem } from '@prisma/client'
import { Ingredients } from './ingredients'
import { useSet } from 'react-use'
import { calcTotalPizzaPrice } from '@/lib/calc-total-pizza-price'

interface Props {
    imageUrl: string
    name: string
    className?: string
    ingredients: Ingredient[]
    loading?: boolean
    items: ProductItem[]
    onSubmit: (itemId: number, ingredients: number[]) => void
}

export const ChoosePizzaForm: React.FC<Props> = ({
    imageUrl,
    name,
    items,
    ingredients,
    onSubmit,
    className,
    loading
}) => {
    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)
    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([])
    )

    const totalPrice = calcTotalPizzaPrice(
        items,
        size,
        type,
        selectedIngredients,
        ingredients
    )

    const textDetails = `${size} см, тесто ${mapPizzaType[type]}`

    const handleAddToCart = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients))
        }
    }

    const avaiblePizzas = items.filter((item) => item.pizzaType === type)
    const avaiblePizzaSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !avaiblePizzas.some(
            (pizza) => Number(pizza.size) === Number(item.value)
        )
    }))

    const currentItemId = items.find(
        (item) => item.pizzaType === type && item.size === size
    )?.id

    React.useEffect(() => {
        const isAvaibleSize = avaiblePizzaSizes?.find(
            (item) => Number(item.value) === size && !item.disabled
        )
        const avaibleSize = avaiblePizzaSizes?.find((item) => !item.disabled)
        if (!isAvaibleSize && avaibleSize) {
            setSize(Number(avaibleSize.value) as PizzaSize)
        }
    }, [type])
    return (
        <div className={cn('flex flex-1', className)}>
            <ProductImage imageUrl={imageUrl} size={size} />
            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-2">
                    <GroupVariants
                        items={pizzaSizes}
                        selectedValue={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        selectedValue={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-2">
                        {ingredients.map((ingredient) => (
                            <Ingredients
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleAddToCart}
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full"
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}
