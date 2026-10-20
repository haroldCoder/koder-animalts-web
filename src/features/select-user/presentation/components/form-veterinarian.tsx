import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select';
import { CheckIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useGetAllClinics } from '@/features/clinics/application/queries';
import { useMemo } from 'react';
import { useSelectVeterinary } from '../../application/queries';
import { useAuth } from '@/common/hooks';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface FormVeterinarianProps {
    setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormVeterinarian = ({ setSelect }: FormVeterinarianProps) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            speciality: '',
            phone: '',
            clinicId: { value: '', label: 'Selecciona un consultorio' }
        }
    });

    const { user } = useAuth();
    const { mutateAsync: selectVeterinary, isPending } = useSelectVeterinary();
    const { data: clinics = [], isLoading: isLoadingClinics } = useGetAllClinics();

    const clinicsData = useMemo(() => {
        if (!clinics) return [];
        return clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.name
        }));
    }, [clinics]);

    const onSubmit = (data: { speciality: string, phone: string, clinicId: { value: string, label: string } }) => {
        if (user === null) return;

        selectVeterinary({ ...data, clinicId: data.clinicId.value, userId: user })
            .then(() => {
                setSelect(true);
                toast.success("Perfil de veterinario configurado correctamente", {
                    duration: 1500,
                });
            })
            .catch(() => {
                toast.error("Error al configurar el perfil de veterinario");
            });
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5 w-full">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Especialidad médica</label>
                    <Input
                        {...register('speciality', {
                            required: 'La especialidad es requerida'
                        })}
                        className="h-11 bg-muted/30 dark:bg-muted/20 border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
                        type="text"
                        placeholder="Ej: Medicina General, Cirugía, Dermatología"
                    />
                    {errors.speciality && <span className="text-xs text-destructive px-1">{errors.speciality.message}</span>}
                </div>

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
                    <label className="text-xs font-medium text-foreground">Consultorio o clínica asignada</label>
                    <Controller
                        name="clinicId"
                        control={control}
                        rules={{
                            required: "El consultorio es requerido"
                        }}
                        render={({ field }) => (
                            <Select
                                value={field.value.label}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full h-11 bg-muted/30 dark:bg-muted/20 border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 transition-all">
                                    <SelectValue placeholder="Selecciona un consultorio">{field.value.label}</SelectValue>
                                </SelectTrigger>
                                <SelectContent side="bottom" sideOffset={3}>
                                    <SelectGroup>
                                        <SelectLabel>Consultorios disponibles</SelectLabel>
                                        {isLoadingClinics ? (
                                            <SelectItem value="loading">Cargando consultorios...</SelectItem>
                                        ) : (
                                            clinicsData.map((clinic) => (
                                                <SelectItem key={clinic.id} value={{ value: clinic.id.toString(), label: clinic.name }}>
                                                    {clinic.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.clinicId && <span className="text-xs text-destructive px-1">{errors.clinicId.message}</span>}
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
};
