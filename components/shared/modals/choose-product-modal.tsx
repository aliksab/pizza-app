'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Product } from '@prisma/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'

interface Props {
    product: ProductWithRelations
    className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter()
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)
    const [addCartItem, loading] = useCartStore((state) => [
        state.addCartItem,
        state.loading
    ])

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id
            await addCartItem({
                itemId,
                ingredients
            })
            toast.success('Товар добавлен в корзину')
            router.back()
        } catch (error) {
            toast.error('Не удалось добавить товар')
            console.error(error)
        }
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[600px] bg-white overflow-hidden',
                    className
                )}
            >
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        items={product.items}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}