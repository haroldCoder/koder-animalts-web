import { ConsultationType } from "../../domain/enums";

export const appointmentTypeOptions: { value: ConsultationType, label: string }[] = [
    { value: ConsultationType.CONSULTATION, label: "Consulta General" },
    { value: ConsultationType.VACCINATION, label: "Vacunación" },
    { value: ConsultationType.SURGERY, label: "Cirugía" },
    { value: ConsultationType.EMERGENCY, label: "Urgencias" },
    { value: ConsultationType.LAB_RESULTS, label: "Resultados de Laboratorio" },
    { value: ConsultationType.HOSPITALIZATION, label: "Hospitalización" }
];