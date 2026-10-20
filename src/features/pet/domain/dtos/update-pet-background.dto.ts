import {
    CanineVaccinationPlan,
    FelineVaccinationPlan,
    DewormingPlan
} from "../entities";

export interface UpdatePetBackgroundDto {
    petId: string;
    userId?: string;
    provenance?: string;
    diet?: string;
    isNeutered: boolean;
    neuteredDate?: string | Date;
    previousIllnesses?: string;
    hasAllergies: boolean;
    allergiesDescription?: string;
    lastVaccinationDate?: string | Date;
    canineVaccines?: Partial<CanineVaccinationPlan>;
    felineVaccines?: Partial<FelineVaccinationPlan>;
    deworming?: Partial<DewormingPlan>;
    otherVaccinesNotes?: string;
}
