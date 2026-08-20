import { ConsultationType } from "@/features/medical-record/domain/enums";

export const returnNameConsultationType = (type: ConsultationType) => {
    switch (type) {
        case ConsultationType.CONSULTATION:
            return "Consulta";
        case ConsultationType.VACCINATION:
            return "Vacunación";
        case ConsultationType.SURGERY:
            return "Cirugía";
        case ConsultationType.EMERGENCY:
            return "Emergencia";
        case ConsultationType.LAB_RESULTS:
            return "Resultados de laboratorio";
        case ConsultationType.HOSPITALIZATION:
            return "Hospitalización";
    }
}
