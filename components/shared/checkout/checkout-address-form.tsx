import React from 'react'
import { WhiteBlock } from '../white-block'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormTextarea } from '../form-components/form-textarea'
import { AddressInput } from '../address-input'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext()
    return (
        <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
                <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <AddressInput onChange={field.onChange} />
                            {fieldState.error?.message && (
                                <ErrorText text={fieldState.error.message} />
                            )}
                        </>
                    )}
                />

                <FormTextarea
                    name="comment"
                    rows={5}
                    className="text-base"
                    placeholder="Комментарий к заказу"
                />
            </div>
        </WhiteBlock>
    )
}
