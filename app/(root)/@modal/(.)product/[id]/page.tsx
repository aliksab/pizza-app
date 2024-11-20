import { Container } from '@/components/shared/container'
import { GroupVariants } from '@/components/shared/group-variants'
import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal'
import { ProductImage } from '@/components/shared/product-image'
import { Title } from '@/components/shared/title'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductModalPage({
    params: { id }
}: {
    params: { id: string }
}) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true,
            items: true
        }
    })
    if (!product) return notFound()
    return <ChooseProductModal product={product} />
}
