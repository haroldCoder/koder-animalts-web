export interface CreatePetDto {
    name: string;
    species: string;
    isActive: boolean;
    userId: string;
    clinicId: string;
    mainImage: File;
    birthdate?: Date | string;
    breed?: string;
    gender?: string;
    weight?: number;
    microchip?: string;
    color?: string;
    iaImage?: File;
    images?: File[];
}
