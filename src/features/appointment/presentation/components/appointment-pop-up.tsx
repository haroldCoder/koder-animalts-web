import React from "react";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, User, Building2, Tag, FileText } from "lucide-react";
import { STATUS_LABELS } from "../constants";
import { useUpdateAppointmentStatusMutation } from "../../application/queries";
import { AppointmentStatusEnum } from "../../domain/enums";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppointmentDataDto } from "../../domain/dtos";

interface AppointmentPopUpProps {
    appointment: AppointmentDataDto;
}

export const AppointmentPopUp: React.FC<AppointmentPopUpProps> = ({ appointment }) => {
    const dateObj = new Date(appointment.date);
    const statusLabel = appointment.status
        ? (STATUS_LABELS[appointment.status] ?? appointment.status)
        : "Sin estado";

    const { mutateAsync, isPending } = useUpdateAppointmentStatusMutation()

    const handleCancelAppointment = async () => {
        try {
            await mutateAsync({ id: appointment.id, status: AppointmentStatusEnum.CANCELLED })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Detalles de la Cita</DialogTitle>
                <DialogDescription>
                    Información completa sobre la cita médica.
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 shadow-sm border-2 border-main mb-4">
                    <AvatarImage
                        src={appointment.petPhoto}
                        alt={appointment.petName}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-main text-white font-bold text-xl">
                        {appointment.petName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-muted-foreground">Motivo</span>
                    <span className="text-base font-semibold">{appointment.reason}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-sm">{format(dateObj, "dd 'de' MMMM, yyyy", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-sm">{format(dateObj, "hh:mm a")}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black text-text-3 rounded-md px-4 py-2">
                        <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-sm">{statusLabel}</span>
                    </div>
                    {appointment.veterinarianName && (
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">{appointment.veterinarianName}</span>
                        </div>
                    )}
                    {appointment.clinicName && (
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">{appointment.clinicName}</span>
                        </div>
                    )}
                    {appointment.petName && (
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-sm">Mascota: {appointment.petName}</span>
                        </div>
                    )}
                </div>

                {appointment.notes && (
                    <div className="flex flex-col gap-1 mt-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            Notas
                        </span>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                            {appointment.notes}
                        </p>
                    </div>
                )}
            </div>

            {appointment.status === AppointmentStatusEnum.SCHEDULED && (
                <Button variant="destructive" className="w-full sm:w-auto cursor-pointer" onClick={handleCancelAppointment} disabled={isPending}>
                    {isPending ? <Spinner className="text-main" /> : 'Cancelar cita'}
                </Button>
            )}
        </DialogContent>
    );
};
