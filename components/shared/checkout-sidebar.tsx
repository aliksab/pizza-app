import { cn } from '@/lib/utils'
import React from 'react'
import { WhiteBlock } from './white-block'
import { CheckoutItemDetails } from './checkout-item-details'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

interface Props {
    totalAmount: number
    loading?: boolean
    className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({
    totalAmount,
    loading,
    className
}) => {
    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>

                {loading ? (
                    <Skeleton className="h-11 w-48" />
                ) : (
                    <span className="h-11 text-3xl font-extrabold">
                        {totalAmount + 500} ₽
                    </span>
                )}
            </div>
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-300" />
                        Стоимость товаров:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-5 w-20 rounded-[6px]" />
                    ) : (
                        `${totalAmount} ₽`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-300" />
                        Доставка:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-5 w-20 rounded-[6px]" />
                    ) : (
                        `500 ₽`
                    )
                }
            />
            <Button
                loading={loading}
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    )
}
