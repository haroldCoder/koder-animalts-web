export interface AppointmentResponseDto {
    statusCode: number;
    data: Array<{
        id: string,
        visitDate: string,
        type: "CONSULTATION" | "VACCINATION" | "SURGERY" | "EMERGENCY" | "LAB_RESULTS" | "HOSPITALIZATION",
        reasonForVisit: string,
        diagnosis: string,
        treatment: string,
        notes: string,
        createdAt: string,
        updatedAt: string,
        petId: string,
        veterinarianId: string,
        vaccinations: [
            {
                id: string,
                vaccineName: string,
                dateAdministered: string,
                nextDueDate: string,
                lotNumber: string,
                createdAt: string,
                medicalRecordId: string
            }
        ],
        pet: {
            id: string,
            name: string,
            mainImage: string,
            owner?: {
                id: string,
                user: {
                    name: string
                }
            }
        },
        veterinarian: {
            id: string,
            user: {
                name: string
            },
            clinic: {
                name: string
                id: string
            }
        };
        documentIds: string[]
    }>
}
