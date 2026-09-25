import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { HoverPetAvatar } from "@/common/presentation/components/hover-pet-avatar";
import { AppointmentRequestEntity } from "../../domain/entities";

interface PopUpDetailRequestProps {
    request: AppointmentRequestEntity;
    statusLabel: string;
    statusStyle: string;
}

export const PopUpDetailRequest = ({ request, statusLabel, statusStyle }: PopUpDetailRequestProps) => {
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
                    {/* Pet */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                        <HoverPetAvatar src={request.petPhoto} name={request.petName ?? "Mascota"} />
                        <div>
                            <p className="text-xs text-muted-foreground">Mascota</p>
                            <p className="font-semibold text-sm">{request.petName ?? "—"}</p>
                        </div>
                    </div>

                    {request.ownerName && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="size-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Dueño</p>
                                <p className="font-semibold text-sm">{request.ownerName}</p>
                            </div>
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