import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
    query?: string
    sortBy?: string
    ingredients?: string
    priceFrom?: string
    priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 10000

export const findPizzas = async (params: GetSearchParams) => {
    const ingredientsIdArr = params.ingredients
        ?.split(',')
        .map((id) => Number(id))

    const priceFrom = params.priceFrom
        ? Number(params.priceFrom)
        : DEFAULT_MIN_PRICE
    const priceTo = params.priceTo ? Number(params.priceTo) : DEFAULT_MAX_PRICE

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc'
                },
                where: {
                    ingredients: ingredientsIdArr
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsIdArr
                                  }
                              }
                          }
                        : undefined,
                    items: {
                        some: {
                            price: {
                                gte: priceFrom,
                                lte: priceTo
                            }
                        }
                    }
                },
                include: {
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: priceFrom,
                                lte: priceTo
                            }
                        },
                        orderBy: {
                            price: 'asc'
                        }
                    }
                }
            }
        }
    })

    return categories
}
