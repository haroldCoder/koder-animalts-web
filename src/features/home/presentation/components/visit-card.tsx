import { FormatDate } from "@/common/utils/format-date";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { Building2, FileText, Stethoscope } from "lucide-react";

interface VisitCardProps {
    visit: AppointmentEntity;
}

export const VisitCard = ({ visit }: VisitCardProps) => {
    return (
        <article
            key={visit.id}
            className="flex flex-col p-4 sm:p-5 bg-bg-1 border border-border-1 rounded-2xl hover:bg-bg-2 transition-all gap-3"
        >
            <div className="flex items-start gap-4">
                {/* Icono representativo */}
                <div className="w-11 h-11 shrink-0 bg-main-light text-main rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-text-1 leading-tight">
                            {visit.petName}
                        </h3>
                        <p className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium whitespace-nowrap">
                            {visit.status}
                        </p>
                        <p className="text-xs sm:text-sm text-text-3 whitespace-nowrap">
                            {FormatDate.format(visit.date, "dd/MM/yyyy")}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-text-2 mt-1 font-medium">
                        <span className="flex items-center gap-1.5">
                            <Stethoscope className="w-4 h-4 text-main shrink-0" />
                            {visit.veterinarianName}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-main shrink-0" />
                            {visit.clinicName}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    )
}
