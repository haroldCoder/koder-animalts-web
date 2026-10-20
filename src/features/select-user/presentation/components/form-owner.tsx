import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelectOwner } from '@/features/select-user/application/queries';
import { toast } from 'sonner';
import { useAuth } from '@/common/hooks';
import { Spinner } from '@/components/ui/spinner';

interface FormOwnerProps {
    setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormOwner = React.memo(({ setSelect }: FormOwnerProps) => {
    const { user } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phone: '',
            address: ''
        }
    });

    const { mutateAsync: selectOwner, isPending } = useSelectOwner();

    const onSubmit = (data: { phone: string, address: string }) => {
        if (!user) return;
        selectOwner({ userId: user, phone: data.phone, address: data.address })
            .then(() => {
                setSelect(true);
                toast.success("Perfil de tutor configurado correctamente", {
                    duration: 1500,
                });
            })
            .catch(() => {
                toast.error("Error al configurar el perfil de tutor");
            });
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5 w-full">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Teléfono de contacto</label>
                    <Input
                        {...register('phone', {
                            required: 'El teléfono es requerido',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'El teléfono debe contener solo números'
                            }
                        })}
                        className="h-11 bg-muted/30 dark:bg-muted/20 border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
                        type="text"
                        placeholder="Ej: 3001234567"
                    />
                    {errors.phone && <span className="text-xs text-destructive px-1">{errors.phone.message}</span>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Dirección de residencia</label>
                    <Input
                        {...register('address', {
                            required: 'La dirección es requerida'
                        })}
                        className="h-11 bg-muted/30 dark:bg-muted/20 border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
                        type="text"
                        placeholder="Ej: Calle 123 #45-67"
                    />
                    {errors.address && <span className="text-xs text-destructive px-1">{errors.address.message}</span>}
                </div>

                <div className="w-full flex justify-end pt-2">
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="h-10 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors cursor-pointer"
                    >
                        {isPending ? <Spinner className="size-4" /> : <span className="flex items-center gap-1.5">Guardar datos <CheckIcon className="size-4" /></span>}
                    </Button>
                </div>
            </form>
        </div>
    );
});
