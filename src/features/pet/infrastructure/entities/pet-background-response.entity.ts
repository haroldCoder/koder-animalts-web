export interface RawPetBackgroundData {
    id: string;
    petId: string;
    provenance?: string | null;
    dietType?: string | null;
    diet?: string | null;
    dietDetails?: string | null;
    isNeutered?: boolean | null;
    neuteredDate?: string | Date | null;
    previousIllnesses?: string | null;
    hasAllergies?: boolean | null;
    allergiesDescription?: string | null;
    lastVaccinationDate?: string | Date | null;
    coreVaccines?: {
        canineVaccines?: Record<string, boolean>;
        felineVaccines?: Record<string, boolean>;
        deworming?: {
            internalParasites?: boolean;
            externalParasites?: boolean;
            lastInternalDewormingDate?: string | Date;
            lastExternalDewormingDate?: string | Date;
        };
    } | null;
    canineVaccines?: Record<string, boolean>;
    felineVaccines?: Record<string, boolean>;
    deworming?: {
        internalParasites?: boolean;
        externalParasites?: boolean;
        lastInternalDewormingDate?: string | Date;
        lastExternalDewormingDate?: string | Date;
    };
    lastDewormingInternal?: string | Date | null;
    lastDewormingExternal?: string | Date | null;
    otherPreventiveNotes?: string | null;
    otherVaccinesNotes?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface PetBackgroundResponseEntity {
    statusCode: number;
    message?: string;
    data: RawPetBackgroundData;
}
