import { Api } from '@/services/api-clients'
import { Ingredient } from '@prisma/client'
import React from 'react'
import { useSet } from 'react-use'

interface ReturnProps {
    ingredients: Ingredient[]
    loading: boolean
    selectedIds: Set<string>
    onAddId: (id: string) => void
}

export const useListIngredients = () => {
    const [ingredients, setIngredients] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [selectedIds, { toggle }] = useSet(new Set<string>([]))

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                // @ts-ignore
                const { ingredients } = await Api.ingredients.getAll()
                setIngredients(ingredients)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchIngredients()
    }, [])

    return { ingredients, loading, onAddId: toggle, selectedIds }
}
