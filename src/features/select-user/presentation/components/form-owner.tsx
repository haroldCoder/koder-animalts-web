import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormOwnerProps {
    setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormOwner = React.memo(({ setSelect }: FormOwnerProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phone: '',
            address: ''
        }
    });

    const onSubmit = (data: { phone: string, address: string }) => {
        console.log(data);
        setSelect(true);
    }

    return (
        <div className='flex flex-col gap-4 w-full px-10'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <Input
                    {...register('phone', {
                        required: 'El teléfono es requerido',
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'El teléfono debe contener solo números'
                        }
                    })}
                    className="h-12 bg-mist-400 border-b-2 border-b-slate-600 dark:border-slate-800 focus-visible:ring-orange-500 rounded-md transition-all"
                    type="text"
                    placeholder="Teléfono"
                />
                {errors.phone && <span className="text-xs text-red-500 px-1">{errors.phone.message}</span>}

                <Input
                    {...register('address', {
                        required: 'La dirección es requerida'
                    })}
                    className="h-12 bg-mist-400 border-b-2 border-b-slate-600 dark:border-slate-800 focus-visible:ring-orange-500 rounded-md transition-all"
                    type="text"
                    placeholder="Dirección"
                />
                {errors.address && <span className="text-xs text-red-500 px-1">{errors.address.message}</span>}

                <div className='w-full flex justify-end'>
                    <Button
                        type="submit"
                        className="h-12 rounded-xl bg-mist-700 hover:bg-mist-800 text-white dark:bg-mist-700 dark:hover:bg-mist-800 dark:text-white transition-colors"
                    >
                        Guardar <CheckIcon className="size-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
});
