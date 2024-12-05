import React from 'react'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButtonProps } from './count-button'
import { cn } from '@/lib/utils'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image'
import { CartItemInfo } from './cart-item-details/cart-item-info'
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price'
import { CartItemDetailsCountButton } from './cart-item-details/cart-item-details-count-button'
import { X } from 'lucide-react'

interface Props extends CartItemProps {
    onClickRemove?: () => void
    onClickCountButton?: (type: 'plus' | 'minus') => void
    className?: string
}

export const CheckoutItem: React.FC<Props> = ({
    name,
    price,
    quantity,
    details,
    imageUrl,
    className,
    onClickRemove,
    onClickCountButton
}) => {
    return (
        <div className={cn('flex items-center justify-between', className)}>
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetailsImage src={imageUrl} />
                <CartItemInfo name={name} details={details} />
            </div>

            <CartItemDetailsPrice value={price} />

            <div className="flex items-center gap-5 ml-20">
                <CartItemDetailsCountButton
                    onClick={onClickCountButton}
                    value={quantity}
                />
                <button onClick={onClickRemove}>
                    <X
                        className="text-gray-400 cursor-pointer hover:text-grey-800"
                        size={20}
                    />
                </button>
            </div>
        </div>
    )
}
