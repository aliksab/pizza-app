import { cn } from '@/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui/button'

interface Props {
    imageUrl: string
    name: string
    className?: string
    ingredients: any[]
    items?: any[]
    onClickAdd?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
    imageUrl,
    name,
    items,
    ingredients,
    onClickAdd,
    className
}) => {
    const size = 30
    const totalPrice = 550
    const textDetails = `${size} см, ${ingredients.join(', ')}`
    return (
        <div className={cn('flex flex-1', className)}>
            <ProductImage imageUrl={imageUrl} size={30} />
            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}
