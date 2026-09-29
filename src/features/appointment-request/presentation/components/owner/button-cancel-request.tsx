import { Button } from "@/components/ui/button";
import { CalendarX } from "lucide-react";
import { AppointmentRequestEntity } from "../../../domain/entities";
import { AppointmentRequestStatus } from "../../../domain/enums";
import { useCancelAppointmentRequestMutation } from "../../../application/mutations";
import { useAuth } from "@/common/hooks";
import { UserRole } from "@/features/user";
import { toast } from "sonner";
import { getMessageError } from "@/common/errors";
import { Spinner } from "@/components/ui/spinner";

interface Props {
    request: AppointmentRequestEntity;
}

export const ButtonCancelRequest = ({ request }: Props) => {
    const { user } = useAuth();
    const { mutateAsync: cancelRequest, isPending } = useCancelAppointmentRequestMutation();

    const handleCancel = async () => {
        try {
            await cancelRequest({
                data: {
                    id: request.id,
                    ownerUserId: user!,
                    status: request.status as AppointmentRequestStatus,
                },
                userRole: UserRole.owner,
            });
            toast.success("Solicitud cancelada con éxito");
        } catch (err) {
            toast.error("Error al cancelar la solicitud: " + getMessageError(err));
        }
    };

    return (
        <Button
            onClick={handleCancel}
            disabled={isPending}
            variant="outline"
            size="sm"
            className="bg-red-100 text-red-600 cursor-pointer hover:bg-red-200 hover:text-red-700 border-red-300 hover:border-red-400"
        >
            {isPending ? (
                <Spinner className="text-sm" />
            ) : (
                <>
                    <CalendarX />
                    Cancelar
                </>
            )}
        </Button>
    );
};
