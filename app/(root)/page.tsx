import { Title } from '@/components/shared/title'
import { Container } from '@/components/shared/container'
import { TopBar } from '@/components/shared/top-bar'
import { Filters } from '@/components/shared/filters'
import { ProductsGroupList } from '@/components/shared/products-group-list'
import { prisma } from '@/prisma/prisma-client'
import { Suspense } from 'react'
import { findPizzas, GetSearchParams } from '@/lib/find-pizzas'

export default async function Home({
    searchParams
}: {
    searchParams: GetSearchParams
}) {
    const categories = await findPizzas(searchParams)
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar
                categoties={categories.filter(
                    (category) => category.products.length > 0
                )}
            />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/*Filter */}
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>

                    {/*Products */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map((category) => (
                                <ProductsGroupList
                                    key={category.id}
                                    title={category.name}
                                    items={category.products}
                                    categoryId={category.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
