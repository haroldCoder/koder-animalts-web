import React, { useContext, useState } from "react";
import { MedicalRecordEntity } from "@/features/medical-record/domain/entities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Calendar,
    Clock,
    ChevronDown,
} from "lucide-react";
import { extractHourFromDate } from "@/common/utils";
import { getTypeConfig } from "../constants";
import { MainLayoutContext } from "@/common/presentation/layout";
import { UserRole } from "@/features/user";
import { FormatDate } from "@/common/utils/format-date";
import { ExpandedContentAreaToggle } from "./expanded-content-area-toggle";
import { UploadDocuments } from "./upload-documents";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/common/presentation/constants";

interface MedicalRecordCardToggleProps {
    medicalRecord: MedicalRecordEntity;
    isExpandedInitially?: boolean;
}

export const MedicalRecordCardToggle: React.FC<MedicalRecordCardToggleProps> = ({
    medicalRecord,
    isExpandedInitially = false
}) => {
    const [isExpanded, setIsExpanded] = useState(isExpandedInitially);
    const context = useContext(MainLayoutContext)

    const dateObj = new Date(medicalRecord.date);
    const formattedDay = FormatDate.formattedDay(dateObj);
    const formattedMonth = FormatDate.formattedMonth(dateObj);
    const navigator = useNavigate()


    const config = getTypeConfig(medicalRecord.type);
    const TypeIcon = config.icon;

    const goToVaccinations = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigator(`${routes.vaccinations.link}/?medicalRecord=${medicalRecord.id}`)
    }

    return (
        <article
            className={`
        relative overflow-hidden w-full bg-white dark:bg-bg-dark-2 
        border border-border-1 dark:border-border/10 rounded-2xl 
        shadow-sm hover:shadow-md transition-all duration-300
        border-l-4 ${config.borderClass}
        ${isExpanded ? "ring-1 ring-main/20 shadow-md" : ""}
      `}
        >
            {/* CARD HEADER (Toggle click area) */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4 cursor-pointer select-none hover:bg-bg-1/40 dark:hover:bg-bg-dark-3/20 transition-colors"
            >
                <div className="flex items-start gap-4 flex-1">
                    {/* Calendar block */}
                    <div
                        className={`
              flex flex-col items-center justify-center w-[70px] min-w-[70px] h-[72px]
              rounded-xl p-2 font-sans ${config.calendarClass} transition-colors
            `}
                    >
                        <Calendar className="w-4 h-4 mb-0.5" />
                        <span className="text-2xl font-black leading-none">{formattedDay}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{formattedMonth}</span>
                    </div>

                    {/* Core Info */}
                    <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.badgeClass}`}>
                                <TypeIcon className="w-3.5 h-3.5" />
                                {config.label}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-text-3 dark:text-muted-foreground bg-bg-1 dark:bg-bg-dark-3/50 px-2 py-0.5 rounded-md font-medium">
                                <Clock className="w-3.5 h-3.5 text-main" />
                                {extractHourFromDate(medicalRecord.date)}
                            </span>
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-text-1 dark:text-white leading-tight">
                            {medicalRecord.reasonForVisit}
                        </h3>

                        {/* Pet Info */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 pt-0.5">
                                <Avatar size="sm" className="border border-border-1 dark:border-border/20">
                                    <AvatarImage src={medicalRecord.petPhoto} alt={medicalRecord.petName} />
                                    <AvatarFallback className="bg-main/10 text-main font-bold">
                                        {medicalRecord.petName.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-text-2 dark:text-muted-foreground">
                                    Paciente: <span className="text-text-1 dark:text-white font-semibold">{medicalRecord.petName}</span>
                                </span>

                            </div>
                            {
                                medicalRecord.vaccinationsIds && medicalRecord.vaccinationsIds?.length > 0 && (
                                    <Button onClick={goToVaccinations} size="sm" className="h-8 px-3 w-42 cursor-pointer">
                                        Ver vacunas
                                    </Button>
                                )
                            }
                        </div>

                        {context?.user.role == UserRole.veterinary && medicalRecord.documentIds?.length == 0 && (
                            <UploadDocuments medicalRecordId={medicalRecord.id} />
                        )}
                    </div>
                </div>

                {/* Action controls on the right */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border-1 dark:border-border/10">
                    <div className="hidden sm:flex flex-col text-right text-xs">
                        <span className="text-text-3 dark:text-muted-foreground">Clínica</span>
                        <span className="font-semibold text-text-2 dark:text-white max-w-[150px] truncate">{medicalRecord.clinicName}</span>
                    </div>

                    <div
                        className={`
              p-2 rounded-full bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-white
              hover:bg-main-light hover:text-main dark:hover:bg-main/20 dark:hover:text-main
              transition-all duration-300
              ${isExpanded ? "rotate-180 bg-main-light text-main" : ""}
            `}
                    >
                        <ChevronDown className="w-5 h-5 transition-transform" />
                    </div>
                </div>
            </div>
            {/* EXPANDED CONTENT AREA */}
            <ExpandedContentAreaToggle medicalRecord={medicalRecord} isExpanded={isExpanded} />
        </article>
    );
};
