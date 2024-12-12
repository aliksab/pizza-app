import { cn } from '@/lib/utils'
import React from 'react'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void
    onClickRemove?: () => void
    className?: string
}

export const CartDrawerItem: React.FC<Props> = ({
    imageUrl,
    details,
    name,
    price,
    quantity,
    className,
    onClickCountButton,
    onClickRemove
}) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6', className)}>
            <CartItem.Image src={imageUrl} />
            <div className="flex-1">
                <CartItem.Info details={details} name={name} />
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                    <CountButton
                        onClick={onClickCountButton}
                        value={quantity}
                    />
                    <div>
                        <CartItem.Price value={price} />
                        <Trash2Icon
                            onClick={onClickRemove}
                            className="text-gray-400 cursor-pointer hover:text-grey-800"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
