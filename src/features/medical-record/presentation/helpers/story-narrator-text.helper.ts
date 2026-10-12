import { ConsultationType } from "@/features/medical-record/domain/enums";

export interface NarrationParams {
    petName: string;
    clinicName: string;
    veterinaryName: string;
    reason: string;
}

interface NarrativeMetadata {
    typeLabel: string;
    getTitle: (params: NarrationParams) => string;
    getNarrative: (params: NarrationParams) => string;
}

const NARRATIVE_STRATEGIES: Record<ConsultationType, NarrativeMetadata> = {
    [ConsultationType.VACCINATION]: {
        typeLabel: "Vacunación y Protección",
        getTitle: ({ petName }) => `Protección y vacunas para ${petName}`,
        getNarrative: ({ petName, clinicName, veterinaryName }) =>
            `En esta jornada en ${clinicName}, el o la Dr(a). ${veterinaryName} administró la protección preventiva para ${petName}. Esto fortalece sus defensas para que explore el mundo con total seguridad y bienestar.`,
    },
    [ConsultationType.EMERGENCY]: {
        typeLabel: "Atención de Urgencia",
        getTitle: () => `Atención prioritaria y cuidado especial`,
        getNarrative: ({ petName, clinicName, reason }) =>
            `${petName} requirió asistencia médica prioritaria debido a: "${reason}". Gracias a la rápida intervención en ${clinicName}, fue valorado(a) oportunamente y se estableció el plan de recuperación.`,
    },
    [ConsultationType.SURGERY]: {
        typeLabel: "Procedimiento Quirúrgico",
        getTitle: () => `Intervención y cuidado clínico`,
        getNarrative: ({ petName, veterinaryName, reason }) =>
            `Se llevó a cabo un procedimiento quirúrgico por "${reason}". El/la Dr(a). ${veterinaryName} supervisó cada fase para garantizar el confort y la pronta recuperación de ${petName}.`,
    },
    [ConsultationType.HOSPITALIZATION]: {
        typeLabel: "Hospitalización y Monitoreo",
        getTitle: () => `Monitoreo continuo y recuperación`,
        getNarrative: ({ petName, clinicName }) =>
            `${petName} permaneció bajo observación médica para recibir cuidados directos y monitoreo constante en ${clinicName}, asegurando su estabilidad y confort.`,
    },
    [ConsultationType.LAB_RESULTS]: {
        typeLabel: "Exámenes y Laboratorio",
        getTitle: () => `Análisis y chequeo diagnóstico`,
        getNarrative: ({ petName }) =>
            `Se procesaron pruebas diagnósticas para conocer a fondo el estado interno de salud de ${petName}, brindando certeza al equipo veterinario para cuidar su salud.`,
    },
    [ConsultationType.CONSULTATION]: {
        typeLabel: "Consulta Médica",
        getTitle: ({ petName }) => `Chequeo y evaluación de ${petName}`,
        getNarrative: ({ petName, veterinaryName, reason }) =>
            `${petName} asistió a consulta con el o la Dra. ${veterinaryName} por motivo de "${reason}". Se realizó un examen físico completo para revisar su evolución y bienestar.`,
    },
};

export function getStoryNarrative(type: ConsultationType, params: NarrationParams) {
    const strategy = NARRATIVE_STRATEGIES[type] || NARRATIVE_STRATEGIES[ConsultationType.CONSULTATION];
    return {
        typeLabel: strategy.typeLabel,
        title: strategy.getTitle(params),
        narrative: strategy.getNarrative(params),
    };
}
