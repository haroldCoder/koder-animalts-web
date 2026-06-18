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

    const { mutateAsync: selectVeterinary, isPending, isError } = useSelectVeterinary();

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
                toast.success("Usuario seleccionado correctamente", {
                    duration: 1000,
                    className: "text-green-500 bg-dark"
                });
            })
            .catch(() => {
                toast.error("Error al seleccionar el usuario");
            });
    }

    return (
        <div className="w-full px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    {...register('speciality', {
                        required: 'La especialidad es requerida'
                    })}
                    className="h-12 bg-mist-400 border-b-2 border-b-slate-600 dark:border-slate-800 focus-visible:ring-orange-500 rounded-md transition-all"
                    type="text"
                    placeholder="Especialidad"
                />
                {errors.speciality && <span className="text-xs text-red-500 px-1">{errors.speciality.message}</span>}

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
                            <SelectTrigger className="w-2/4 h-12 bg-mist-400 border-b-2 border-b-slate-600 dark:border-slate-800 focus-visible:ring-orange-500 rounded-md transition-all">
                                <SelectValue placeholder="Selecciona un consultorio">{field.value.label}</SelectValue>
                            </SelectTrigger>
                            <SelectContent side='bottom' sideOffset={3}>
                                <SelectGroup>
                                    <SelectLabel>Consultorios</SelectLabel>
                                    {
                                        isLoadingClinics ? (
                                            <SelectItem value="loading">Cargando consultorios...</SelectItem>
                                        ) : (
                                            clinicsData.map((clinic) => (
                                                <SelectItem key={clinic.id} value={{ value: clinic.id.toString(), label: clinic.name }}>
                                                    {clinic.name}
                                                </SelectItem>
                                            ))
                                        )
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.clinicId && <span className="text-xs  text-red-500 px-1">{errors.clinicId.message}</span>}

                <div className="w-full flex justify-end">
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="h-12 rounded-md bg-mist-700 hover:bg-mist-800 text-white dark:bg-mist-700 dark:hover:bg-mist-800 dark:text-white transition-colors"
                    >
                        {isPending ? <Spinner className='size-4' /> : <>Guardar <CheckIcon /></>}
                    </Button>
                </div>

            </form>
        </div>
    )
}
