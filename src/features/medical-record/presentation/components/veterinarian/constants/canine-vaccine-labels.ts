import { CanineVaccinationPlan } from "@/features/pet/domain/entities";

export const CANINE_VACCINE_LABELS: Array<{ key: keyof CanineVaccinationPlan; label: string; desc: string }> = [
    { key: "rabies", label: "Rabia", desc: "Obligatoria anual" },
    { key: "parvovirus", label: "Parvovirus", desc: "Gastroenteritis canina" },
    { key: "distemper", label: "Moquillo", desc: "Distemper canino" },
    { key: "leptospira", label: "Leptospira", desc: "Zoonosis bacteriana" },
    { key: "hepatitis", label: "Hepatitis", desc: "Adenovirus tipo 1" },
    { key: "parainfluenza", label: "Parainfluenza", desc: "Traqueobronquitis / Tos de las perreras" },
    { key: "coronavirus", label: "Coronavirus", desc: "Entérico canino" },
    { key: "giardia", label: "Giardia", desc: "Parásito protozoario" },
];