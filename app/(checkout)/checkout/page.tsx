'use client'

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutSidebar } from '@/components/shared/checkout-sidebar'
import { Container } from '@/components/shared/container'
import { Title } from '@/components/shared/title'
import { useCart } from '@/hooks/use-cart'
import { CheckoutCart } from '@/components/shared/checkout/checkout-cart'
import { CheckoutPersonalForm } from '@/components/shared/checkout/checkout-personal-form'
import { CheckoutAddressForm } from '@/components/shared/checkout/checkout-address-form'
import {
    checkoutFormSchema,
    CheckoutFormValues
} from '@/components/shared/checkout/checkout-form-schema'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { create } from 'domain'
import { createOrder } from '@/app/actions'
import React from 'react'

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false)
    const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
        useCart()
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: ''
        }
    })

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data)

            toast.success('Заказ успешно создан! Переход на оплату..', {
                icon: '✅'
            })

            if (url) {
                location.href = url
            }
        } catch (error) {
            console.error(error)
            setSubmitting(false)
            toast.error('Что-то пошло не так', {
                icon: '❌'
            })
        }
    }
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
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-8 flex-1 mb-20">
                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />

                            <CheckoutPersonalForm
                                className={cn({
                                    'opacity-30 pointer-events-none': loading
                                })}
                            />

                            <CheckoutAddressForm
                                className={cn({
                                    'opacity-30 pointer-events-none': loading
                                })}
                            />
                        </div>

                        {/** Правая часть*/}
                        <div className="w-[450px]">
                            <CheckoutSidebar
                                loading={loading || submitting}
                                totalAmount={totalAmount}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
