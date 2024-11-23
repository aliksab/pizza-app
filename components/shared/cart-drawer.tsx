'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { getCartItemsDetails } from '@/lib/get-cart-items-details'
import { CartDrawerItem } from './cart-driver-item'
interface Props {
    className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    className
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent
                side="right"
                className="flex flex-col justify-between pb-0 bg-[#F3F3F7]"
            >
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">3 товара</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 flex-1 overflow-auto scrollbar">
                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif"
                            details={getCartItemsDetails(2, 30, [
                                { name: 'Сырный бортик' }
                            ])}
                            price={500}
                            quantity={1}
                            name="Пицца Пепперони"
                        />
                    </div>
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex flex-col mb-4">
                            <span className="flex flex-1 justify-between text-lg text-neutral-500">
                                Итого
                                <span className="font-bold text-lg text-neutral-800">
                                    500 ₽
                                </span>
                            </span>
                            <div className="flex-1 border-b border-dashed border-b-neutral-500 relative -top-1 mx-2" />

                            <Link href="/cart">
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
            </SheetContent>
        </Sheet>
    )
}
