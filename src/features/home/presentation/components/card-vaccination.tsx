import { VaccinationEntity } from "@/features/vaccination/domain/entities"
import { FormatDate } from "@/common/utils/format-date"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, PawPrint, Syringe, Tag } from "lucide-react"
import { useContext, useMemo } from "react"
import { getStatusLabel } from "@/features/vaccination/presentation/utils"
import { Button } from "@/components/ui/button"
import { useUpdateStatusVaccination } from "@/features/vaccination/application/mutations"
import { MainLayoutContext } from "@/common/presentation/layout"
import { VaccinationStatus } from "@/features/vaccination/domain/enums"
import { toast } from "sonner"
import { getMessageError } from "@/common/errors"
import { Loading } from "@/common/presentation/components"
import { VaccinationStatusPolicy } from "@/features/vaccination/domain/policies"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface CardVaccinationProps {
    vaccination: VaccinationEntity
    className?: string
}

export const CardVaccination = ({ vaccination, className = "" }: CardVaccinationProps) => {
    const applicationDate = FormatDate.onlyDate(vaccination.date) ?? "No especificada";
    const hourApplicationDate = FormatDate.onlyTime(vaccination.date, "No especificada");

    const nextDueDate = FormatDate.onlyDate(vaccination.nextDate);
    const hourNextDueDate = FormatDate.onlyTime(vaccination.nextDate, "No programado");

    const vaccinationBadge = useMemo(() => {
        return getStatusLabel(vaccination.status);
    }, [vaccination.status]);

    const { user: userSession } = useContext(MainLayoutContext)!;

    const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateStatusVaccination();

    const onCancel = async () => {
        try {
            await updateStatus({
                id: vaccination.id,
                status: VaccinationStatus.CANCELLED,
                userRole: userSession.role
            });

            toast.success("Vacunación cancelada correctamente");

        } catch (error) {
            toast.error(getMessageError(error));
        }
    };

    return (
        <article className={`relative flex flex-col justify-between p-5 bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-main/30 transition-all duration-300 group overflow-hidden ${className}`}>
            {/* Top Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-main to-emerald-500 rounded-t-2xl" />

            <div className="flex flex-col gap-4">
                {/* Header: Title & Lot */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-main/10 text-main shrink-0 group-hover:bg-main group-hover:text-white transition-colors duration-300">
                            <Syringe className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-main transition-colors truncate">
                                {vaccination.name}
                            </h3>
                            {vaccination.petName && (
                                <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground font-medium">
                                    <PawPrint className="w-3.5 h-3.5 text-main/80" />
                                    <span className="truncate">{vaccination.petName}</span>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="flex flex-col gap-4">
                        {vaccination.lotNumber && (
                            <Badge variant="outline" className="text-[11px] font-mono border-main/20 text-muted-foreground shrink-0 bg-muted/30">
                                <Tag className="w-3 h-3 mr-1 text-main/70" />
                                {vaccination.lotNumber}
                            </Badge>
                        )}

                        <Badge className={`text-[11px] font-mono border-main/20 text-muted-foreground shrink-0 bg-muted/30 ${vaccinationBadge.color}`}>
                            {vaccinationBadge.label}
                        </Badge>
                    </div>


                </div>

                <Separator className="bg-border/40" />

                {/* Dates Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Application Date */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border/30">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Fecha de aplicación</span>
                            <span className="font-medium text-foreground truncate">{applicationDate}</span>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mt-3">Hora</span>
                            <span className="font-medium text-foreground truncate">{hourApplicationDate}</span>
                        </div>
                    </div>

                    {/* Next Due Date */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-main/5 border border-main/15">
                        <div className="p-1.5 rounded-lg bg-main/10 text-main shrink-0">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-main">Próximo Refuerzo</span>
                            <span className="font-semibold text-foreground truncate">
                                {nextDueDate ?? "No programado"}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mt-3">Hora</span>
                            <span className="font-medium text-foreground truncate">{hourNextDueDate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full mt-10">
                <Tooltip>
                    <TooltipTrigger className="w-full">
                        <Button
                            className="w-full cursor-pointer py-5"
                            onClick={onCancel}
                            disabled={isUpdating || !VaccinationStatusPolicy.canCancelVaccination(vaccination.status)}
                            variant="destructive"
                            size="sm">{isUpdating ? <Loading /> : "Cancelar"}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>

                        {VaccinationStatusPolicy.canCancelVaccination(vaccination.status) ? (
                            <p>Cancelar vacunación</p>
                        ) : (
                            <p>No se puede cancelar la vacunación</p>
                        )}
                    </TooltipContent>
                </Tooltip>

            </div>
        </article >
    );
};

