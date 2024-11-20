import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui/button'

interface Props {
    imageUrl: string
    name: string
    className?: string
    items?: any[]
    onClickAdd?: VoidFunction
}

export const ChooseProductForm: React.FC<Props> = ({
    imageUrl,
    name,
    onClickAdd,
    className
}) => {
    const totalPrice = 550
    const textDetails = `description`
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
                <p className="text-gray-400">{textDetails}</p>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}
