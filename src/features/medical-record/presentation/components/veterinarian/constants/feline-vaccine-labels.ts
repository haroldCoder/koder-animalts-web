import { FelineVaccinationPlan } from "@/features/pet/domain/entities";

export const FELINE_VACCINE_LABELS: Array<{ key: keyof FelineVaccinationPlan; label: string; desc: string }> = [
    { key: "rabies", label: "Rabia", desc: "Obligatoria anual" },
    { key: "rhinotracheitis", label: "Rinotraqueitis", desc: "Herpesvirus felino (FHV-1)" },
    { key: "calicivirus", label: "Calicivirus", desc: "Calicivirus felino (FCV)" },
    { key: "panleukopenia", label: "Panleucopenia", desc: "Parvovirus felino" },
    { key: "leukemia", label: "Leucemia", desc: "Leucemia viral felina (FeLV)" },
];