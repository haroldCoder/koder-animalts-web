import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/common/hooks";
import { useScheduleAppointmentMutation } from "../application/queries";
import { useGetPetsByVeterinarianClinic } from "@/features/pet/application/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Stethoscope, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { NewAppointmentFormValues } from "./interfaces";
import { PetSelector } from "@/common/presentation/components";
import { DateTimePicker } from "@/common/presentation/components";

export const ScheduleAppointmentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { user } = useAuth();
    const { mutateAsync, isPending } = useScheduleAppointmentMutation();
    const { data: pets, isLoading: isLoadingPets } = useGetPetsByVeterinarianClinic(user!);

    const petsOptions = useMemo(() =>
        pets?.map((p) => ({ value: p.id, label: p.name })) || [],
        [pets]
    );

    const { register, handleSubmit, control, formState: { errors }, reset } =
        useForm<NewAppointmentFormValues>({
            defaultValues: {
                petId: "",
                visitDate: undefined,
                reason: "",
                notes: "",
            },
        });

    const onSubmit = async (data: NewAppointmentFormValues) => {
        try {
            await mutateAsync({
                petId: data.petId,
                userId: user!,
                date: data.visitDate.toISOString(),
                reason: data.reason,
                notes: data.notes || undefined,
            });
            toast.success("¡Cita agendada con éxito!");
            reset();
            onSuccess?.();
        } catch (err) {
            console.log(err);

            toast.error("Error al agendar la cita. Intenta de nuevo.");
        }
    };

    return (
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="p-2 rounded-lg bg-primary/10">
                    <Stethoscope className="size-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Nueva Cita</h2>
                    <p className="text-sm text-muted-foreground">Agenda una consulta para tu mascota</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Pet Selector */}
                <PetSelector
                    control={control}
                    errors={errors}
                    petsOptions={petsOptions}
                    isLoadingPets={isLoadingPets}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Fecha y Hora <span className="text-destructive">*</span>
                        </label>
                        <DateTimePicker control={control} name="visitDate" required />
                    </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Motivo de la Visita <span className="text-destructive">*</span>
                    </label>
                    <Input
                        placeholder="Ej. Chequeo anual, dolor de estómago, vacunación..."
                        className="h-10"
                        {...register("reason", { required: true })}
                    />
                    {errors.reason && (
                        <span className="text-xs text-destructive">El motivo es requerido</span>
                    )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        Notas adicionales
                    </label>
                    <textarea
                        placeholder="Algún síntoma, historial previo u observación importante..."
                        rows={3}
                        className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        {...register("notes")}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => { reset(); onSuccess?.(); }}
                        disabled={isPending}
                        className="cursor-pointer"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer gap-2 px-6"
                    >
                        {isPending ? <Spinner className="size-4" /> : <Sparkles className="size-4" />}
                        {isPending ? "Agendando..." : "Agendar Cita"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
