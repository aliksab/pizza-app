'use client'

import React, { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { cn } from '@/lib/utils'
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
    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    })

    useEffect(() => {
        if (intersection?.isIntersecting) {
            console.log(title, categoryId)
        }
    }, [categoryId, intersection?.isIntersecting, title])
    return (
        <div className={className} id={title} ref={intersectionRef}>
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
