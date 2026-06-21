import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { Building2, Download, FileText, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisitCardProps {
    visit: AppointmentEntity;
}

export const VisitCard = ({ visit }: VisitCardProps) => {
    return (
        <article
            key={visit.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-bg-1 border border-border-1 rounded-2xl hover:bg-bg-2 transition-all gap-4 sm:gap-0"
        >
            <div className="flex items-center gap-6">
                {/* Icono representativo */}
                <div className="w-12 h-12 min-w-[3rem] bg-main-light text-main rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-text-1">
                            {visit.petName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            {visit.type}
                        </span>
                        <span className="text-sm text-text-3">
                            {new Date(visit.date).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-2 mt-1 font-medium">
                        <span className="flex items-center gap-1.5">
                            <Stethoscope className="w-4 h-4 text-main" />
                            {visit.veterinaryName}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-main" />
                            {visit.clinicName}
                        </span>
                    </div>
                </div>
            </div>

            <Button className="w-full sm:w-auto flex items-center gap-2 bg-main text-white hover:bg-main-hover transition-colors rounded-xl px-4 py-2 cursor-pointer shadow-sm">
                <Download className="w-4 h-4" />
                Documentos
            </Button>
        </article>
    )
}
