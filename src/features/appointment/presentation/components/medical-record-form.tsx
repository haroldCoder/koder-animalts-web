import { useAuth } from "@/common/hooks";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ScheduleAppointmentFormValues } from "@/features/medical-record/presentation/interfaces";
import { Stethoscope, Calendar, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading, PetSelector } from "@/common/presentation/components";
import { MedicalRecordTypeSelector } from "@/features/medical-record/presentation/components";
import { useGetPetsByVeterinarianClinic } from "@/features/pet/application/queries";
import { usePetsOptions } from "@/common/presentation/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRegisterMedicalRecordWithAppointmentMutation } from "../../application/mutations";
import { RegisterMedicalRecord } from "../interfaces";
import { ConsultationType } from "@/features/medical-record/domain/enums";
import { FormatDate } from "@/common/utils/format-date";

interface MedicalRecordFormProps extends RegisterMedicalRecord {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const MedicalRecordForm = ({
    onSuccess,
    onCancel,
    appointment,
    userRole,
    userId,
}: MedicalRecordFormProps) => {
    const { user } = useAuth();
    const isPending = false;
    const { data: petsData, isPending: isPendigPets } = useGetPetsByVeterinarianClinic(user!);

    const { petsOptions } = usePetsOptions({ petsData: petsData });

    const { mutateAsync: registerMedicalRecord, isPending: isLoadingRegister } = useRegisterMedicalRecordWithAppointmentMutation();

    const { petId, date, reason, notes } = appointment;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<ScheduleAppointmentFormValues>({
        defaultValues: {
            petId,
            visitDate: new Date(date),
            visitTime: "",
            reasonForVisit: reason || "",
            type: "",
            notes: notes ?? "",
            diagnosis: "",
            treatment: "",
        }
    });

    const onSubmit = async (data: ScheduleAppointmentFormValues) => {
        await registerMedicalRecord({
            medicalRecord: {
                petId: petId,
                userId,
                type: data.type as ConsultationType,
                notes: data.notes,
                diagnosis: data.diagnosis,
                treatment: data.treatment,
                reasonForVisit: reason,
                visitDate: date
            },
            appointment,
            userRole: userRole,
        }).then(() => {
            if (onSuccess) onSuccess();
        }).catch((error) => {
            toast.error(error.message || "Error al registrar el historial");
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                <div className="p-2.5 rounded-xl bg-main/10 text-main">
                    <Stethoscope className="size-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text-1">Registro de Historial Médico</h2>
                    <p className="text-xs text-text-3">Completa el diagnóstico y tratamiento clínico para esta consulta.</p>
                </div>
            </div>
            <ScrollArea className="h-[50vh] sm:h-[60vh] pr-4">
                <div className="space-y-6 pb-4">
                    {/* Context summary info */}
                    <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-main-light/70 border border-main/20 text-xs text-text-2">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-4 text-main" />
                            <span><strong className="font-semibold text-text-1">Fecha:</strong> {FormatDate.format(date, 'dd/MM/yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FileText className="size-4 text-main" />
                            <span><strong className="font-semibold text-text-1">Motivo:</strong> {reason}</span>
                        </div>
                    </div>

                    {/* General info row */}
                    <div className="grid grid-cols-1 gap-4">
                        <MedicalRecordTypeSelector control={control} errors={errors} />

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-1.5">
                                Motivo de la Consulta <span className="text-destructive">*</span>
                            </label>
                            <Input
                                disabled
                                placeholder="Ej. Chequeo general, control..."
                                className="h-10"
                                {...register("reasonForVisit", { required: "El motivo es requerido" })}
                            />
                            {errors.reasonForVisit && (
                                <span className="text-xs text-destructive">{errors.reasonForVisit.message}</span>
                            )}
                        </div>
                    </div>

                    <PetSelector
                        disabled
                        value={petId}
                        control={control}
                        errors={errors}
                        petsOptions={petsOptions}
                        isLoadingPets={isPendigPets}
                    />

                    {/* Clinical Details */}
                    <div className="space-y-4 pt-1">
                        {/* Diagnóstico */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-1.5">
                                Diagnóstico
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Diagnóstico clínico, hallazgos físicos del examen..."
                                className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                {...register("diagnosis")}
                            />
                        </div>

                        {/* Tratamiento */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-1.5">
                                Tratamiento y Medicación
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Plan de tratamiento, medicamentos recetados, dosis y recomendaciones..."
                                className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                {...register("treatment")}
                            />
                        </div>

                        {/* Notas */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-1.5">
                                Notas y Observaciones
                            </label>
                            <textarea
                                rows={2}
                                placeholder="Información adicional, antecedentes o observaciones..."
                                className="flex min-h-[60px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                                {...register("notes")}
                            />
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isPending}
                        className="cursor-pointer"
                    >
                        Cancelar
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={isPending || isLoadingRegister}
                    className="cursor-pointer gap-2 bg-main hover:bg-main-hover text-white px-5"
                >
                    {isPending || isLoadingRegister ? <Loading className="size-4" /> : <Sparkles className="size-4" />}
                    {isPending || isLoadingRegister ? "Guardando..." : "Guardar Historial"}
                </Button>
            </div>
        </form>
    );
};