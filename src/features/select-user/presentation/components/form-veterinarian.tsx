import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { CheckIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { clinicsMock } from '../data';

interface FormVeterinarianProps {
    setSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormVeterinarian = ({ setSelect }: FormVeterinarianProps) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            speciality: '',
            phone: '',
            clinicId: ''
        }
    });

    const onSubmit = (data: { speciality: string, phone: string, clinicId: string }) => {
        console.log(data);
        setSelect(true);
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
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-2/4 h-12 bg-mist-400 border-b-2 border-b-slate-600 dark:border-slate-800 focus-visible:ring-orange-500 rounded-md transition-all">
                                <SelectValue placeholder="Selecciona un consultorio" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    clinicsMock.map((clinic) => (
                                        <SelectItem key={clinic.id} value={clinic.id.toString()}>
                                            {clinic.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.clinicId && <span className="text-xs  text-red-500 px-1">{errors.clinicId.message}</span>}

                <div className="w-full flex justify-end">
                    <Button
                        type="submit"
                        className="h-12 rounded-md bg-mist-700 hover:bg-mist-800 text-white dark:bg-mist-700 dark:hover:bg-mist-800 dark:text-white transition-colors"
                    >
                        Guardar <CheckIcon />
                    </Button>
                </div>

            </form>
        </div>
    )
}
