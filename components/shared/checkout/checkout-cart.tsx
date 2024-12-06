import React from 'react'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { PizzaSize, PizzaType } from '@/constans/pizza'
import { getCartItemsDetails } from '@/lib/get-cart-items-details'
import { CartStateItem } from '@/lib/get-cart-details'
import { Skeleton } from '@/components/ui/skeleton'
import { CheckoutItemSkeleton } from './checkout-item-skeleton'

interface Props {
    items: CartStateItem[]
    className?: string
    onClickCountButton: (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => void
    removeCartItem: (id: number) => void
    loading?: boolean
}

export const CheckoutCart: React.FC<Props> = ({
    items,
    onClickCountButton,
    removeCartItem,
    loading,
    className
}) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(3)].map((_, index) => (
                          <CheckoutItemSkeleton key={index} />
                      ))
                    : items.map((item) => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              details={
                                  item.pizzaSize && item.pizzaType
                                      ? getCartItemsDetails(
                                            item.ingredients,
                                            item.pizzaType as PizzaType,
                                            item.pizzaSize as PizzaSize
                                        )
                                      : ''
                              }
                              imageUrl={item.imageUrl}
                              onClickRemove={() => removeCartItem(item.id)}
                              onClickCountButton={(type) => {
                                  onClickCountButton(
                                      item.id,
                                      item.quantity,
                                      type
                                  )
                              }}
                          />
                      ))}
            </div>
        </WhiteBlock>
    )
}
