import { ConsultationType } from "@/features/medical-record/domain/enums";

const MILESTONE_BY_TYPE: Record<ConsultationType, string> = {
    [ConsultationType.VACCINATION]: "Escudo Inmunológico Reforzado",
    [ConsultationType.SURGERY]: "Procedimiento Quirúrgico Superado",
    [ConsultationType.EMERGENCY]: "Atención Oportuna Superada",
    [ConsultationType.HOSPITALIZATION]: "Cuidado Intensivo y Recuperación",
    [ConsultationType.LAB_RESULTS]: "Evaluación Diagnóstica Completada",
    [ConsultationType.CONSULTATION]: "Control Clínico Registrado",
};

export function getStoryMilestoneBadge(type: ConsultationType, diagnosis?: string): string {
    if (type === ConsultationType.CONSULTATION && diagnosis && diagnosis.toLowerCase().includes("sano")) {
        return "100% Saludable y Vital";
    }
    return MILESTONE_BY_TYPE[type] || "Control Clínico Registrado";
}
