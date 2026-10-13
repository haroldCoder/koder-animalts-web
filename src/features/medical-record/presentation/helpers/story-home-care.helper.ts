import { ConsultationType } from "@/features/medical-record/domain/enums";

const HOME_CARE_BY_TYPE: Record<ConsultationType, string> = {
    [ConsultationType.VACCINATION]: "Mantén a tu mascota tranquila durante 24-48 horas. Evita baños y ejercicios intensos el día de la vacuna.",
    [ConsultationType.SURGERY]: "Verifica diariamente que la herida esté limpia y seca. Si tiene collar isabelino, asegúrate de mantenerlo puesto.",
    [ConsultationType.EMERGENCY]: "Observa de cerca sus signos vitales, apetito e hidratación. Ante cualquier recaída, contacta a urgencias de inmediato.",
    [ConsultationType.HOSPITALIZATION]: "Bríndale un ambiente cálido, sereno y mucho afecto. El descanso es fundamental para consolidar su mejoría.",
    [ConsultationType.LAB_RESULTS]: "Los resultados permiten al equipo veterinario tomar decisiones preventivas a tiempo para su calidad de vida.",
    [ConsultationType.CONSULTATION]: "El cariño, una buena nutrición e hidratación fresca diaria son la mejor medicina preventiva para tu consentido.",
};

export function getStoryHomeCareTip(type: ConsultationType, treatment?: string): string {
    if (treatment && treatment.trim().length > 0) {
        return "Sigue las dosis y horarios indicados por el veterinario para asegurar una pronta recuperación.";
    }
    return HOME_CARE_BY_TYPE[type] || HOME_CARE_BY_TYPE[ConsultationType.CONSULTATION];
}
