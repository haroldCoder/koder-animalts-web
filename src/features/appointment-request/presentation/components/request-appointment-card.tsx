import React, { useState } from "react";
import { Calendar, Clock, PawPrint, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AppointmentRequestEntity } from "../../domain/entities";
import { AppointmentRequestStatus } from "../../domain/enums";
import { useApproveAppointmentRequestMutation } from "../../application/mutations/use-approve-appointment-request.mutation";
import { useRejectAppointmentRequestMutation } from "../../application/mutations/use-reject-appointment-request.mutation";
import { useAuth } from "@/common/hooks";
import { toast } from "sonner";
import { ACCENT_COLORS, STATUS_LABELS, STATUS_STYLES } from "../constants";
import { getMessageError } from "@/common/errors";
import { ActionsRequest } from "./actions-request";
import { PopUpDetailRequest } from "./popup-detail-request";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UserRole } from "@/features/user";
import { RequestPolicy } from "../../domain/policies";

interface RequestAppointmentCardProps {
    request: AppointmentRequestEntity;
    userRole: UserRole
}

const isPending = (status: string) => status === AppointmentRequestStatus.PENDING;

export const RequestAppointmentCard: React.FC<RequestAppointmentCardProps> = ({ request, userRole }) => {
    const { user } = useAuth();
    const dateObj = new Date(request.date);

    const [reason, setReason] = useState({
        open: false,
        text: ""
    })

    const { mutateAsync: approve, isPending: isApproving } = useApproveAppointmentRequestMutation();
    const { mutateAsync: reject, isPending: isRejecting } = useRejectAppointmentRequestMutation();

    const statusStyle = STATUS_STYLES[request.status] ?? "bg-muted text-muted-foreground";
    const statusLabel = STATUS_LABELS[request.status] ?? request.status;
    const accentColor = ACCENT_COLORS[request.status] ?? "bg-primary";

    const handleApprove = async () => {
        try {
            await approve({
                data: {
                    id: request.id,
                    userVeterinarianId: user!,
                    clinicId: request.clinicId ?? "",
                },
                userRole
            });
            toast.success("Solicitud aprobada con éxito");
        } catch (err) {
            toast.error("Error al aprobar la solicitud " + getMessageError(err));
        }
    };

    const handleReject = async () => {
        try {
            await reject({
                data: {
                    id: request.id,
                    reason: reason.text,
                    userId: user!
                },
                userRole
            });
            toast.error("Solicitud rechazada");
            setReason({ open: false, text: "" });
        } catch (err) {
            toast.error("Error al rechazar la solicitud " + getMessageError(err));
        }
    };

    return (
        <article className="relative py-4 mt-5 w-full bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${accentColor}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 pl-5 sm:pl-6 gap-3.5 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                    <div className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 min-w-[3.5rem] sm:min-w-[4rem] rounded-xl ${statusStyle} font-sans transition-colors shrink-0`}>
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
                        <span className="text-xl sm:text-2xl font-black leading-none">
                            {format(dateObj, "dd")}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5">
                            {format(dateObj, "MMM", { locale: es })}
                        </span>
                    </div>

                    <div className="flex-1 space-y-1 sm:space-y-1.5 min-w-0">
                        <p className="font-semibold text-foreground text-sm sm:text-base leading-tight line-clamp-1">
                            {request.reason}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                                <Clock className="size-3.5 shrink-0 text-muted-foreground/80" />
                                {format(dateObj, "hh:mm a")}
                            </span>
                            {request.petName && (
                                <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
                                    <span className="text-muted-foreground/60">•</span>
                                    <PawPrint className="size-3 shrink-0" />
                                    <strong className="font-medium text-foreground truncate">{request.petName}</strong>
                                </span>
                            )}
                        </div>

                        {request.ownerName && userRole == UserRole.veterinary ? (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="size-3 shrink-0" />
                                <span className="truncate">
                                    Dueño: <strong className="font-medium text-foreground">{request.ownerName}</strong>
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="size-3 shrink-0" />
                                <span className="truncate">
                                    Veterinario: <strong className="font-medium text-foreground">{request.veterinarianName}</strong>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border/40 shrink-0">
                    <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle}`}>
                        {statusLabel}
                    </span>

                    <PopUpDetailRequest userRole={userRole} request={request} statusLabel={statusLabel} statusStyle={statusStyle} />
                </div>
            </div>

            <section className={`flex items-center pl-6 ${reason.open ? "justify-between" : "justify-end"}`}>
                {reason.open && (
                    <div className="flex gap-6 w-[50%]">
                        <Textarea
                            placeholder="Motivo del rechazo"
                            value={reason.text}
                            onChange={(e) => setReason((prev) => ({ ...prev, text: e.target.value }))}
                        />
                        <Button
                            className="cursor-pointer"
                            onClick={handleReject}
                            disabled={isRejecting}
                        >
                            {isRejecting ? (
                                <Spinner className="text-sm" />
                            ) : (
                                "Rechazar"
                            )}
                        </Button>
                    </div>
                )}
                {isPending(request.status) && RequestPolicy.canModifyRequest(userRole) && (
                    <ActionsRequest
                        handleApprove={handleApprove}
                        handleReject={() => setReason((prev) => ({ ...prev, open: true }))}
                        requestId={request.id}
                        disabledApprove={isApproving}
                        disabledReject={isRejecting}
                    />
                )}
            </section>
        </article>
    );
};
