import { cn } from '@/lib/utils'
import React from 'react'
import { WhiteBlock } from './white-block'
import { CheckoutItemDetails } from './checkout-item-details'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { Button } from '../ui/button'

interface Props {
    totalAmount: number
    className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({
    totalAmount,
    className
}) => {
    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                <span className="text-3xl font-extrabold">
                    {totalAmount + 500} ₽
                </span>
            </div>
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-300" />
                        Стоимость товаров:
                    </div>
                }
                value={totalAmount + `₽`}
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-300" />
                        Доставка:
                    </div>
                }
                value="500 ₽"
            />
            <Button
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    )
}
