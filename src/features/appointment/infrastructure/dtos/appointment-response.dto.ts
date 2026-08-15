export interface AppointmentResponseDto {
    statusCode: number;
    data: Array<{
        id: string;
        date: string;
        reason: string;
        notes?: string;
        petId: string;
        veterinarianId: string;
        status?: string;
        pet?: {
            id: string;
            name: string;
            mainImage: string;
            owner: {
                user: {
                    name: string;
                }
            }
        };
        veterinarian?: {
            id: string;
            user: {
                name: string;
            };
            clinic?: {
                name: string;
            };
        };
    }>;
}
