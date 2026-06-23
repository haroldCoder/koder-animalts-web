export interface PetResponseEntity {
    statusCode: number;
    message?: string;
    data: Array<{
        id: string;
        name: string;
        birthDate: string;
        mainImage?: string;
        breed: string;
        isActive: boolean;
        species: string;
        weight: number;
        microchip: string;
        color: string;
        iaImage?: string;
        images: string[];
        clinicName: string;
    }>;
}
