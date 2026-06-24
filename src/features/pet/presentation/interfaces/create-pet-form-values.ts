export interface CreatePetFormValues {
    name: string;
    species: string;
    breed?: string;
    gender?: string;
    birthdate?: string;
    weight?: number;
    microchip?: string;
    color?: string;
    clinicId?: string;
    isActive: boolean;
    image?: FileList;
    images?: FileList;
    iaImageUrl?: string;
    iaImageFile?: FileList;
}
