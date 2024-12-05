'use client'

import { CheckoutItem } from '@/components/shared/checkout-item'
import { CheckoutSidebar } from '@/components/shared/checkout-sidebar'
import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import { WhiteBlock } from '@/components/shared/white-block'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PizzaSize, PizzaType } from '@/constans/pizza'
import { useCart } from '@/hooks/use-cart'
import { getCartItemsDetails } from '@/lib/get-cart-items-details'

export default function CheckoutPage() {
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
        <Container className="mt-6">
            <Title
                text="Оформление заказа"
                size="xl"
                className="font-extrabold mb-6"
            />
            <div className="flex gap-8">
                <div className="flex flex-col gap-8 flex-1 mb-20">
                    <WhiteBlock title="1. Корзина">
                        <div className="flex flex-col gap-5">
                            {items.map((item) => (
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
                                    onClickRemove={() =>
                                        removeCartItem(item.id)
                                    }
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

                    <WhiteBlock title="2. Ваши данные">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                name="firstName"
                                className="text-base"
                                placeholder="Имя"
                            />
                            <Input
                                name="lastName"
                                className="text-base"
                                placeholder="Фамилия"
                            />
                            <Input
                                name="email"
                                className="text-base"
                                placeholder="E-Mail"
                            />
                            <Input
                                name="phone"
                                className="text-base"
                                placeholder="Телефон"
                            />
                        </div>
                    </WhiteBlock>

                    <WhiteBlock title="3. Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <Input
                                name="firstName"
                                className="text-base"
                                placeholder="Введите адрес.."
                            />
                            <Textarea
                                rows={5}
                                className="text-base"
                                placeholder="Комментарий к заказу"
                            />
                        </div>
                    </WhiteBlock>
                </div>

                {/** Правая часть*/}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </Container>
    )
}
