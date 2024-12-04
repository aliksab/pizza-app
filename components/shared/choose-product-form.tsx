import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui/button'
import { ProductItem } from '@prisma/client'

interface Props {
    imageUrl: string
    name: string
    className?: string
    items: ProductItem[]
    onSubmit?: VoidFunction
    loading?: boolean
}

export const ChooseProductForm: React.FC<Props> = ({
    imageUrl,
    name,
    items,
    onSubmit,
    loading,
    className
}) => {
    const totalPrice = items.map((item) => item?.price || 0)
    return (
        <div className={cn('flex flex-1', className)}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
                />
            </div>

            <div className="w-[490px] bg-[#FCFCFC] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <Button
                    onClick={() => onSubmit?.()}
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full"
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}
