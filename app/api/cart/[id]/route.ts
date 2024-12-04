import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const data = (await req.json()) as { quantity: number }
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ message: 'Не удалось получить токен' })
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!cartItem) {
            return NextResponse.json({ message: 'Товар не найден' })
        }

        await prisma.cartItem.update({
            where: {
                id: Number(id)
            },
            data: {
                quantity: data.quantity
            }
        })

        const updateUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updateUserCart)
    } catch (error) {
        return NextResponse.json(
            { message: 'Не удалось обновить корзину' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ message: 'Не удалось получить токен' })
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!cartItem) {
            return NextResponse.json({ message: 'Товар не найден' })
        }

        await prisma.cartItem.delete({
            where: {
                id: Number(id)
            }
        })

        const updateUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updateUserCart)
    } catch (error) {
        return NextResponse.json(
            { message: 'Не удалось удалить товар' },
            { status: 500 }
        )
    }
}
