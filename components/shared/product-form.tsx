'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/store/cart'
import React from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

interface Props {
    product: ProductWithRelations
    onSubmit?: VoidFunction
}

export const ProductForm: React.FC<Props> = ({
    product,
    onSubmit: _onSubmit
}) => {
    const [addCartItem, loading] = useCartStore(
        useShallow((state) => [state.addCartItem, state.loading])
    )
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id
            const ingrArr = ingredients ?? []
            await addCartItem({
                productItemId: itemId,
                ingredients: ingrArr
            })
            toast.success('Товар добавлен в корзину')
            _onSubmit?.()
        } catch (error) {
            toast.error('Не удалось добавить товар')
            console.error(error)
        }
    }
    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    }
    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
        />
    )
}
