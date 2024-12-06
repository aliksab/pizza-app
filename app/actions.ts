'use server'

import { CheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema'
import { PayOrderTemplate } from '@/components/shared/email-teplate/pay-order'
import { createPayment } from '@/lib/create-payment'
import { sendEmail } from '@/lib/send-email'
import { prisma } from '@/prisma/prisma-client'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookiesStore = cookies()
        const cartToken = (await cookiesStore).get('cartToken')?.value

        if (!cartToken) {
            throw new Error('Cart token not found')
        }
        /**Находим корзину по токену */
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        })

        if (!userCart) {
            throw new Error('Cart not found')
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty')
        }

        /**Создаём заказ */
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment || '',
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        })

        /**Очищаем корзину */
        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id
        })

        if (!paymentData) {
            throw new Error('Payment data not found')
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id
            }
        })

        const paymentUrl = paymentData.confirmation.confirmation_url

        sendEmail(
            data.email,
            'НАША PIZZA | Оплатите заказ №' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl
            })
        )

        return paymentUrl
    } catch (error) {
        console.error('[CreateOrder] Server error', error)
    }
}
