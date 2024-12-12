'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getCartItemsDetails } from '@/lib/get-cart-items-details'
import { CartDrawerItem } from './cart-driver-item'
import { PizzaSize, PizzaType } from '@/constans/pizza'
import { Title } from './title'
import { useCart } from '@/hooks/use-cart'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuantity)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent
                side="right"
                className="flex flex-col justify-between pb-0 bg-[#F3F3F7]"
            >
                <div
                    className={cn(
                        'flex flex-col h-full',
                        !totalAmount && 'justify-center'
                    )}
                >
                    <SheetHeader>
                        <SheetTitle>
                            В корзине{' '}
                            <span className="font-bold">
                                {items.length} товара
                            </span>
                        </SheetTitle>
                    </SheetHeader>
                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image
                                src={'/assets/images/empty-box.png'}
                                alt="empty cart"
                                width={120}
                                height={120}
                            />
                            <Title
                                size="sm"
                                text="Ваша корзина пуста"
                                className="text-center font-bold my-2"
                            />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте любой продукт, чтобы сделать заказ
                            </p>
                            <SheetClose asChild>
                                <Button
                                    className="w-56 h-12 text-base"
                                    size="lg"
                                >
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться к покупкам
                                </Button>
                            </SheetClose>
                        </div>
                    )}
                    {totalAmount > 0 && (
                        <>
                            <div className="-mx-6 mt-5 flex-1 overflow-auto scrollbar">
                                {items.map((item) => (
                                    <div className="mb-2" key={item.id}>
                                        <CartDrawerItem
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={
                                                item.pizzaSize && item.pizzaType
                                                    ? getCartItemsDetails(
                                                          item.ingredients,
                                                          item.pizzaType as PizzaType,
                                                          item.pizzaSize as PizzaSize
                                                      )
                                                    : ''
                                            }
                                            price={item.price}
                                            quantity={item.quantity}
                                            name={item.name}
                                            onClickCountButton={(type) => {
                                                onClickCountButton(
                                                    item.id,
                                                    item.quantity,
                                                    type
                                                )
                                            }}
                                            onClickRemove={() => {
                                                removeCartItem(item.id)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex flex-col mb-4">
                                        <span className="flex flex-1 justify-between text-lg text-neutral-500">
                                            Итого
                                            <span className="font-bold text-lg text-neutral-800">
                                                {totalAmount} ₽
                                            </span>
                                        </span>
                                        <div className="flex-1 border-b border-dashed border-b-neutral-500 relative -top-1 mx-2" />

                                        <Link href="/checkout">
                                            <Button
                                                type="submit"
                                                className="w-full h-12 text-base"
                                            >
                                                Оформить заказ
                                                <ArrowRight className="w-5 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
