import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from './title'
import { ProductCard } from './product-card'

interface Props {
    title: string
    items: any[]
    categoryId: number
    className?: string
    listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    categoryId,
    className,
    listClassName
}) => {
    return (
        <div className={className}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((item, i) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.items[0].price}
                    />
                ))}
            </div>
        </div>
    )
}
