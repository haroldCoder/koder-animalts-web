import { toast } from "sonner";
import { useUpdateAppointmentStatusMutation } from "../../application/mutations";
import { AppointmentEntity } from "../../domain/entities";
import { UserRole } from "@/features/user";

export const useUpdateStatusAppointment = () => {
    const { mutateAsync, isPending } = useUpdateAppointmentStatusMutation();

    const handleUpdateCompletedStatus = async (appointment: AppointmentEntity, status: string, userRole: UserRole) => {
        await mutateAsync({ appointment, status, userRole }, {
            onSuccess: () => {
                toast.success("Cita actualizada correctamente");
            },
            onError: () => {
                toast.error("Error al actualizar la cita");
            }
        });
    }

    return { handleUpdateCompletedStatus, isPending };
}