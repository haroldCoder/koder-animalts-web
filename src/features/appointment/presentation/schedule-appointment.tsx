import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useScheduleAppointmentMutation } from "../application/queries";
import { useGetPetsByVeterinarianClinic } from "@/features/pet/application/queries";
import { useAuth } from "@/common/hooks";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ClipboardList,
    Activity,
    Stethoscope,
    Sparkles,
    CheckCircle,
} from "lucide-react";
import { AppointmentSucess, AppointmentTypeSelector, DatePickerVisit, PetSelector } from "./components";
import { ScheduleAppointmentFormValues } from "./interfaces";
import { useScheduleAppointmentForm } from "./hooks";


export const ScheduleAppointment = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const { register, handleSubmit, control, errors } = useScheduleAppointmentForm();

    const { mutateAsync: scheduleAppointment, isPending, error: mutationError } = useScheduleAppointmentMutation();
    const { data: pets, isLoading: isLoadingPets } = useGetPetsByVeterinarianClinic(user!);

    useEffect(() => {
        if (mutationError) {
            toast.error(mutationError.message, {
                style: {
                    background: "#000",
                    color: "#CA0A0A"
                }
            });
        }
    }, [mutationError]);

    const onSubmit = async (data: ScheduleAppointmentFormValues) => {
        try {
            await scheduleAppointment({
                petId: data.petId,
                userId: user!,
                type: data.type,
                reasonForVisit: data.reasonForVisit,
                visitDate: data.visitDate,
                notes: data.notes || undefined,
                diagnosis: data.diagnosis || undefined,
                treatment: data.treatment || undefined
            });
            toast.success("Cita programada con éxito", {
                icon: <CheckCircle className="text-emerald-500 size-5" />
            });
            navigate(-1);
        } catch (e) {
            console.error("Error scheduling appointment:", e);
        }
    };

    const petsOptions = useMemo(() => {
        return pets?.map((pet) => ({
            value: pet.id,
            label: pet.name,
            image: pet.image
        })) || [];
    }, [pets]);

    return (
        <div className="relative max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ScrollArea className="h-[calc(100dvh-10rem)] w-full px-5">
                {isPending && (
                    <AppointmentSucess isOpen={isPending} />
                )}

                <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-center gap-2">
                        <Activity className="size-8 text-primary animate-pulse" />
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text">
                            Programar Nueva Cita Médica
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        Registra una nueva cita médica o consulta. Se añadirá automáticamente al historial de la mascota seleccionada.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* General Section */}
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                        <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                            <Stethoscope className="size-5 text-primary" />
                            <h2 className="text-xl font-semibold">Información de la Cita</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <PetSelector control={control} errors={errors} petsOptions={petsOptions} isLoadingPets={isLoadingPets} />

                            {/* Appointment Type Selector */}
                            <AppointmentTypeSelector control={control} errors={errors} />

                            {/* Date Picker */}
                            <DatePickerVisit control={control} errors={errors} />

                            {/* Reason for Visit */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-1.5">
                                    Motivo de la Visita <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    placeholder="Ej. Chequeo anual, dolor de estómago, etc."
                                    className="h-10"
                                    {...register("reasonForVisit", { required: true })}
                                />
                                {errors.reasonForVisit && (
                                    <span className="text-xs text-destructive">El motivo de la visita es requerido</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Clinical Details Section */}
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                        <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                            <ClipboardList className="size-5 text-primary" />
                            <h2 className="text-xl font-semibold">Detalles Clínicos</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Notes Box */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-1.5">
                                    Notas y Observaciones
                                </label>
                                <textarea
                                    placeholder="Información adicional relevante del paciente o antecedentes inmediatos..."
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                    {...register("notes")}
                                />
                            </div>

                            {/* Diagnosis Box */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-1.5">
                                    Diagnóstico
                                </label>
                                <textarea
                                    placeholder="Detalles sobre el diagnóstico de la mascota..."
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                    {...register("diagnosis")}
                                />
                            </div>

                            {/* Treatment Box */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-1.5">
                                    Tratamiento
                                </label>
                                <textarea
                                    placeholder="Receta médica, medicamentos recomendados y pasos a seguir..."
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                    {...register("treatment")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 pb-12">
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            type="button"
                            onClick={() => navigate(-1)}
                            disabled={isPending}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="cursor-pointer gap-2 px-6"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? <Spinner className="size-4" /> : <Sparkles className="size-4" />}
                            {isPending ? 'Programando...' : 'Programar Cita'}
                        </Button>
                    </div>
                </form>
            </ScrollArea>
        </div>
    );
};
