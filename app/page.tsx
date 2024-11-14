import { Title } from '@/components/shared/title'
import { Container } from '@/components/shared/container'
import { TopBar } from '@/components/shared/top-bar'
import { Filters } from '@/components/shared/filters'
import { ProductsGroupList } from '@/components/shared/products-group-list'

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/*Filter */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    {/*Products */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                items={[
                                    {
                                        id: 1,
                                        name: 'Пепперони',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                                        price: 550,
                                        items: [{ price: 550 }]
                                    },
                                    {
                                        id: 1,
                                        name: 'Пепперони',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                                        price: 550,
                                        items: [{ price: 550 }]
                                    },
                                    {
                                        id: 1,
                                        name: 'Пепперони',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                                        price: 550,
                                        items: [{ price: 550 }]
                                    },
                                    {
                                        id: 1,
                                        name: 'Пепперони',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                                        price: 550,
                                        items: [{ price: 550 }]
                                    },
                                    {
                                        id: 1,
                                        name: 'Пепперони',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                                        price: 550,
                                        items: [{ price: 550 }]
                                    },
                                    {
                                        id: 1,
                                        name: 'Пепперони',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                                        price: 550,
                                        items: [{ price: 550 }]
                                    }
                                ]}
                                categoryId={1}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
