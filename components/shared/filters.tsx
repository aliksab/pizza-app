'use client'

import React from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui/input'
import { RangeSlider } from '../ui/range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useListIngredients } from '@/hooks/useListIngredients'
import { useSet } from 'react-use'
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    className?: string
}

interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

interface QueryFilters extends PriceProps {
    filters: string[]
    ingredients: string[]
}

export const Filters: React.FC<Props> = ({ className }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { ingredients, loading, onAddId, selectedIds } = useListIngredients()
    const [prices, setPrice] = React.useState<PriceProps>({})
    const items = ingredients.map((item) => ({
        value: String(item.id),
        text: item.name
    }))
    const [filters, { toggle: toggleFilter }] = useSet(new Set<string>([]))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value
        })
    }

    React.useEffect(() => {
        const filter = {
            ...prices,
            filters: Array.from(filters),
            ingredients: Array.from(selectedIds)
        }
        const queryString = qs.stringify(filter, {
            arrayFormat: 'comma'
        })
        router.push(`?${queryString}`, {
            scroll: false
        })
    }, [prices, selectedIds, filters])

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            <CheckboxFiltersGroup
                title="Особенности"
                name="peculiarities"
                className="mt-5"
                onClickCheckbox={toggleFilter}
                selectedIds={filters}
                items={[
                    { text: 'Можно собирать', value: '1' },
                    { text: 'Новинки', value: '2' }
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={30000}
                        defaultValue={0}
                        value={String(prices.priceFrom)}
                        onChange={(e) =>
                            updatePrice('priceFrom', Number(e.target.value))
                        }
                    />
                    <Input
                        type="number"
                        min={100}
                        max={30000}
                        placeholder="30000"
                        value={String(prices.priceTo)}
                        onChange={(e) =>
                            updatePrice('priceTo', Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={10000}
                    step={10}
                    value={[prices.priceFrom || 0, prices.priceTo || 10000]}
                    onValueChange={([priceFrom, priceTo]) =>
                        setPrice({ priceFrom, priceTo })
                    }
                />
            </div>

            <CheckboxFiltersGroup
                title="Ингридиенты"
                name="ingredients"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selectedIds={selectedIds}
            />
        </div>
    )
}
