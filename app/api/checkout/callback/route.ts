import { OrderSuccessTemplate } from './../../../../components/shared/email-teplate/order-success'
import { PaymentCallbackData } from '@/@types/yookassa'
import { sendEmail } from '@/lib/send-email'
import { prisma } from '@/prisma/prisma-client'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            }
        })

        if (!order) {
            return NextResponse.json({ message: 'Order not found' })
        }

        const isSucceeded = body.object.status === 'succeeded'

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: isSucceeded
                    ? OrderStatus.SUCCEEDED
                    : OrderStatus.CANCELLED
            }
        })

        const items = JSON.parse(order?.items as string) as CartItemDTO[]

        if (isSucceeded) {
            await sendEmail(
                order.email,
                'НАША PIZZA | Ваш заказ успешно оформлен!',
                OrderSuccessTemplate({ orderId: order.id, items })
            )
        } else {
            await sendEmail(
                order.email,
                'НАША PIZZA | Ваш заказ был отменен!',
                OrderSuccessTemplate({ orderId: order.id, items })
            )
        }
    } catch (error) {
        console.error('[Checkout Callback]', error)
    }
}
