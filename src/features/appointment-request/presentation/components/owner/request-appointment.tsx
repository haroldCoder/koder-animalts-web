import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
    CalendarClock,
    PawPrint,
    Sparkles,
    CheckCircle,
    Building2,
    MessageSquare,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/common/hooks";
import {
    PetSelector,
    PetOption,
    ClinicSelector,
    DateTimePicker,
} from "@/common/presentation/components";
import { ClinicOption } from "@/common/presentation/interfaces";
import { useGetPetsByOwnerUserId } from "@/features/pet/application/queries";
import { PetPresentationMapper } from "@/features/pet/presentation/mappers/pet-options.mapper";
import { useGetAllClinics } from "@/features/clinics/application/queries";

import { useRequestAppointment } from "../../hooks";
import { useCreateAppointmentRequestMutation } from "../../../application/mutations";
import { RequestAppointmentFormValues } from "../../interfaces";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const RequestAppointment = () => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control, errors, form } = useRequestAppointment();

    const { mutateAsync: createRequest, isPending, error: mutationError } =
        useCreateAppointmentRequestMutation();

    const { data: pets, isLoading: isLoadingPets } = useGetPetsByOwnerUserId(user!);
    const { data: clinics, isLoading: isLoadingClinics } = useGetAllClinics();

    useEffect(() => {
        if (mutationError) {
            toast.error(mutationError.message, {
                style: { background: "#000", color: "#CA0A0A" },
            });
        }
    }, [mutationError]);

    const petsOptions = useMemo<PetOption[]>(
        () => PetPresentationMapper.toOptions(pets),
        [pets]
    );

    const clinicsOptions = useMemo<ClinicOption[]>(() => {
        if (!clinics) return [];
        return clinics.map((c) => ({
            value: c.id,
            label: c.name,
            aditional: { address: c.address, phone: c.phone, email: c.email },
        }));
    }, [clinics]);

    const onSubmit = async (data: RequestAppointmentFormValues) => {
        try {
            await createRequest({
                userId: user!,
                petId: data.petId,
                requestedDate: data.date,
                reason: data.reason,
                clinicId: data.clinicId || undefined,
                VeterinarianId: data.VeterinarianId || undefined,
            });
            toast.success("Solicitud de cita enviada con éxito", {
                icon: <CheckCircle className="text-emerald-500 size-5" />,
            });
            form.reset();
            setOpen(false);
        } catch (e) {
            console.error("Error al enviar la solicitud de cita:", e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="cursor-pointer gap-2">
                    <Plus className="size-4" />
                    Solicitar Cita
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 !max-w-150">
                <div className="relative w-full py-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ScrollArea className="h-[calc(100dvh-10rem)] w-full px-2">
                        <div className="flex flex-col gap-2 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10">
                                    <CalendarClock className="size-7 text-primary" />
                                </div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                    Solicitar Cita
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-sm max-w-xl ml-1">
                                Completa el formulario para solicitar una cita veterinaria. Te
                                contactaremos para confirmar la disponibilidad.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                                    <PawPrint className="size-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Datos de la Cita</h2>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <PetSelector
                                        control={control}
                                        errors={errors}
                                        petsOptions={petsOptions}
                                        isLoadingPets={isLoadingPets}
                                    />

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-1.5">
                                            Fecha y Hora <span className="text-destructive">*</span>
                                        </label>
                                        <DateTimePicker
                                            control={control}
                                            name="date"
                                            required
                                            disablePast
                                        />
                                        {errors.date && (
                                            <span className="text-xs text-destructive">
                                                La fecha y hora son requeridas
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                                    <Building2 className="size-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Clínica (Opcional)</h2>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-1.5">
                                        Selecciona una clínica
                                    </label>
                                    <ClinicSelector
                                        clinicsOptions={clinicsOptions}
                                        isPendingClinics={isLoadingClinics}
                                        onChange={(value) =>
                                            form.setValue("clinicId", value ?? "")
                                        }
                                        value={form.watch("clinicId")}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Si no seleccionas una clínica, te asignaremos la disponible más cercana.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 space-y-6">
                                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                                    <MessageSquare className="size-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Motivo de la Consulta</h2>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-1.5">
                                        Describe el motivo <span className="text-destructive">*</span>
                                    </label>
                                    <Textarea
                                        placeholder="Ej. Mi mascota tiene fiebre desde ayer, no quiere comer y está muy decaída..."
                                        rows={4}
                                        className="resize-none"
                                        {...register("reason", {
                                            required: "El motivo de la consulta es requerido",
                                            minLength: {
                                                value: 10,
                                                message: "Por favor describe el motivo con más detalle (mín. 10 caracteres)",
                                            },
                                        })}
                                    />
                                    {errors.reason && (
                                        <span className="text-xs text-destructive">
                                            {errors.reason.message as string}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-2 pb-12">
                                <Button
                                    className="cursor-pointer"
                                    variant="outline"
                                    type="button"
                                    onClick={() => setOpen(false)}
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
                                    {isPending ? "Enviando..." : "Solicitar Cita"}
                                </Button>
                            </div>
                        </form>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};
