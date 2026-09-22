import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/common/hooks";
import { useScheduleAppointmentMutation } from "../application/queries";
import { useGetPetsByVeterinarianClinic } from "@/features/pet/application/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Stethoscope, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import { NewAppointmentFormValues } from "./interfaces";
import { ConsultationTypeSelector, PetOption, PetSelector } from "@/common/presentation/components";
import { DateTimePicker } from "@/common/presentation/components";
import { getMessageError } from "@/common/errors";
import { routes } from "@/common/presentation/constants";
import { useNavigate } from "react-router-dom";
import { PetPresentationMapper } from "@/features/pet/presentation/mappers/pet-options.mapper";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ConsultationType } from "@/features/medical-record/domain/enums";
import { useScheduleMedicalRecordMutation } from "@/features/medical-record/application/queries";
import { consultationTypeOptions } from "@/features/medical-record/presentation/constants";

export const ScheduleAppointmentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { mutateAsync, isPending } = useScheduleAppointmentMutation();
    const { mutateAsync: mutateAsyncHistory, isPending: isPendingHistory } = useScheduleMedicalRecordMutation();
    const { data: pets, isLoading: isLoadingPets } = useGetPetsByVeterinarianClinic(user!);
    const [isRegisterHistory, setIsRegisterHistory] = useState(false)

    const petsOptions = useMemo<PetOption[]>(() =>
        PetPresentationMapper.toOptions(pets),
        [pets]
    );

    const { register, handleSubmit, control, formState: { errors }, reset } =
        useForm<NewAppointmentFormValues & { type: ConsultationType | null }>({
            defaultValues: {
                petId: "",
                visitDate: undefined,
                reason: "",
                notes: "",
                type: null
            },
        });

    const onSubmit = async (data: NewAppointmentFormValues & { type: ConsultationType | null }) => {
        try {
            const idAppointment = await mutateAsync({
                petId: data.petId,
                userId: user!,
                date: data.visitDate.toISOString(),
                reason: data.reason,
                notes: data.notes || undefined,
            });

            if (isRegisterHistory) {
                try {
                    await mutateAsyncHistory({
                        userId: user!,
                        visitDate: data.visitDate.toISOString(),
                        reasonForVisit: data.reason,
                        notes: data.notes || undefined,
                        petId: data.petId,
                        type: data.type || ConsultationType.CONSULTATION,
                        appointmentId: idAppointment
                    });

                    toast.success("¡Registro médico guardado con éxito!");
                } catch (err) {
                    toast.error("Error al guardar el registro médico. Intenta de nuevo. " + getMessageError(err));
                }
            }

            setTimeout(() => {
                toast.success("¡Cita agendada con éxito!");
                reset();
                if (onSuccess) {
                    onSuccess();
                } else {
                    navigate(routes.appointments.link);
                }
            }, 1500);


        } catch (err) {
            console.log(err);

            toast.error("Error al agendar la cita. Intenta de nuevo. " + getMessageError(err));
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

                {/* Register Medical Record Toggle Card */}
                <div
                    className={cn(
                        "rounded-xl border transition-all duration-200 overflow-hidden",
                        isRegisterHistory
                            ? "border-main/40 bg-main/[0.03] dark:bg-main/10 shadow-xs"
                            : "border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-border"
                    )}
                >
                    {/* Header Row */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsRegisterHistory((prev) => !prev)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setIsRegisterHistory((prev) => !prev);
                            }
                        }}
                        className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer select-none gap-4"
                    >
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div
                                className={cn(
                                    "flex items-center justify-center size-10 rounded-lg transition-colors shrink-0",
                                    isRegisterHistory
                                        ? "bg-main/15 text-main"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                <FileText className="size-5" />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                                <label
                                    htmlFor="register-history"
                                    className="text-sm font-medium text-foreground cursor-pointer block leading-none"
                                >
                                    Registrar historial médico
                                </label>
                                <p className="text-xs text-muted-foreground truncate sm:text-wrap">
                                    Habilitar el registro clínico al agendar esta consulta
                                </p>
                            </div>
                        </div>

                        <Switch
                            id="register-history"
                            checked={isRegisterHistory}
                            onCheckedChange={setIsRegisterHistory}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "cursor-pointer shrink-0",
                                isRegisterHistory && "bg-main!"
                            )}
                        />
                    </div>

                    {/* Expandable Section for Consultation Type */}
                    {isRegisterHistory && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 pb-4 pt-3 border-t border-border/40 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
                        >
                            <label className="text-xs font-medium text-foreground/80 flex items-center gap-1">
                                Tipo de consulta <span className="text-destructive">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="type"
                                rules={{ required: isRegisterHistory }}
                                render={({ field: { onChange, value } }) => (
                                    <ConsultationTypeSelector
                                        value={value}
                                        onChange={onChange}
                                        disabled={false}
                                        consultationTypeOptions={consultationTypeOptions}
                                    />
                                )}
                            />
                            {errors.type && (
                                <span className="text-xs text-destructive block">
                                    El tipo de consulta es requerido
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => { reset(); onSuccess?.(); }}
                        disabled={isPending || isPendingHistory}
                        className="cursor-pointer"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending || isPendingHistory}
                        className="cursor-pointer gap-2 px-6"
                    >
                        {(isPending || isPendingHistory) ? <Spinner className="size-4" /> : <Sparkles className="size-4" />}
                        {(isPending || isPendingHistory) ? "Agendando..." : "Agendar Cita"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
