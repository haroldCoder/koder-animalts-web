import { PetMedicalReviewFormData } from "../pet-background/pet-medical-review-card";
import { PetVaccinationPlanFormData } from "../pet-background/pet-vaccination-plan-card";

export const DEFAULT_REVIEW_DATA: PetMedicalReviewFormData = {
    provenance: "",
    diet: "",
    isNeutered: false,
    neuteredDate: "",
    previousIllnesses: "",
    hasAllergies: false,
    allergiesDescription: "",
};

export const DEFAULT_VACCINATION_DATA: PetVaccinationPlanFormData = {
    lastVaccinationDate: "",
    canineVaccines: {
        rabies: false,
        parvovirus: false,
        distemper: false,
        leptospira: false,
        hepatitis: false,
        parainfluenza: false,
        coronavirus: false,
        giardia: false,
    },
    felineVaccines: {
        rabies: false,
        rhinotracheitis: false,
        calicivirus: false,
        panleukopenia: false,
        leukemia: false,
    },
    deworming: {
        internalParasites: false,
        externalParasites: false,
        lastInternalDewormingDate: "",
        lastExternalDewormingDate: "",
    },
    otherVaccinesNotes: "",
};