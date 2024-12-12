import { Header } from '@/components/shared/header'
import { Suspense } from 'react'

export const metadata = {
    title: 'Корзина | Aliksab PIZZZZA',
    description: 'Checkout Aliksab pizza app'
}

export default function CheckoutLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Suspense>
                <Header
                    className="border-gray-200"
                    hasSearch={false}
                    hasCart={false}
                />
            </Suspense>
            {children}
        </main>
    )
}
