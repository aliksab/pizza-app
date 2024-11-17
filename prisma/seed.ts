import { Prisma } from '@prisma/client'
import { prisma } from './prisma-client'
import { hashSync } from 'bcrypt'

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10)
}

const generateProductItem = ({
    productId,
    pizzaType,
    size
}: {
    productId: number
    pizzaType?: 1 | 2
    size?: 20 | 30 | 40
}) => {
    return {
        productId,
        price: randomNumber(170, 800),
        pizzaType,
        size
    } as Prisma.ProductItemUncheckedCreateInput
}
async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@example.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Admin',
                email: 'admin@example.com',
                password: hashSync('admin', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    })

    await prisma.category.createMany({
        data: [
            {
                name: 'Пиццы'
            },
            {
                name: 'Комбо'
            },
            {
                name: 'Завтраки'
            },
            {
                name: 'Закуски'
            },
            {
                name: 'Напитки'
            },
            {
                name: 'Десерты'
            }
        ]
    })

    await prisma.ingredient.createMany({
        data: [
            {
                name: 'Сырный бортик',
                price: 179,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png'
            },
            {
                name: 'Сливочная моцарелла',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png'
            },
            {
                name: 'Сыры чеддер и пармезан',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796'
            },
            {
                name: 'Острый перец халапеньо',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png'
            },
            {
                name: 'Нежный цыпленок',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A'
            },
            {
                name: 'Шампиньоны',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324'
            },
            {
                name: 'Бекон',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F'
            },
            {
                name: 'Ветчина',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61'
            },
            {
                name: 'Пикантная пепперони',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3'
            },
            {
                name: 'Острая чоризо',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027'
            },
            {
                name: 'Маринованные огурчики',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B'
            },
            {
                name: 'Свежие томаты',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67'
            },
            {
                name: 'Красный лук',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C'
            },
            {
                name: 'Сочные ананасы',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0'
            },
            {
                name: 'Итальянские травы',
                price: 39,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png'
            },
            {
                name: 'Сладкий перец',
                price: 59,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B'
            },
            {
                name: 'Кубики брынзы',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349'
            },
            {
                name: 'Митболы',
                price: 79,
                imageUrl:
                    'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png'
            }
        ].map((obj, index) => ({ id: index + 1, ...obj }))
    })

    await prisma.product.createMany({
        data: [
            {
                name: '3 пиццы 25 см',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EEB07EB1D19D15AF2389C1567FC88C.jpg',
                categoryId: 2
            },
            {
                name: '10 пицц',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF8D3B48CF0782BD8CC9CE821E52F9.jpg',
                categoryId: 2
            },
            {
                name: '2 десерта',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE7E218ABA8B49A867A896265A8005.jpg',
                categoryId: 2
            },
            {
                name: 'Сырники со сгущенным молоком',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF871A4A2437B085449C45E5EA5374.jpg',
                categoryId: 3
            },
            {
                name: 'Додстер с ветчиной',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.jpg',
                categoryId: 3
            },
            {
                name: 'Салат Цезарь',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF8D3BC9E84FB7B5CFB7F47C6FB334.jpg',
                categoryId: 4
            },
            {
                name: 'Ланчбокс с куриными крыльями',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE796FC8BE09CA8AB2DC9E77BDE64A.jpg',
                categoryId: 4
            },
            {
                name: 'Паста Песто',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF8786B0E279449397C6FF3545A577.jpg',
                categoryId: 4
            },
            {
                name: 'Паста Мясная',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF8786964DA7BEB3BF92C11332BE96.jpg',
                categoryId: 4
            },
            {
                name: 'Дэнвич чоризо барбекю',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE796FF041FE1F94C903576DCFD01E.jpg',
                categoryId: 4
            },
            {
                name: 'Супермясной Додстер',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE797022F9AD72AC34E1B01DC6AEBA.jpg    ',
                categoryId: 4
            },
            {
                name: 'Молочный коктейль с печеньем Орео',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.jpg',
                categoryId: 5
            },
            {
                name: 'Шоколадный молочный коктейль',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE796FA24D1E919FA050D8BA21F8E9.jpg',
                categoryId: 5
            },
            {
                name: 'Морс Клюква &#x1F476;',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EECF75072BD81390B9C29DD01666C3.jpg',
                categoryId: 5
            },
            {
                name: 'Добрый Кола',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE7D61823BE0D3A35B4ABF658FD06B.jpg',
                categoryId: 5
            },
            {
                name: 'Маффин Три шоколада',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE796FB18AFBBEBF188C25EBD2E581.jpg',
                categoryId: 6
            },
            {
                name: 'Чизкейк Банановый с шоколадным печеньем',
                imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EE797014D8F94683D580455892ABA1.jpg',
                categoryId: 6
            }
        ]
    })

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Кола-барбекю',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif',
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
            },
            categoryId: 1
        }
    })
    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D610D2925109AB2E1C92CC5383C.avif',
            ingredients: {
                connect: [{ id: 1 }, { id: 5 }, { id: 6 }, { id: 8 }, { id: 9 }]
            },
            categoryId: 1
        }
    })
    const pizza3 = await prisma.product.create({
        data: {
            name: 'Диабло 🌶🌶',
            imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D6149EB101D8727573088FA2EFF.jpg',
            ingredients: {
                connect: [
                    { id: 4 },
                    { id: 6 },
                    { id: 7 },
                    { id: 9 },
                    { id: 10 }
                ]
            },
            categoryId: 1
        }
    })
    const pizza4 = await prisma.product.create({
        data: {
            name: 'Овощи и грибы 🌱',
            imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61546D8483A61A0BBAA7ADCC78.jpg',
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
            },
            categoryId: 1
        }
    })
    const pizza5 = await prisma.product.create({
        data: {
            name: 'Додо',
            imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D6101F670D6AA756B1C989E0489.jpg',
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 7 }]
            },
            categoryId: 1
        }
    })

    await prisma.productItem.createMany({
        data: [
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 20
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 30
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 40
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 20
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 30
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 40
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 20
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 30
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 40
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 20
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 30
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 40
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 20
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 30
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 40
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 20
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 30
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 40
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 1,
                size: 20
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 1,
                size: 30
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 1,
                size: 40
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 2,
                size: 20
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 2,
                size: 30
            }),
            generateProductItem({
                productId: pizza4.id,
                pizzaType: 2,
                size: 40
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 1,
                size: 20
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 1,
                size: 30
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 1,
                size: 40
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 2,
                size: 20
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 2,
                size: 30
            }),
            generateProductItem({
                productId: pizza5.id,
                pizzaType: 2,
                size: 40
            }),
            generateProductItem({
                productId: 1
            }),
            generateProductItem({
                productId: 2
            }),
            generateProductItem({
                productId: 3
            }),
            generateProductItem({
                productId: 4
            }),
            generateProductItem({
                productId: 5
            }),
            generateProductItem({
                productId: 6
            }),
            generateProductItem({
                productId: 7
            }),
            generateProductItem({
                productId: 8
            }),
            generateProductItem({
                productId: 9
            }),
            generateProductItem({
                productId: 10
            }),
            generateProductItem({
                productId: 11
            }),
            generateProductItem({
                productId: 12
            }),
            generateProductItem({
                productId: 13
            }),
            generateProductItem({
                productId: 14
            }),
            generateProductItem({
                productId: 15
            }),
            generateProductItem({
                productId: 16
            }),
            generateProductItem({
                productId: 17
            })
        ]
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: 'cart1'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: 'cart2'
            }
        ]
    })

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingridients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
            }
        }
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
}

async function main() {
    try {
        await down()
        await up()
    } catch (error) {
        console.error(error)
    }
}

main()
    .then(() => {
        prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
