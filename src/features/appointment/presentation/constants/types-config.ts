import { ConsultationType } from "../../domain/enums";
import {
    Stethoscope,
    Syringe,
    Scissors,
    AlertCircle,
    Microscope,
    Activity,
} from "lucide-react";

export const getTypeConfig = (type: ConsultationType) => {
    switch (type) {
        case ConsultationType.CONSULTATION:
            return {
                label: "Consulta General",
                icon: Stethoscope,
                badgeClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
                calendarClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
                borderClass: "border-l-emerald-500",
                iconClass: "text-emerald-500",
            };
        case ConsultationType.VACCINATION:
            return {
                label: "Vacunación",
                icon: Syringe,
                badgeClass: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-sky-100 dark:border-sky-900/30",
                calendarClass: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",
                borderClass: "border-l-sky-500",
                iconClass: "text-sky-500",
            };
        case ConsultationType.SURGERY:
            return {
                label: "Cirugía",
                icon: Scissors,
                badgeClass: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
                calendarClass: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
                borderClass: "border-l-rose-500",
                iconClass: "text-rose-500",
            };
        case ConsultationType.EMERGENCY:
            return {
                label: "Urgencias",
                icon: AlertCircle,
                badgeClass: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900/30",
                calendarClass: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
                borderClass: "border-l-red-600",
                iconClass: "text-red-600 animate-pulse",
            };
        case ConsultationType.LAB_RESULTS:
            return {
                label: "Laboratorio",
                icon: Microscope,
                badgeClass: "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
                calendarClass: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
                borderClass: "border-l-purple-500",
                iconClass: "text-purple-500",
            };
        case ConsultationType.HOSPITALIZATION:
            return {
                label: "Hospitalización",
                icon: Activity,
                badgeClass: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
                calendarClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
                borderClass: "border-l-amber-500",
                iconClass: "text-amber-500",
            };
        default:
            return {
                label: "Cita médica",
                icon: Stethoscope,
                badgeClass: "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-100 dark:border-gray-900/30",
                calendarClass: "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300",
                borderClass: "border-l-gray-400",
                iconClass: "text-gray-500",
            };
    }
};