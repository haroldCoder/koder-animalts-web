import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Clock, User, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { HoverAvatar } from "@/common/presentation/components/hover-avatar";
import { AppointmentRequestEntity } from "../../domain/entities";
import { UserRole } from "@/features/user";
import { RequestPolicy } from "../../domain/policies";

interface PopUpDetailRequestProps {
    request: AppointmentRequestEntity;
    statusLabel: string;
    statusStyle: string;
    userRole: UserRole
}

export const PopUpDetailRequest = ({ request, statusLabel, statusStyle, userRole }: PopUpDetailRequestProps) => {
    const dateObj = new Date(request.date);

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" size="sm" className="gap-2 cursor-pointer hover:text-primary">
                    <Eye className="w-4 h-4" />
                    <span className="inline sm:hidden text-xs">Ver</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="size-5 text-primary" />
                        Detalle de Solicitud
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {RequestPolicy.isCurrentVeterinary(request.currentVeterinary, userRole) && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-main/10 border border-main/20 text-main">
                            <div className="size-8 rounded-full bg-main/20 flex items-center justify-center shrink-0">
                                <UserCheck className="size-4 text-main" />
                            </div>
                            <div className="text-xs">
                                <p className="font-semibold text-foreground">Solicitud dirigida a ti</p>
                                <p className="text-muted-foreground">El dueño te seleccionó específicamente a ti para atender esta cita.</p>
                            </div>
                        </div>
                    )}

                    {/* Pet */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                        <HoverAvatar src={request.petPhoto} name={request.petName ?? "Mascota"} />
                        <div>
                            <p className="text-xs text-muted-foreground">Mascota</p>
                            <p className="font-semibold text-sm">{request.petName ?? "—"}</p>
                        </div>
                    </div>

                    {request.ownerName && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <User className="size-4 text-primary" />
                                </div>
                                {
                                    userRole == UserRole.owner ? (
                                        <span className="truncate text-sm">
                                            Veterinario: <strong className="font-medium text-foreground">{request.veterinarianName}</strong>
                                        </span>
                                    ) : (
                                        <span className="truncate text-sm">
                                            Dueño: <strong className="font-medium text-foreground">{request.ownerName}</strong>
                                        </span>
                                    )
                                }
                            </div>
                            {RequestPolicy.isCurrentVeterinary(request.currentVeterinary, userRole) && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-main/15 text-main shrink-0">
                                    <UserCheck className="size-3" />
                                    Te eligió
                                </span>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/40 space-y-0.5">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="size-3" /> Fecha
                            </p>
                            <p className="font-semibold text-sm">
                                {format(dateObj, "PPP", { locale: es })}
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/40 space-y-0.5">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="size-3" /> Hora
                            </p>
                            <p className="font-semibold text-sm">
                                {format(dateObj, "hh:mm a")}
                            </p>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                        <p className="text-xs text-muted-foreground">Motivo</p>
                        <p className="text-sm leading-relaxed">{request.reason}</p>
                    </div>

                    {request.clinicName && (
                        <div className="p-3 rounded-lg bg-muted/40 space-y-0.5">
                            <p className="text-xs text-muted-foreground">Clínica</p>
                            <p className="font-semibold text-sm">{request.clinicName}</p>
                        </div>
                    )}

                    {request.rejectionReason && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 space-y-0.5">
                            <p className="text-xs text-red-500 font-medium">Motivo de rechazo</p>
                            <p className="text-sm text-red-700 dark:text-red-400">{request.rejectionReason}</p>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle}`}>
                            {statusLabel}
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}